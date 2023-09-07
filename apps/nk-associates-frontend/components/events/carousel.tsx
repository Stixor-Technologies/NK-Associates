"use client";
import React, {
  FC,
  MutableRefObject,
  useState,
  useEffect,
  useRef,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./events.css";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../spinner";
import Image from "next/image";
import CursorUtility from "../../utils/cursor-utility";

interface CarouselProps {
  images: string[];
  cursorUtilityRef: MutableRefObject<CursorUtility | null>;
}

const Carousel: FC<CarouselProps> = ({ images, cursorUtilityRef }) => {
  const shuffledImages = images?.slice()?.sort(() => Math.random() - 0.5);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   const imagePromises = shuffledImages.slice(0, 10).map((image) => {
  //     return new Promise<void>((resolve, reject) => {
  //       const img = new window.Image();
  //       img.src = `${BASE_URL}${image}`;
  //       img.onload = () => resolve();
  //       img.onerror = (error) => reject(error);
  //     });
  //   });

  //   Promise.all(imagePromises)
  //     .then(() => setIsLoaded(true))
  //     .catch((error) => console.error("Error loading images:", error));
  // }, [images]);

  // if (!isLoaded) {
  //   return (
  //     <div className="flex h-[10rem] items-center justify-center md:h-[20rem]">
  //       <Spinner />
  //     </div>
  //   );
  // }

  const showAnimatedCursor = () => {
    cursorUtilityRef.current?.showCursor();
  };

  const hideAnimatedCursor = () => {
    cursorUtilityRef?.current?.hideCursor();
  };

  return (
    <div
      className="container"
      onMouseEnter={showAnimatedCursor}
      onMouseLeave={hideAnimatedCursor}
    >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        autoplay={true}
        loop={true}
        initialSlide={0}
        coverflowEffect={{
          rotate: -10,
          stretch: 0,
          depth: 300,
          slideShadows: false,
        }}
        pagination={false}
        breakpoints={{
          // When screen size is less than 640px, show only 1 slide
          0: {
            slidesPerView: "auto",
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper carousel-slider mx-auto mt-7 h-full w-full"
      >
        {shuffledImages?.slice(0, 10)?.map((image, index) => {
          return (
            <SwiperSlide key={index} className="aspect-square drop-shadow-lg">
              <Image
                src={`${BASE_URL}${image}`}
                alt="Carousel Image"
                fill
                className="h-full w-full border-8 border-white object-cover md:border-[1.5rem]"
                priority
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
