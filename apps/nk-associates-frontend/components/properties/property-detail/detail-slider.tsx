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

      <div className="absolute bottom-6 right-3 z-10 flex items-center justify-center gap-2 md:gap-2 lg:bottom-12 lg:right-8">
      
        <button className="group relative z-10 flex h-10 w-12 items-center justify-center rounded-md bg-nk-white overflow-hidden transition-all sm:h-12 sm:w-14 md:h-14 md:w-16">
          <svg
            width="63"
            height="64"
            viewBox="0 0 63 64"
            className="w-6 fill-nk-red transition-all delay-200 duration-500 ease-in-out group-hover:fill-nk-white sm:w-8 md:w-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M31.503 5.33337C46.0008 5.33337 57.753 17.272 57.753 32C57.753 46.728 46.0008 58.6667 31.503 58.6667C26.864 58.6743 22.3067 57.4272 18.2992 55.0534L5.26347 58.6667L8.81247 45.4187C6.47384 41.3464 5.24522 36.7147 5.25297 32C5.25297 17.272 17.0051 5.33337 31.503 5.33337ZM22.557 19.4667L22.032 19.488C21.6921 19.5091 21.3599 19.5998 21.0555 19.7547C20.7707 19.9185 20.5108 20.1233 20.2837 20.3627C19.9687 20.664 19.7902 20.9254 19.5986 21.1787C18.6277 22.4611 18.1049 24.0355 18.1128 25.6534C18.1181 26.96 18.4541 28.232 18.9791 29.4214C20.0527 31.8267 21.8193 34.3734 24.1503 36.7334C24.7121 37.3014 25.2633 37.872 25.8566 38.4027C28.753 40.9933 32.2045 42.8615 35.9366 43.8587L37.4276 44.0907C37.9132 44.1174 38.3988 44.08 38.8871 44.056C39.6516 44.0159 40.3981 43.8057 41.0737 43.44C41.4175 43.2602 41.7529 43.0644 42.0791 42.8534C42.0791 42.8534 42.192 42.7787 42.4072 42.6134C42.7616 42.3467 42.9795 42.1574 43.2735 41.8454C43.4913 41.616 43.6803 41.3467 43.8247 41.04C44.0295 40.6054 44.2342 39.776 44.3182 39.0854C44.3812 38.5574 44.3628 38.2694 44.355 38.0907C44.3445 37.8054 44.1108 37.5094 43.8562 37.384L42.3285 36.688C42.3285 36.688 40.0447 35.6774 38.6482 35.032C38.5021 34.9672 38.3455 34.9302 38.1862 34.9227C38.0066 34.904 37.8251 34.9245 37.654 34.9829C37.4828 35.0413 37.326 35.1363 37.194 35.2614C37.1808 35.256 37.005 35.408 35.1071 37.744C34.9982 37.8927 34.8481 38.0051 34.6761 38.0669C34.504 38.1286 34.3178 38.1369 34.1411 38.0907C33.9701 38.0441 33.8025 37.9853 33.6397 37.9147C33.3142 37.776 33.2013 37.7227 32.9782 37.6267C31.4716 36.9588 30.0768 36.0564 28.8438 34.952C28.5131 34.6587 28.206 34.3387 27.891 34.0294C26.8583 33.0247 25.9582 31.8881 25.2135 30.648L25.0586 30.3947C24.9473 30.2245 24.8574 30.0408 24.7908 29.848C24.6911 29.456 24.951 29.1414 24.951 29.1414C24.951 29.1414 25.5888 28.432 25.8855 28.048C26.1742 27.6747 26.4183 27.312 26.5758 27.0534C26.8856 26.5467 26.9827 26.0267 26.82 25.624C26.085 23.8 25.3237 21.984 24.5415 20.1814C24.3866 19.824 23.9272 19.568 23.5098 19.5174C23.3681 19.5014 23.2263 19.4854 23.0846 19.4747C22.7321 19.4569 22.3788 19.4605 22.0267 19.4854L22.5543 19.464L22.557 19.4667Z" />
          </svg>

          <span className="absolute bottom-0 left-0 -z-10 h-full w-full -translate-x-full translate-y-full rounded-md bg-nk-red transition-all delay-200 duration-500 ease-in-out group-hover:translate-y-0  group-hover:translate-x-0"></span>
        </button>

        <button className="group relative z-10 flex h-10 w-12 items-center justify-center rounded-md bg-nk-white overflow-hidden transition-all sm:h-12 sm:w-14 md:h-14 md:w-16">
          <svg
            width="63"
            height="64"
            viewBox="0 0 63 64"
            className="w-6 fill-nk-red transition-all delay-200 duration-500 ease-in-out group-hover:fill-nk-white sm:w-8 md:w-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M52.3688 56C46.725 56 41.2239 54.7218 35.8654 52.1653C30.5069 49.6089 25.76 46.2311 21.6248 42.032C17.4895 37.8329 14.1645 33.0107 11.6498 27.5653C9.135 22.12 7.87675 16.5316 7.875 10.8C7.875 10 8.1375 9.33333 8.6625 8.8C9.1875 8.26667 9.84375 8 10.6313 8H21.2625C21.875 8 22.4219 8.2 22.9031 8.6C23.3844 9 23.6688 9.51111 23.7563 10.1333L25.4625 19.4667C25.55 20.0889 25.5386 20.656 25.4284 21.168C25.3181 21.68 25.067 22.1351 24.675 22.5333L18.375 29.0667C20.2125 32.2667 22.5094 35.2667 25.2656 38.0667C28.0219 40.8667 31.0625 43.2889 34.3875 45.3333L40.5562 39.0667C40.95 38.6667 41.4645 38.3671 42.0998 38.168C42.735 37.9689 43.358 37.9129 43.9688 38L53.025 39.8667C53.6375 40 54.1406 40.3004 54.5344 40.768C54.9281 41.2356 55.125 41.7796 55.125 42.4V53.2C55.125 54 54.8625 54.6667 54.3375 55.2C53.8125 55.7333 53.1563 56 52.3688 56Z" />
          </svg>

          <span className="absolute bottom-0 left-0 -z-10 h-full w-full -translate-x-full translate-y-full rounded-md bg-nk-red transition-all delay-200 duration-500 ease-in-out group-hover:translate-y-0  group-hover:translate-x-0"></span>
        </button>
      </div>
    </div>
  );
};

export default DetailSlider;
