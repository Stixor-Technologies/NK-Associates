"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

const DetailSlider = () => {
  const imga = [1, 2, 3, 4];
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {imga.map((index) => {
        return (
          <SwiperSlide key={index}>
            <div className=" aspect-w-1 aspect-h-1 container w-full h-[80vh]">
              <Image
              className=" object-cover"
                src={"/assets/images/5.svg"}
                fill
                // width={600}
                // height={600}
                alt=""
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default DetailSlider;
