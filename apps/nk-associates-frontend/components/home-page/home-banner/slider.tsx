"use client";
import React, { FC, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { BASE_URL } from "../../../utils/constants";

// import required modules
import {
  Pagination,
  Autoplay,
  Controller,
  EffectCreative,
} from "swiper/modules";
import Image from "next/image";
// import "./banner-styles.css";
import { MediaAttributes } from "../../../utils/types/types";
import "./banner-styles.css";

interface BannerImagesProps {
  banner_images: MediaAttributes[];
}

// const MyCarousel: FC<BannerImagesProps> = ({ banner_images }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <Swiper
//       spaceBetween={20}
//       slidesPerView={3}
//       onSlideChange={(Swiper) => {
//         console.log(Swiper.realIndex);
//       }}
//       autoplay={true}
//       pagination={{
//         clickable: true,
//       }}
//       navigation={true}
//       modules={[Autoplay, Pagination, Navigation]}
//       loop={true}
//       // parallax={true} // Enable parallax effect
//       // speed={1000} // Adjust speed of parallax animation
//     >
//       {/* <SwiperSlide className="parallax-slide">
//         <div className="slider-container  flex transition-all duration-500 ease-out relative z-10">
//           {banner_images?.map((img, index) => (
//             <div
//               key={index}
//               // onMouseEnter={() => setHoveredSlide(index)}
//               // onMouseLeave={() => setHoveredSlide(null)}
//               className={`relative slide flex-shrink-0 h-[18rem] w-[400px] sm:h-[23.813rem] mr-[1.25rem] transition-all duration-500 ease-out `}
//               // style={{
//               //   transform: `translateX(${
//               //     -activeIndex * (slideWidth + slideMargin)
//               //   }px)`, // Shift the container position
//               // }}
//               // ${
//               //   index === hoveredSlide ||
//               //   (index === activeIndex && hoveredSlide === null)
//               //     ? "w-[15.625rem] sm:w-[21.938rem]"
//               //     : "w-[7rem] sm:w-[9.875rem]"
//               // }
//             >
//               <Image
//                 src={`${BASE_URL}${img?.attributes?.url || "/"}`}
//                 fill
//                 alt="Banner-image"
//                 className="rounded-2xl"
//               />
//             </div>
//           ))}
//         </div>
//       </SwiperSlide> */}
//       {/* <SwiperSlide className="parallax-slide" style={{ width: "150px" }}>
//         Slide 2
//       </SwiperSlide>
//       <SwiperSlide className="parallax-slide" style={{ width: "150px" }}>
//         Slide 3
//       </SwiperSlide> */}
//       {/* Add more slides as needed */}

//       <div className="">
//         {banner_images?.map((img, index) => (
//           <SwiperSlide key={index}>
//             <div
//               // onMouseEnter={() => setHoveredSlide(index)}
//               // onMouseLeave={() => setHoveredSlide(null)}
//               className={`relative h-[18rem] sm:h-[23.813rem] mr-[1.25rem]`}
//               // style={{
//               //   transform: `translateX(${
//               //     -activeIndex * (slideWidth + slideMargin)
//               //   }px)`, // Shift the container position
//               // }}
//               // ${
//               //   index === hoveredSlide ||
//               //   (index === activeIndex && hoveredSlide === null)
//               //     ? "w-[15.625rem] sm:w-[21.938rem]"
//               //     : "w-[7rem] sm:w-[9.875rem]"
//               // }
//             >
//               <Image
//                 src={`${BASE_URL}${img?.attributes?.url || "/"}`}
//                 fill
//                 alt="Banner-image"
//                 className="rounded-2xl"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </div>
//       {/* <SwiperSlide>Slide 1</SwiperSlide>
//       <SwiperSlide>Slide 2</SwiperSlide>
//       <SwiperSlide>Slide 3</SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide>
//       <SwiperSlide>Slide 5</SwiperSlide>
//       <SwiperSlide>Slide 6</SwiperSlide>
//       <SwiperSlide>Slide 7</SwiperSlide>
//       <SwiperSlide>Slide 8</SwiperSlide>
//       <SwiperSlide>Slide 9</SwiperSlide> */}
//     </Swiper>
//   );
// };

const MyCarousel: FC<BannerImagesProps> = ({ banner_images }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  // return (
  //   <>
  //     <Swiper
  //       slidesPerView={4}
  //       // slidesPerView={"auto"}
  //       spaceBetween={20}
  //       autoplay={true}
  //       keyboard={true}
  //       modules={[Autoplay]}
  //       // loop={true}
  //       // centeredSlides={true}
  //       onSlideChange={(swiper) => {
  //         // console.log(swiper.activeIndex);
  //         const realIndex = swiper.realIndex;
  //         setActiveSlide(realIndex);
  //         // setActiveSlide(swiper.activeIndex);
  //       }}
  //       className="banner-swiper"
  //     >
  //       {arr.map((ele, index) => {
  //         // Index: ${index}
  //         return (
  //           <SwiperSlide key={index}>
  //             <div
  //               // className={`!w-[${
  //               //   activeSlide === index ? "300px" : "200px"
  //               // }] h-[400px] transition-width duration-300 bg-slate-400`}
  //               className="w-full h-[381px] rounded-2xl overflow-hidden"
  //             >
  //               {/* {index} */}
  //               <Image
  //                 src={"/assets/images/job-application.png"}
  //                 fill
  //                 alt="Banner-image"
  //                 className="rounded-xl"
  //                 // className={` rounded-xl ${
  //                 //   activeSlide === index ? "object-cover" : "object-cover"
  //                 // }`}
  //               />
  //             </div>
  //           </SwiperSlide>
  //         );
  //       })}
  //     </Swiper>
  //   </>
  // );

  const handleTransitionStart = (swiper) => {
    // console.log("start");
    // const realIndex = swiper.realIndex;
    // const nextIndex = (realIndex + 1) % arr.length; // Calculate the index of the next slide
    // // Increase the width of the next slide just before transitioning
    // const slideElements = document.querySelectorAll(".swiper-slide");
    // slideElements[nextIndex].style.width = "300px";

    const realIndex = activeSlide;
    const nextIndex = (realIndex + 1) % arr.length;

    console.log("real index", realIndex);
    console.log("next index", nextIndex);
    const slideElements = document.querySelectorAll(".my-slide");
    console.log(slideElements?.length);
    // Set the width of the current slide to 158px
    slideElements[realIndex].style.width = "158px";

    // Set the width of the next slide to 300px
    slideElements[nextIndex].style.width = "300px";
  };
  // console.log(banner_images);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
          waitForTransition: true,
        }}
        loop={true}
        modules={[Autoplay, Controller]}
        // onTransitionStart={handleTransitionStart}
        // onBeforeSlideChangeStart={handleTransitionStart}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          setActiveSlide(realIndex);
        }}
        // effect={"creative"}
        // creativeEffect={{
        //   prev: {
        //     shadow: true,
        //     translate: [0, 0, -400],
        //   },
        //   next: {
        //     translate: ["100%", 0, 0],
        //   },
        // }}
        className="banner-swiper"
      >
        {banner_images?.map((img, index) => {
          // !w-[${activeSlide === index ? "300px" : "150px"}]
          return (
            <SwiperSlide
              key={index}
              // className={`my-slide !w-[${
              //   activeSlide === index ? "350px" : "150px"
              // }] transition-all ease-in-out duration-500
              // `}
              className={`my-slide ${index === 0 && "!w-[350px]"}  `}
              // className={`my-slide !w-[${
              //   activeSlide === index ? "300px" : "150px"
              // }]
              // `}
            >
              <div className="w-full h-[381px] rounded-2xl overflow-hidden">
                <Image
                  src={`${BASE_URL}${img?.attributes?.url || "/"}`}
                  fill
                  alt="Banner-image"
                  className="rounded-xl"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MyCarousel;
