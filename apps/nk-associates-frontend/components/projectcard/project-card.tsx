import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import "./project-card.css";

import LocationIcon from "../../public/assets/icons/area-marker.svg";
import LocationIconSecondary from "../../public/assets/images/LocationIconSecondary.svg";
import NoImageIcon from "../../public/assets/icons/no-image-svg.svg";

interface ProjectCardProps {
  imagesList: string[];
  propertyName: string;
  plotSize: string;
  plotNo: string;
  coveredArea: string;
  location: string;
  propertyDescription: string;
  propertyType: string;
  primaryColor?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imagesList,
  propertyName,
  plotSize,
  plotNo,
  coveredArea,
  location,
  propertyDescription,
  propertyType,
  primaryColor = true,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundColor = primaryColor
    ? "bg-gradient-to-b bg-nk-gradient-red-one to-nk-gradient-red-two"
    : "bg-white";
  const textColor = primaryColor ? "text-white" : "text-black";
  const flexDirection = primaryColor ? "sm:flex-row-reverse" : "sm:flex-row";

  return (
    <div
      className={`project-card mb-[2.3rem] flex h-[32.875rem] w-full flex-col overflow-hidden rounded-2xl shadow-md last-of-type:mb-4 sm:h-[21rem] md:mb-[4.5rem] md:h-[26rem] lg:h-[31.25rem] ${flexDirection} md:rounded-3xl ${backgroundColor} ${textColor}`}
    >
      <div className="relative h-full min-h-[21rem] w-full sm:h-auto sm:w-[65%]">
        {imagesList.length > 0 ? (
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            initialSlide={0}
            pagination={true}
            modules={[Pagination]}
            className="mySwiper carousel-slider h-full w-full"
          >
            {imagesList?.map((url, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    src={url}
                    alt="Carousel Image"
                    layout="fill"
                    objectFit="cover"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white text-black">
            <Image
              src={NoImageIcon}
              width={50}
              height={50}
              alt="No Image Available"
              layout="contain"
              objectFit="contain"
              className={`mr-2 rounded-xl`}
            />
            No Image Available
          </div>
        )}
      </div>

      <div className="flex flex-col px-4 py-3.5 sm:w-[35%] md:p-6">
        <div className=" flex flex-col">
          <h1
            className="mb-1.5 truncate font-metropolis-extrabold text-[1.375rem] leading-7 md:mb-3 md:text-2xl lg:text-3xl"
            title={propertyName}
          >
            {propertyName}
          </h1>

          {propertyDescription && (
            <div className="mb-3 line-clamp-4 lg:line-clamp-6">
              <p
                className="hidden break-words font-metropolis-extralight text-sm sm:block sm:text-base md:text-xl"
                title={propertyDescription}
              >
                {propertyDescription}
              </p>
            </div>
          )}

          <p className="truncate font-metropolis-extralight text-sm sm:text-base md:mb-0 lg:text-xl">
            Plot Size:
            <strong
              className="mx-1 font-metropolis-semibold md:mx-3"
              title={plotSize}
            >
              {plotSize}
            </strong>
          </p>

          <p className="truncate font-metropolis-extralight text-sm sm:text-base md:mb-0 lg:text-xl">
            Plot No:
            <strong
              className="mx-1 font-metropolis-semibold md:mx-3"
              title={plotNo}
            >
              {plotNo}
            </strong>
          </p>

          <p className="truncate font-metropolis-extralight text-sm sm:text-base md:mb-0 lg:text-xl">
            Covered Area:
            <strong
              className=" mx-1 font-metropolis-semibold md:mx-3"
              title={coveredArea}
            >
              {coveredArea}
            </strong>
          </p>
        </div>

        <div className="mt-auto pt-4">
          {propertyType && (
            <div
              className={`mb-5 hidden rounded-full px-3.5 py-1 sm:inline-block ${
                primaryColor
                  ? "bg-nk-white-dark text-nk-gray"
                  : "bg-nk-red text-nk-white"
              }`}
            >
              <h3 className="flex items-center font-metropolis text-base lg:text-lg">
                {propertyType}
              </h3>
            </div>
          )}

          <div className="flex items-start">
            <div className="mr-3 flex w-[12.25px] min-w-[1rem] justify-center md:w-[20px]">
              <Image
                src={
                  primaryColor ? LocationIconSecondary.src : LocationIcon.src
                }
                width={windowWidth < 768 ? 12.25 : 20}
                height={windowWidth < 768 ? 17.5 : 28}
                alt=""
              />
            </div>
            <div
              className="line-clamp-2 font-metropolis-extralight text-[0.813rem] sm:text-base sm:leading-5 lg:text-lg lg:leading-6"
              title={location}
            >
              {location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
