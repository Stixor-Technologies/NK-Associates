import React, { FC, useState, useEffect } from "react";
import { MediaAttributes } from "../../../utils/types/types";
import { BASE_URL } from "../../../utils/constants";
import Image from "next/image";
import "./banner-styles.css";

interface BannerImagesProps {
  banner_images: MediaAttributes[];
}

const CustomSlider: FC<BannerImagesProps> = ({ banner_images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState(null);

  const slideWidth = 158; // Normal slide width
  const activeSlideWidth = 351; // Active slide width
  const slideMargin = 20; // Margin for each slide

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
          className={`relative slide flex-shrink-0 mr-[20px] h-[381px] transition-all duration-500 ease-out ${
            index === hoveredSlide
              ? "w-[351px]"
              : index === activeIndex && hoveredSlide === null
              ? "w-[351px]"
              : "w-[158px]"
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

// return (
//   <div
//     className="slider-container flex overflow-hidden transition-all duration-500 ease-out relative z-10"
//     style={{ marginLeft: `${leftMargin}px` }}
//   >
//     {banner_images.map((img, index) => (
//       // <div
//       //   key={index}
//       //   className={`relative slide shrink-0 mr-[20px] h-[381px] transition-all duration-500 ease-out ${
//       //     index === activeIndex ? "active" : ""
//       //   }`}
//       //   style={{
//       //     width:
//       //       index === activeIndex
//       //         ? `${activeSlideWidth}px`
//       //         : `${slideWidth}px`,
//       //   }}
//       // >
//       <div
//         key={index}
//         className={`relative slide flex-shrink-0 mr-[20px] h-[381px] transition-all duration-500 ease-out ${
//           index === activeIndex ? "w-[351px]" : "w-[158px]"
//         }`}
//       >
//         <Image
//           src={`${BASE_URL}${img?.attributes?.url || "/"}`}
//           fill
//           alt="Banner-image"
//           className="rounded-xl"
//         />
//       </div>
//     ))}
//   </div>
// );
