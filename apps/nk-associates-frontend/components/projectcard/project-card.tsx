import React from "react";
import Image from "next/image";
import LocationIcon from "../../public/assets/icons/area-marker.svg";
import LocationIconSecondary from "../../public/assets/images/LocationIconSecondary.svg";

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
  primaryColor = true,
}) => {
  const backgroundColor = primaryColor
    ? "bg-gradient-to-b bg-nk-gradient-red-one to-nk-gradient-red-two"
    : "bg-white";
  const textColor = primaryColor ? "text-white" : "text-black";
  const flexDirection = primaryColor ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div
      className={`m-5 flex flex-col rounded-2xl shadow-md ${flexDirection} md:rounded-3xl ${backgroundColor} ${textColor}`}
    >
      <div className="relative h-80 w-full rounded-2xl   md:flex md:h-auto md:w-1/2 lg:h-auto ">
        <Image
          src={image}
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
            <div className="mx-4 flex w-1/12 flex-col justify-center font-metropolis">
              <Image
                src={
                  primaryColor ? LocationIconSecondary.src : LocationIcon.src
                }
                width={30}
                height={30}
                alt=""
              />
            </div>
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
