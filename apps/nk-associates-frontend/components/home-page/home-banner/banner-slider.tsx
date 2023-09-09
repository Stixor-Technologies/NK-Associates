"use client";
import React, { FC, useState, useEffect, useMemo, useRef } from "react";
import { MediaAttributes } from "../../../utils/types/types";
import { BASE_URL } from "../../../utils/constants";
import Image from "next/image";
import { gsap } from "gsap";

interface BannerImagesProps {
  banner_images: MediaAttributes[];
}

const BannerSlider: FC<BannerImagesProps> = ({ banner_images }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState<number>(0);

  const sliderContainerRef = useRef(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const resetRef = useRef<boolean>(false);

  const slideWidth = useMemo(
    () => (windowSize >= 640 ? 158 : 112),
    [windowSize],
  );

  const slideMargin = 20;
  const leftMargin = -((slideWidth + slideMargin) * activeIndex);

  const displaySlides = Array.isArray(banner_images)
    ? [...banner_images, ...banner_images]
    : undefined;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        resetRef.current = false;
        if (hoveredSlide !== null) return;

        gsap.to(slidesRef.current[activeIndex], {
          width: windowSize >= 640 ? "21.938rem" : "15.625rem",
          duration: 0.5,
          ease: "power3.out",
        });

        setActiveIndex((prevIndex) => (prevIndex + 1) % displaySlides?.length);

        gsap.to(sliderContainerRef.current, {
          marginLeft: `${leftMargin}px`,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            if (activeIndex === displaySlides?.length / 2) {
              setActiveIndex(1);
              gsap.set(slidesRef.current[0], {
                width: windowSize >= 640 ? "21.938rem" : "15.625rem",
              });
              gsap.set(sliderContainerRef.current, {
                marginLeft: `${-((slideWidth + slideMargin) * 0)}px`,
              });
              gsap.set(slidesRef.current[displaySlides?.length / 2], {
                width: windowSize >= 640 ? "9.875rem" : "7rem",
              });
              // to cater for delay in setting the state
              resetRef.current = true;
            }
          },
        });

        gsap.to(slidesRef.current[(activeIndex - 1) % displaySlides?.length], {
          width: windowSize >= 640 ? "9.875rem" : "7rem",
          duration: 0.5,
          ease: "power3.out",
        });
      },
      resetRef.current ? 1000 : 1500,
    );

    return () => clearInterval(interval);
  }, [
    activeIndex,
    banner_images?.length,
    displaySlides?.length,
    hoveredSlide,
    leftMargin,
    slideWidth,
    windowSize,
  ]);

  return (
    <div
      className="slider-container flex overflow-hidden relative z-10"
      ref={sliderContainerRef}
    >
      {displaySlides?.map((img, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          onClick={() => {
            setActiveIndex(index);
          }}
          onMouseEnter={() => {
            setHoveredSlide(index);
            if (slidesRef.current[index]) {
              gsap.to(slidesRef.current[index], {
                width: windowSize >= 640 ? "21.938rem" : "15.625rem",
                duration: 0.5,
                ease: "power3.out",
              });
              if (activeIndex - 1 !== index) {
                gsap.to(slidesRef.current[activeIndex - 1], {
                  width: windowSize >= 640 ? "9.875rem" : "7rem",
                  duration: 0.5,
                  ease: "power3.out",
                });
              }
            }
          }}
          onMouseLeave={() => {
            setHoveredSlide(null);
            if (slidesRef.current[index]) {
              gsap.to(slidesRef.current[index], {
                width: windowSize >= 640 ? "9.875rem" : "7rem",
                duration: 0.5,
                ease: "power3.out",
              });

              if (activeIndex - 1 !== index) {
                gsap.to(slidesRef.current[activeIndex - 1], {
                  width: windowSize >= 640 ? "21.938rem" : "15.625rem",
                  duration: 0.5,
                  ease: "power3.out",
                });
              }
            }
          }}
          className={`slide flex-shrink-0 h-[18rem] sm:h-[23.813rem] mx-[0.625rem] 
          ${
            index === 0
              ? "w-[15.625rem] sm:w-[21.938rem]"
              : "w-[7rem] sm:w-[9.875rem]"
          }
          `}
        >
          <div className="relative rounded-2xl overflow-hidden w-full h-full">
            <Image
              src={`${BASE_URL}${img?.attributes?.url || "/"}`}
              alt="Banner-image"
              fill
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
