import React from "react";
import Image from "next/image";
import LocationIcon from "../../app/assets/images/LocationIcon.svg";
import LocationIconSecondary from "../../app/assets/images/LocationIconSecondary.svg";
import ProjectImage from "../../app/assets/images/ProjectSampleImage.png";

const ProjectCard = ({
  image = "/../../favicon.ico",
  propertyName = "Regent one",
  plotSize = "4.11 kanal",
  plotNo = 1,
  coveredArea = "11,000.46 Sq. ft",
  location = "Main Boulevard, Bahria Enclave, Islamabad",
  propertyDescription = "A beautiful plot located in a beautiful location just give us your god damn money",
  propertyType = "Commercial",
  primaryColor = false,
}) => {
  const backgroundColor = primaryColor ? "bg-nk-gradient-red-one" : "bg-white";
  const textColor = primaryColor ? "text-white" : "text-black";
  const locationIconComponent = primaryColor ? (
    <Image src={LocationIconSecondary.src} width={30} height={30} alt="" />
  ) : (
    <Image src={LocationIcon.src} width={30} height={30} alt="" />
  );

  return (
    <div
      className={`m-5 flex flex-col rounded-2xl shadow-md md:flex-row-reverse md:rounded-3xl ${backgroundColor} ${textColor}`}
    >
      <div className="relative h-80 w-full rounded-2xl   md:flex md:h-auto md:w-1/2 lg:h-auto ">
        <Image
          src={ProjectImage.src}
          alt="Card Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className=" m-6 flex-1 md:m-8  md:w-1/2 ">
        <div className=" flex flex-col">
          <div className="flex w-full flex-row">
            <h1 className="mb-2 font-metropolis-bold text-5xl">
              {propertyName}
            </h1>
          </div>
          <div className="flex w-full flex-row">
            {propertyDescription && (
              <div className="hidden w-full flex-row  md:flex">
                <h3 className="mb-2 font-metropolis text-base">
                  <span className=" font-metropolis">
                    {propertyDescription}
                  </span>
                </h3>
              </div>
            )}
          </div>
          <div className="flex w-full flex-row">
            <h3 className="mb-2 font-metropolis text-base">
              Plot Size:
              <span className="mx-3 font-metropolis-bold">{plotSize}</span>
            </h3>
          </div>
          <div className="flex w-full flex-row">
            <h3 className="mb-2 font-metropolis text-base">
              Plot No:
              <span className="mx-3 font-metropolis-bold">{plotNo}</span>
            </h3>
          </div>
          <div className="flex w-full flex-row">
            <h3 className="mb-2 font-metropolis text-base">
              Covered Area:{" "}
              <span className="font-metropolis-bold">{coveredArea}</span>
            </h3>
          </div>
          <div className="flex w-full flex-row">
            {propertyType && (
              <div className="hidden md:my-6 md:flex md:flex-row md:justify-center md:rounded-full md:bg-[#F5F5F5]">
                <h3 className="mb-2 flex items-center font-metropolis text-base">
                  <span className="inline-block max-w-max px-4 pt-2 font-metropolis text-nk-gray">
                    {propertyType}
                  </span>
                </h3>
              </div>
            )}
          </div>
          <div className="flex w-full flex-row">
            {locationIconComponent}
            <div className="mx-4 flex w-11/12 flex-col justify-center font-metropolis">
              {location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
