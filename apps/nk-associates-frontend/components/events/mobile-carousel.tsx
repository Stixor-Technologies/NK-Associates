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

const MobileCarousel: React.FC<CarouselProps> = ({ images }) => {
  const shuffledImages = images?.slice().sort(() => Math.random() - 0.5);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for images to load before setting the isLoaded state to true
    const imagePromises = shuffledImages.slice(0, 10).map((image) => {
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
    <>
      <div className="container">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          autoplay={true}
          loop={true}
          initialSlide={0}
          slidesPerView={1}
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper4 mx-auto mb-3 h-full w-full"
        >
          {shuffledImages?.slice(0, 10).map((image, index) => {
            return (
              <SwiperSlide
                key={index}
                className="relative aspect-square overflow-hidden drop-shadow-lg"
              >
                <Image
                  src={`${BASE_URL}${image}`}
                  alt="Carousel Image"
                  fill
                  className="h-full w-full object-cover"
                />
                <div className="gradient-overlay absolute bottom-[10rem] left-0 h-[10rem] w-full"></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default MobileCarousel;
