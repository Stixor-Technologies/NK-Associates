import React, { useEffect, useState } from "react";
import Image from "next/image";
import LocationIcon from "../../public/assets/icons/area-marker.svg";
import LocationIconSecondary from "../../public/assets/images/LocationIconSecondary.svg";
import NoImageIcon from "../../public/assets/icons/no-image-svg.svg";

interface ProjectCardProps {
  image: string;
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
  image,
  propertyName,
  plotSize,
  plotNo,
  coveredArea,
  location,
  propertyDescription,
  propertyType,
  primaryColor = true
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
  const flexDirection = primaryColor ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div
      className={`mb-[2.3rem] flex h-[32.875rem] w-96 flex-col overflow-hidden rounded-2xl shadow-md md:mb-[4.5rem] md:h-[31.25rem] md:w-[76.25rem] ${flexDirection} md:rounded-3xl ${backgroundColor} ${textColor}`}
    >
      <div className="relative h-80 w-full  md:flex md:h-auto md:w-[65%] ">
        {image ? (
          <Image
            src={image}
            alt="Card Image"
            layout="fill"
            objectFit="cover"
            className={`rounded-xl ${
              primaryColor
                ? "md:rounded-bl-none md:rounded-br-3xl md:rounded-tl-none md:rounded-tr-3xl"
                : "md:rounded-bl-3xl md:rounded-br-none md:rounded-tl-3xl md:rounded-tr-none"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white text-black">
            <Image
              src={NoImageIcon}
              width={50}
              height={50}
              alt="No Image Available"
              layout="contain"
              objectFit="contain"
              className={`mr-2 rounded-xl ${
                primaryColor
                  ? "md:rounded-bl-none md:rounded-br-3xl md:rounded-tl-none md:rounded-tr-3xl"
                  : "md:rounded-bl-3xl md:rounded-br-none md:rounded-tl-3xl md:rounded-tr-none"
              }`}
            />
            No Image Available
          </div>
        )}
      </div>
      <div className="m-6 my-[0.94rem] ml-[1.42rem] flex-1 md:my-12 md:ml-[1.875rem] md:flex md:w-[35%] md:flex-col">
        <div className="md:flex md:flex-grow md:flex-col">
          <div className=" flex flex-col">
            <div className="flex w-full flex-row">
              <h1 className="mb-2 font-metropolis-extrabold text-[1.375rem] md:text-[2rem]">
                {propertyName}
              </h1>
            </div>
            <div className="flex w-full flex-row">
              {propertyDescription && (
                <div className="hidden w-full flex-row  md:flex">
                  <h3 className="mb-2 font-metropolis-extralight text-[1.375rem]">
                    <span className=" font-metropolis-extralight">
                      {propertyDescription}
                    </span>
                  </h3>
                </div>
              )}
            </div>
            <div className="flex w-full flex-row">
              <h3 className="mb-2 font-metropolis-extralight text-sm md:text-[1.375rem]">
                Plot Size:
                <span className="mx-1 font-metropolis-semibold md:mx-3 md:text-[1.375rem]">
                  {plotSize}
                </span>
              </h3>
            </div>
            <div className="flex w-full flex-row">
              <h3 className="mb-2 font-metropolis-extralight text-sm md:text-[1.375rem]">
                Plot No:
                <span className="mx-1 font-metropolis-semibold md:mx-3">
                  {plotNo}
                </span>
              </h3>
            </div>
            <div className="flex w-full flex-row">
              <h3 className="mb-2 font-metropolis-extralight text-sm md:text-[1.375rem]">
                Covered Area:
                <span className=" mx-1 font-metropolis-semibold md:mx-3">
                  {coveredArea}
                </span>
              </h3>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex w-full flex-row">
              {propertyType && (
                <div
                  className={`hidden md:my-6 md:flex md:flex-row md:justify-center md:rounded-full ${
                    primaryColor ? "md:bg-nk-white-dark" : "md:bg-nk-red"
                  }`}
                >
                  <h3 className="mb-2 flex items-center font-metropolis text-xl">
                    <span
                      className={`inline-block max-w-max px-4 pt-2 font-metropolis ${
                        primaryColor ? "text-nk-gray" : "text-nk-white"
                      }`}
                    >
                      {propertyType}
                    </span>
                  </h3>
                </div>
              )}
            </div>
            <div className="flex w-full flex-row">
              <div className="flex w-1/12 flex-col justify-center md:mr-3">
                <Image
                  src={
                    primaryColor ? LocationIconSecondary.src : LocationIcon.src
                  }
                  width={windowWidth < 640 ? 12.25 : 20}
                  height={windowWidth < 640 ? 17.5 : 28}
                  alt=""
                />
              </div>
              <div className="mx-0 flex w-11/12 flex-col justify-center font-metropolis-extralight text-[0.813rem] md:text-lg">
                {location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
