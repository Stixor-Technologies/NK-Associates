import React from "react";
import Image from "next/image";
import LocationIcon from "../../app/assets/images/LocationIcon";

const ProjectCard = ({
  image = "/../../favicon.ico",
  propertyName = "Regent one",
  plotSize = "4.11 kanal",
  plotNo = 1,
  coveredArea = "11,000.46 Sq. ft",
  location = "Main Boulevard, Bahria Enclave, Islamabad",
  propertyDescription = "A beautiful plot located in a beautiful location just give us your god damn money",
}) => {
  return (
    <div className=" flex flex-col rounded-2xl bg-red-300 shadow-md md:flex-row-reverse md:rounded-3xl">
      <div className="relative h-80 w-full  bg-red-700 md:w-1/2">
        <Image
          src={image}
          alt="Card Image"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <div className=" mx-6 my-6 md:mt-0 md:w-1/2">
        <div className=" flex flex-col">
          <div className="flex w-full flex-row">
            <h1 className="mb-2 text-5xl font-bold">{propertyName}</h1>
          </div>
          <div className="flex w-full flex-row">
            <h3 className="mb-2 text-base font-normal">
              Plot Size: {plotSize}
            </h3>
          </div>
          <div className="flex w-full flex-row">
            <h3 className="mb-2 text-base font-normal">Plot No: {plotNo}</h3>
          </div>
          <div className="flex w-full flex-row">
            <h3 className="mb-2 text-base font-normal">
              Covered Area:{" "}
              <span className="bg-white font-bold">{coveredArea}</span>
            </h3>
          </div>
          <div className="flex w-full flex-row">
            <div className="flex w-1/12 flex-col items-center justify-center bg-red-50">
              <LocationIcon />
            </div>
            <div className="flex w-11/12 flex-col bg-red-200">
              {propertyDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
