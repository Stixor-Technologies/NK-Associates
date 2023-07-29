"use client";
import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "../../../utils/constants";
import { MediaAttributes } from "../../../utils/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

interface SliderProps {
  property_images: MediaAttributes[];
}

const DetailSlider: FC<SliderProps> = ({ property_images }) => {
  return (
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
      {property_images.map(
        ({ attributes: { name, url } }: MediaAttributes, index: number) => {
          return (
            <SwiperSlide key={index}>
              <div className="relative flex w-full items-center pb-3/4 md:pb-1/2">
                <Image
                  className="absolute left-0 top-0 h-full w-full"
                  src={`${BASE_URL}${url}`}
                  width={1536}
                  height={900}
                  alt={name}
                />
              </div>
            </SwiperSlide>
          );
        }
      )}
    </Swiper>
  );
};

export default DetailSlider;
