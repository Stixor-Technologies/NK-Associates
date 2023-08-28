"use client";
import React, { FC, useState, useEffect, useMemo } from "react";
import { MediaAttributes } from "../../../utils/types/types";
import { BASE_URL } from "../../../utils/constants";
import Image from "next/image";

interface BannerImagesProps {
  banner_images: MediaAttributes[];
}

// const BannerSlider: FC<BannerImagesProps> = ({ banner_images }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoveredSlide, setHoveredSlide] = useState(null);
//   const [windowSize, setWindowSize] = useState<number>(0);

//   const breakPoint = 640;

//   useEffect(() => {
//     const handleWindowResize = () => {
//       setWindowSize(window.innerWidth);
//     };

//     handleWindowResize();

//     window.addEventListener("resize", handleWindowResize);

//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);

//   const slideWidth = useMemo(
//     () => (windowSize >= breakPoint ? 158 : 112),
//     [windowSize],
//   );

//   const slideMargin = 20;

//   const leftMargin = -((slideWidth + slideMargin) * activeIndex);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (hoveredSlide !== null) return;
//       setActiveIndex((prevIndex) => (prevIndex + 1) % banner_images?.length);
//     }, 1500);

//     return () => clearInterval(interval);
//   }, [banner_images?.length, hoveredSlide]);
//   console.log(activeIndex);

//   return (
//     <div
//       className="slider-container flex overflow-hidden transition-all duration-500 ease-out relative z-10"
//       style={{ marginLeft: `${leftMargin}px` }}
//     >
//       {banner_images?.map((img, index) => (
//         <div
//           key={index}
//           onMouseEnter={() => setHoveredSlide(index)}
//           onMouseLeave={() => setHoveredSlide(null)}
//           className={`relative slide flex-shrink-0 h-[18rem] sm:h-[23.813rem] mr-[1.25rem] transition-all duration-500 ease-out ${
//             index === hoveredSlide ||
//             (index === activeIndex && hoveredSlide === null)
//               ? "w-[15.625rem] sm:w-[21.938rem]"
//               : "w-[7rem] sm:w-[9.875rem]"
//           }`}
//         >
//           <Image
//             src={`${BASE_URL}${img?.attributes?.url || "/"}`}
//             fill
//             alt="Banner-image"
//             className="rounded-2xl"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

const BannerSlider: FC<BannerImagesProps> = ({ banner_images }) => {
  // console.log(banner_images);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bImages, setBannerImages] = useState(banner_images);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const [windowSize, setWindowSize] = useState<number>(0);

  const breakPoint = 640;
  // console.log(bImages);
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

  const slideWidth = useMemo(
    () => (windowSize >= breakPoint ? 158 : 112),
    [windowSize],
  );

  const slideMargin = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredSlide !== null) return;
      setBannerImages((prevImages) => {
        const updatedImages = [...prevImages];
        const previousIndex =
          activeIndex === 0 ? updatedImages.length - 1 : activeIndex - 1;
        const previousImage = updatedImages[previousIndex];
        updatedImages.splice(previousIndex, 1);
        updatedImages.push(previousImage);
        return updatedImages;
      });

      setActiveIndex((prevIndex) => (prevIndex + 1) % bImages?.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [banner_images?.length, hoveredSlide]);

  // useEffect(() => {
  //   const updatedImages = [...banner_images];
  //   const previousIndex =
  //     activeIndex === 0 ? updatedImages.length - 1 : activeIndex - 1;
  //   console.log(previousIndex);
  //   const previousImage = updatedImages.splice(previousIndex, 1)[0];
  //   console.log(updatedImages, previousIndex);
  //   updatedImages.push(previousImage);
  //   setBannerImages(updatedImages);
  // }, [activeIndex]);

  useEffect(() => {
    // setBannerImages((prevImages) => {
    //   const updatedImages = [...prevImages];
    //   const lastImage = updatedImages.pop(); // Remove the last image
    //   updatedImages.unshift(lastImage); // Add it to the beginning
    //   return updatedImages;
    // });
    // setBannerImages((prevImages) => {
    //   const updatedImages = [...prevImages];
    //   const previousIndex =
    //     activeIndex === 0 ? updatedImages.length - 1 : activeIndex - 1;
    //   const previousImage = updatedImages.splice(previousIndex, 1)[0];
    //   console.log(previousIndex);
    //   updatedImages.push(previousImage);
    //   return updatedImages;
    // });
  }, [activeIndex]);

  return (
    <div className="slider-container flex transition-all duration-500 ease-out relative z-10">
      {bImages?.map((img, index) => (
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
          style={{
            transform: `translateX(${
              -activeIndex * (slideWidth + slideMargin)
            }px)`, // Shift the container position
          }}
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

export default BannerSlider;
