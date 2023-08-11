"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import Image from "next/image";
import { Thumbs, FreeMode } from "swiper/modules";

type PropTypes = {
  pictures: string[];
};

const ProjectGallery = ({ pictures }: PropTypes) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="container py-8 md:py-14">
      <h2 className="mb-4 text-center font-metropolis-bold text-2xl md:mb-8">
        Gallery
      </h2>

      {pictures.length > 0 ? (
        <>
          <Swiper
            centeredSlides={true}
            initialSlide={0}
            pagination={false}
            thumbs={{
              swiper: thumbsSwiper
            }}
            className="mySwiper carousel-slider h-[25rem] w-full rounded-xl sm:aspect-video sm:h-auto"
            modules={[Thumbs, FreeMode]}
          >
            {pictures?.map((url, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={url}
                  alt="Carousel Image"
                  layout="fill"
                  objectFit="cover"
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            modules={[Thumbs, FreeMode]}
            watchSlidesProgress
            spaceBetween={10}
            slidesPerView="auto"
            onSwiper={setThumbsSwiper}
            className="mySwiper2 mt-2"
          >
            {pictures?.map((url, index) => (
              <SwiperSlide
                key={index}
                className="aspect-video !w-[8.125rem] cursor-pointer md:!w-[10rem] lg:!w-[12.5rem]"
              >
                <Image
                  src={url}
                  alt="Thumb Item"
                  layout="fill"
                  objectFit="cover"
                  className="h-full w-full rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="flex h-[25rem] w-full items-center justify-center rounded-xl bg-white text-black">
          <div className="h-10 w-10">
            <svg
              fill="#000000"
              viewBox="0 0 32 32"
              id="icon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <title>no-image</title>
              <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z" />
              <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z" />
              <rect
                id="_Transparent_Rectangle_"
                data-name="&lt;Transparent Rectangle&gt;"
                className="fill-none"
                width="32"
                height="32"
              />
            </svg>
          </div>
          No Images Available
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
