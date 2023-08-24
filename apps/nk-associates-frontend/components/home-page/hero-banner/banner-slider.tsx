import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "./banner-styles.css";

const BannerSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  console.log(`Active Slide: ${activeSlide}`);

  return (
    <>
      <Swiper
        slidesPerView={4}
        // slidesPerView={"auto"}
        spaceBetween={20}
        autoplay={true}
        keyboard={true}
        modules={[Autoplay]}
        loop={true}
        // centeredSlides={true}
        onSlideChange={(swiper) => {
          // console.log(swiper.activeIndex);
          const realIndex = swiper.realIndex;
          setActiveSlide(realIndex);
          // setActiveSlide(swiper.activeIndex);
        }}
        className="banner-swiper"
      >
        {arr.map((ele, index) => {
          // Index: ${index}
          return (
            <SwiperSlide key={index}>
              <div
                // className={`!w-[${
                //   activeSlide === index ? "300px" : "200px"
                // }] h-[400px] transition-width duration-300 bg-slate-400`}
                className="w-full h-[381px] rounded-2xl overflow-hidden"
              >
                {/* {index} */}
                <Image
                  src={"/assets/images/Img.png"}
                  fill
                  alt="Banner-image"
                  className="rounded-xl"
                  // className={` rounded-xl ${
                  //   activeSlide === index ? "object-cover" : "object-cover"
                  // }`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default BannerSlider;
