"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./events.css";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../spinner";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for images to load before setting the isLoaded state to true
    const imagePromises = images.slice(0, 10).map((image) => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.src = `${BASE_URL}${image}`;
        img.onload = () => resolve();
        img.onerror = (error) => reject(error);
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoaded(true))
      .catch((error) => console.error("Error loading images:", error));
  }, [images]);

  if (!isLoaded) {
    return (
      <div className="flex h-[10rem] items-center justify-center md:h-[20rem]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container">
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
        {images?.slice(0, 10).map((image, index) => {
          return (
            <SwiperSlide key={index} className="aspect-square drop-shadow-lg">
              <Image
                src={`${BASE_URL}${image}`}
                alt="Carousel Image"
                fill
                className="h-full w-full border-8 border-white object-cover md:border-[1.5rem]"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
