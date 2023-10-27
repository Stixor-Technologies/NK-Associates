import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import CursorUtility from "../../../utils/cursor-utility";

import "./project-card.css";

import LocationIcon from "../../../public/assets/icons/area-marker.svg";
import LocationIconSecondary from "../../../public/assets/images/LocationIconSecondary.svg";
import NoImageIcon from "../../../public/assets/icons/no-image-svg.svg";
import TourIcon from "../../../public/assets/icons/tour_icon.svg";

interface ProjectCardProps {
  id: number;
  imagesList: string[];
  propertyName: string;
  plotSize: string;
  plotNo: string;
  coveredArea: string;
  location: string;
  propertyDescription: string;
  propertyType: string;
  primaryColor?: boolean;
  actHome?: boolean;
  cursorUtilityRef: MutableRefObject<CursorUtility | null>;
  hasVrTour: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  imagesList,
  propertyName,
  plotSize,
  plotNo,
  coveredArea,
  location,
  propertyDescription,
  propertyType,
  primaryColor = true,
  actHome,
  cursorUtilityRef,
  hasVrTour,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showAnimatedCursor = () => {
    cursorUtilityRef?.current?.showCursor();
  };

  const hideAnimatedCursor = () => {
    cursorUtilityRef?.current?.hideCursor();
  };

  const backgroundColor = primaryColor
    ? "bg-gradient-to-b bg-nk-gradient-red-one to-nk-gradient-red-two"
    : "bg-white";
  const textColor = primaryColor ? "text-white" : "text-black";
  const flexDirection = primaryColor ? "sm:flex-row-reverse" : "sm:flex-row";
  const cardHeight = actHome
    ? "h-[35rem] sm:h-[16.875rem] md:h-[20.625rem] lg:h-[30rem]"
    : "h-[35rem] sm:h-[21rem] md:h-[26rem] lg:h-[31.25rem]";

  return (
    <Link href={`projects/${id}`}>
      <div
        className={`project-card mb-[1.5rem] flex w-full flex-col overflow-hidden rounded-2xl shadow-md md:mb-[3rem] ${flexDirection} md:rounded-3xl ${textColor} ${cardHeight}`}
      >
        <div
          onMouseEnter={showAnimatedCursor}
          onMouseLeave={hideAnimatedCursor}
          className="projects-carousel z-0 relative h-full min-h-[21rem] w-full sm:h-auto sm:w-[65%]"
        >
          {hasVrTour && (
            <div className="absolute w-10 h-10 right-3 top-3 z-10 md:right-5 md:top-5 md:w-16 md:h-16">
              <Image src={TourIcon} fill alt="Virtual Tour" />
            </div>
          )}

          {imagesList?.length > 0 ? (
            <Swiper
              grabCursor={true}
              centeredSlides={true}
              initialSlide={0}
              pagination={true}
              modules={[Pagination]}
              longSwipes={false}
              shortSwipes={true}
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

        <div
          className={`flex flex-col px-4 py-3.5 sm:w-[35%] md:p-6 ${backgroundColor}`}
        >
          <div className=" flex flex-col">
            <h1
              className="mb-1.5 truncate font-metropolis-extrabold text-[1.375rem] leading-5 md:mb-3 md:text-2xl md:leading-7 lg:text-3xl"
              title={propertyName}
            >
              {propertyName}
            </h1>

            {propertyDescription && (
              <div className="mb-3 line-clamp-4 hidden lg:line-clamp-6">
                <p
                  className="break-words font-metropolis-extralight text-sm sm:block sm:text-base md:text-xl"
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
                className={`mb-5 inline-block rounded-full px-3.5 py-1 ${
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
              <div className="mr-3 flex min-w-[1rem] justify-center">
                <Image
                  src={
                    primaryColor ? LocationIconSecondary.src : LocationIcon.src
                  }
                  width={20}
                  height={28}
                  alt="location-marker"
                  className="w-3 md:w-4"
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
    </Link>
  );
};

export default ProjectCard;
