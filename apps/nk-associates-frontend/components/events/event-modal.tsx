"use client";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Events } from "../../utils/types/types";
import { ModalOptions, ModalInterface, Modal } from "flowbite";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LocationMarker from "../../public/assets/icons/location-bar.svg";
import Image from "next/image";
import Cross from "../../public/assets/icons/cross.svg";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "./events.css";
import { BASE_URL } from "../../utils/constants";
import { format } from "date-fns";
import CursorUtility from "../../utils/cursor-utility";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  eventData: Events;
}

const EventModal: React.FC<ModalProps> = ({ open, onClose, eventData }) => {
  const modalElement = useRef<HTMLDivElement | null>(null);
  let cursorUtilityRef = useRef<CursorUtility | null>(null);
  const eventsModalSlider = useRef<HTMLDivElement | null>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  const modal = useMemo(() => {
    if (!modalElement.current) {
      return null;
    }
    const modalOptions: ModalOptions = {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-900 bg-opacity-70 fixed inset-0 z-40",
      closable: true,
      onHide: () => {
        onClose();
      },
    };

    return new Modal(modalElement.current, modalOptions);
  }, [onClose]);

  useEffect(() => {
    if (eventsModalSlider?.current) {
      cursorUtilityRef.current = new CursorUtility(eventsModalSlider?.current);
    }

    if (!modalElement.current || !modal) {
      return;
    }
    if (open) {
      modal.show();
    } else {
      onClose();
      modal?.hide();

      if (mainSwiper) {
        mainSwiper.slideTo(0);
      }
      if (thumbsSwiper) {
        thumbsSwiper.slideTo(0);
      }
    }

    return () => {
      if (cursorUtilityRef?.current) {
        cursorUtilityRef?.current?.destroy();
        cursorUtilityRef.current = null;
      }

      if (open) {
        onClose();
        modal?.hide();
      }
    };
  }, [mainSwiper, modal, onClose, open, thumbsSwiper]);

  const showAnimatedCursor = () => {
    cursorUtilityRef?.current?.showCursor();
  };

  const hideAnimatedCursor = () => {
    cursorUtilityRef?.current?.hideCursor();
  };

  return (
    <div
      ref={modalElement}
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 hidden w-full overflow-y-auto overflow-x-hidden p-4 md:h-full"
    >
      <div className="m-auto w-full max-w-4xl 2xl:max-w-6xl overflow-hidden rounded-3xl bg-white">
        <div className="slide-container relative mb-3 overflow-hidden">
          <div
            ref={eventsModalSlider}
            onMouseEnter={showAnimatedCursor}
            onMouseLeave={hideAnimatedCursor}
          >
            <Swiper
              onSwiper={(swiper) => setMainSwiper(swiper)}
              spaceBetween={10}
              navigation={false}
              loop={true}
              pagination={true}
              initialSlide={0}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Pagination, Thumbs]}
              className="mySwiper2 h-[19.5rem] md:h-[32rem] 2xl:h-[50rem]"
            >
              {eventData?.attributes?.event_image?.data?.map(
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
                },
              )}
            </Swiper>
          </div>
          <div className="mt-4 hidden md:block">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              loop={true}
              slidesPerView={4}
              initialSlide={0}
              freeMode={false}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper3 h-[6rem]"
            >
              {eventData?.attributes?.event_image?.data?.map(
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
                },
              )}
            </Swiper>
          </div>

          <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-nk-white opacity-50 hover:opacity-100 md:opacity-30">
            <button
              onClick={() => {
                modal.hide();
              }}
            >
              <Image src={Cross} alt="Cross" width={15} height={15} />
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-center p-4">
          <div className=" text-center font-metropolis-bold text-2xl text-nk-black md:text-4xl">
            {eventData?.attributes?.event_title}
          </div>
          <div className="font-metropolis-semibold text-sm text-nk-gray underline md:text-lg">
            Hosted by
            <span className="mt-5 font-metropolis-semibold">
              {` ${eventData?.attributes?.event_host}`}
            </span>
          </div>

          <div className="mt-1 p-4 text-center font-metropolis-extralight text-sm md:text-2xl">
            {eventData?.attributes?.event_description}
          </div>
          {eventData?.attributes?.event_location && (
            <div className="mt-5 flex items-center gap-2 ">
              <>
                <Image
                  src={LocationMarker}
                  alt="Location Bar"
                  width={30}
                  height={30}
                  className="flex-shrink-0"
                />
              </>
              <div className="font-metropolis-light text-lg text-red-500 md:text-3xl">
                {eventData?.attributes?.event_location}
              </div>
            </div>
          )}

          <div className="mt-4 text-sm text-nk-black underline md:text-lg">
            Date:
            <span className="text-nk-grey">
              {eventData &&
                ` ${format(
                  new Date(eventData.attributes.event_date),
                  "dd-MM-yyyy",
                )}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
