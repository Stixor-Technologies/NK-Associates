"use client";
import { BASE_URL } from "../../utils/constants";
import React, { useState } from "react";
import { Events } from "../../utils/types/types";
import Image from "next/image";
import Arrow from "../../public/assets/icons/arrow.svg";
import LocationMarker from "../../public/assets/icons/location-bar.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./events.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import EventModal from "./event-modal";

interface EventProps {
  data: Events[];
}

const EventCard: React.FC<EventProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCardData, setSelectedCardData] = useState<Events>();

  const readMoreClick = (EventData) => {
    setSelectedCardData(EventData);
    setIsOpen(true);
  };

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
                          className="object-cover"
                        />
                      </SwiperSlide>
                    );
                  }
                )}
              </Swiper>
            </div>

            <div className="flex justify-between">
              <div className="mb-3 line-clamp-1 max-w-full font-metropolis-bold text-2xl tracking-tight text-gray-900 md:max-w-[70%] md:text-3xl">
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
                <div className="font-metropolis-light text-lg text-red-500">
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

            <div className="mb-3 flex flex-col gap-2">
              <div className="custom-scrollbar  line-clamp-2 h-12 overflow-hidden text-nk-black">
                {dataItem?.attributes?.event_description}
              </div>

              <div
                className="flex gap-1 text-nk-red"
                onClick={() => {
                  readMoreClick(dataItem);
                }}
              >
                <div className="cursor-pointer">Read More</div>
                <Image
                  src={Arrow}
                  alt="Location Bar"
                  width={10}
                  height={10}
                  className="flex-shrink-0 -rotate-90 cursor-pointer accent-nk-red"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-3 font-metropolis-bold text-nk-black underline">
                Date:
                <span className="font-metropolis-semibold text-nk-gray">
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
                <div className="text-lg text-red-500">
                  {dataItem?.attributes?.event_location}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <EventModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        eventData={selectedCardData}
      />
    </>
  );
};

export default EventCard;
