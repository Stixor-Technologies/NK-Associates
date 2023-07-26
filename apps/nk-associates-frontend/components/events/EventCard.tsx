"use client";
import { BASE_URL } from "../../utils/constants";
import React from "react";
import { Events } from "../../utils/types/types";
import Image from "next/image";
import LocationMarker from "../../public/assets/icons/location-bar.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./events.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface EventProps {
  data: Events[];
}

const EventCard: React.FC<EventProps> = ({ data }) => {
  return (
    <>
      {data?.map((dataItem, index) => (
        <div
          key={index}
          className="flex flex-1 flex-col overflow-hidden rounded-lg"
        >
          <div className="overflow-hidden rounded-lg">
            <div className="slide-container relative mb-3 overflow-hidden rounded-lg">
              <Swiper
                grabCursor={true}
                slidesPerView={1}
                pagination={true}
                modules={[Pagination]}
                className="mySwiper h-[20rem] w-full md:h-[25rem]"
              >
                {dataItem?.attributes?.event_image?.data?.map(
                  (imageData, index) => {
                    return (
                      <SwiperSlide key={index} className="h-full w-full">
                        <Image
                          src={`${BASE_URL}${imageData.attributes.url.trim()}`}
                          alt="Slide Image"
                          fill
                          objectFit="cover"
                        />
                      </SwiperSlide>
                    );
                  }
                )}
              </Swiper>
            </div>

            <div className="flex justify-between">
              <div className="mb-3 max-w-full text-2xl font-bold tracking-tight text-gray-900 md:max-w-[70%] md:text-4xl">
                {dataItem?.attributes?.event_title}
              </div>

              <div className="mb-3 mr-1 hidden max-w-[30%] gap-2 md:flex md:items-center ">
                <>
                  <Image
                    src={LocationMarker}
                    alt="Location Bar"
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                </>
                <div className="text-lg font-light text-red-500">
                  {dataItem?.attributes?.event_location}
                </div>
              </div>
            </div>

            <div className="mb-3 text-nk-gray underline">
              Hosted by
              <span className="text-nk-black">
                {` ${dataItem?.attributes?.event_host}`}
              </span>
            </div>

            <div className="custom-scrollbar mb-3 line-clamp-4 h-24 overflow-hidden font-normal text-nk-black hover:line-clamp-none hover:overflow-auto">
              {dataItem?.attributes?.event_description}
            </div>

            <div className="flex justify-between">
              <div className="mb-3 font-bold text-nk-black underline">
                Date:
                <span className="font-semibold text-nk-gray">
                  {` ${dataItem?.attributes?.event_date}`}
                </span>
              </div>

              <div className="mb-3 mr-1 flex items-center gap-2 md:hidden">
                <>
                  <Image
                    src={LocationMarker}
                    alt="Location Bar"
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                </>
                <div className="text-lg font-normal text-red-500">
                  {dataItem?.attributes?.event_location}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EventCard;
