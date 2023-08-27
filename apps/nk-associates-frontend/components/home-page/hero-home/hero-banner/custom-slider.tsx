import React, { FC, useState, useEffect, useMemo } from "react";
import { MediaAttributes } from "../../../../utils/types/types";
import { BASE_URL } from "../../../../utils/constants";
import Image from "next/image";

interface BannerImagesProps {
  banner_images: MediaAttributes[];
}

const CustomSlider: FC<BannerImagesProps> = ({ banner_images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const breakPoint = 640;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const slideWidth = useMemo(
    () => (windowSize >= breakPoint ? 158 : 112),
    [windowSize],
  );

  const slideMargin = 20;

  const leftMargin = -((slideWidth + slideMargin) * activeIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredSlide !== null) return;
      if (activeIndex === banner_images.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [activeIndex, banner_images, hoveredSlide]);

  return (
    <div
      className="slider-container flex overflow-hidden transition-all duration-500 ease-out relative z-10"
      style={{ marginLeft: `${leftMargin}px` }}
    >
      {banner_images.map((img, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredSlide(index)}
          onMouseLeave={() => setHoveredSlide(null)}
          className={`relative slide flex-shrink-0 h-[18rem] sm:h-[23.813rem] mr-[1.25rem] transition-all duration-500 ease-out ${
            index === hoveredSlide ||
            (index === activeIndex && hoveredSlide === null)
              ? "w-[15.625rem] sm:w-[21.938rem]"
              : "w-[7rem] sm:w-[9.875rem]"
          }`}
        >
          <Image
            src={`${BASE_URL}${img?.attributes?.url || "/"}`}
            fill
            alt="Banner-image"
            className="rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
};
export default CustomSlider;
