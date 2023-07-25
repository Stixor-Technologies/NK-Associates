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
    <Swiper
      cssMode={true}
      navigation={true}
      keyboard={true}
      loop = {true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination, Keyboard]}
      className="mySwiper"
    >
      {imga.map((index) => {
        return (
          <SwiperSlide key={index}>
            <div className="relative aspect-w-1 aspect-h-1 w-full h-[100vh] block bg-slate-100">
              <Image
              className=" object-cover"
                src={"/assets/images/5.svg"}
                fill
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
