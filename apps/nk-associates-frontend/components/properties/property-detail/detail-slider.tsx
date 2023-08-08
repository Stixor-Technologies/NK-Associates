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
import "./slider-styles.css";
import WhatsAppIcon from "../../../public/assets/icons/whatsapp-icon.svg"
import PhoneIcon from "../../../public/assets/icons/phone-icon.svg"


interface SliderProps {
  property_images: MediaAttributes[];
}

const DetailSlider: FC<SliderProps> = ({ property_images }) => {
  return (
    <div className="relative">
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
                <div className="relative mx-auto w-full h-[40vh] overflow-hidden sm:h-[60vh] md:h-[80vh] flex items-center">
                <div className="relative h-4/5 m-auto">
                <Image
                    className="m-auto h-full w-full object-contain rounded-2xl"
                    src={`${BASE_URL}${url}`}
                    width={1536}
                    height={900}
                    alt={name}
                  />
                </div>
                 
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>

      <div className="absolute bottom-6 right-3 z-10 flex items-center justify-center gap-2 md:gap-2 lg:bottom-12 lg:right-8">
      
        <button className="group flex h-10 w-12 items-center justify-center rounded-md bg-nk-white overflow-hidden transition-all sm:h-12 sm:w-14 md:h-14 md:w-16 duration-500 delay-200 border hover:shadow-lg">
          
          <Image src={WhatsAppIcon} width={40} height={40} alt="contact-whatspp" className="w-6 transition-all duration-500 delay-200 sm:w-8 md:w-10 group-hover:scale-110"/>  
        </button>

        <button className="group flex h-10 w-12 items-center justify-center rounded-md bg-nk-white overflow-hidden transition-all duration-500 delay-200 sm:h-12 sm:w-14 md:h-14 md:w-16">
        <Image src={PhoneIcon} width={40} height={40} alt="contact-phone" className="w-6 transition-all duration-500 delay-200 sm:w-8 md:w-10 group-hover:scale-110"/>
        </button>
      </div>
    </div>
  );
};

export default DetailSlider;
