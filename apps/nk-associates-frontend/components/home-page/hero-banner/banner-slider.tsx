import React, { FC, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { MediaAttributes } from "../../../utils/types/types";
import { BASE_URL } from "../../../utils/constants";
import "./banner-styles.css";

interface BannerImagesProps {
  banner_images: MediaAttributes[];
}

const BannerSlider: FC<BannerImagesProps> = ({ banner_images }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {banner_images && banner_images.length > 0 && (
        <Swiper
          slidesPerView={3}
          // slidesPerView={"auto"}
          spaceBetween={20}
          autoplay={true}
          keyboard={true}
          modules={[Autoplay]}
          // loop={true}
          // centeredSlides={true}
          onSlideChange={(swiper) => {
            swiper.updateSlides();

            if (!isNaN(swiper.realIndex)) {
              // setActiveSlide(swiper.realIndex);
            }
            console.log(swiper.realIndex);
            // const realIndex = swiper.realIndex;
            // setActiveSlide(realIndex);

            // setActiveSlide(swiper.activeIndex);
          }}
          className="banner-swiper"
        >
          {banner_images.map((img, index) => {
            // Index: ${index}
            return (
              <SwiperSlide key={index}>
                <div
                  // className={`!w-[${
                  //   activeSlide === index ? "300px" : "200px"
                  // }] h-[400px] transition-width duration-300 bg-slate-400`}
                  className="w-[200px] h-[381px] rounded-2xl overflow-hidden"
                >
                  {/* {index} */}
                  <Image
                    // src={"/assets/images/Img.png"}
                    src={`${BASE_URL}${img?.attributes?.url || "/"}`}
                    fill
                    alt="Banner-image"
                    className="rounded-xl"
                    // className={` rounded-xl ${
                    //   activeSlide === index ? "object-cover" : "object-cover"
                    // }`}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default BannerSlider;
