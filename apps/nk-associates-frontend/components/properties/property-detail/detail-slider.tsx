"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

const DetailSlider = () => {
  const imga = [1, 2, 3, 4];
  return (
    // <div className="aspect-w-1 aspect-h-1 relative block h-[80vh] w-full bg-slate-100">
      <Swiper
        cssMode={true}
        navigation={true}
        keyboard={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Keyboard]}
        className="mySwiper"
      >
        {imga.map((index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                className="object-cover max-h-[80vh] w-full"
                src={"/assets/images/1.jpeg"}
                // fill
                width={1536}
                height={900}
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    // </div>
  );
};

export default DetailSlider;
