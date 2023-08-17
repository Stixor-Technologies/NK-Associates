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
import WhatsAppIcon from "../../../public/assets/icons/whatsapp-icon.svg";
import PhoneIcon from "../../../public/assets/icons/phone-icon.svg";
import { string } from "yup";
import Link from "next/link";

interface SliderProps {
  property_images: MediaAttributes[];
  phone: string;
}

const DetailSlider: FC<SliderProps> = ({ property_images, phone }) => {
  const whatsapp = "https://wa.me/" + phone;
  return (
    <div className="relative bg-right-top bg-no-repeat md:bg-nk-bg">
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
        {property_images?.map(
          ({ attributes: { name, url } }: MediaAttributes, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="relative mx-auto aspect-video overflow-hidden max-h-[80vh]">
                  <Image
                    className="absolute top-0 left-0 h-full w-full rounded-none lg:rounded-3xl object-cover"
                    src={`${BASE_URL}${url}`}
                    width={1536}
                    height={900}
                    alt={name}
                  />

                  <div className="absolute bottom-2 right-4  z-10 flex items-center justify-center gap-2 md:gap-2 md:bottom-3 md:right-3 lg:bottom-6 lg:right-6">
                    <Link
                      href="https://wa.me/03245724522"
                      rel="noopener norefferrer"
                      target="_blank"
                      className="group flex h-8 w-10 items-center justify-center overflow-hidden rounded-md border bg-nk-white transition-all delay-200 duration-500 hover:shadow-lg sm:h-10 sm:w-12 md:h-12 md:w-14"
                    >
                      <Image
                        src={WhatsAppIcon}
                        width={40}
                        height={40}
                        alt="contact-whatsapp"
                        className="w-5 transition-all delay-200 duration-500 group-hover:scale-110 sm:w-6 md:w-8"
                      />
                    </Link>
                    <Link
                      className="group flex h-8 w-10 items-center justify-center overflow-hidden rounded-md border bg-nk-white transition-all delay-200 duration-500 hover:shadow-lg sm:h-10 sm:w-12 md:h-12 md:w-14"
                      href={`tel:03245724522`}
                      rel="noopener norefferrer"
                      target="_blank"
                    >
                      <Image
                        src={PhoneIcon}
                        width={40}
                        height={40}
                        alt="contact-phone"
                        className="w-5 transition-all delay-200 duration-500 group-hover:scale-110 sm:w-6 md:w-8"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          },
        )}
      </Swiper>
    </div>
  );
};

export default DetailSlider;
