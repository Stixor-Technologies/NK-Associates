"use client";
import React from "react";
import Image from "next/image";
import LinkButton from "../button/link-button";
import LocationIcon from "../../public/assets/images/location.svg";
import { Job } from "../../utils/types/types";

interface JobProp {
  job: Job;
}

const JobCard: React.FC<JobProp> = ({ job }) => {
  const { title, description, city, department } = job?.attributes;
  const { id } = job;
  const departmentName = department?.data.attributes.name;
  return (
    <div className="mx-4 my-3 rounded-2xl bg-nk-light-gray p-3 lg:m-4 lg:flex lg:flex-row lg:gap-8 lg:p-7">
      <div className="lg:w-11/12">
        <div className="flex flex-row gap-2 font-metropolis text-base">
          <h3 className="block:inline text-nk-red lg:text-xl">
            {departmentName}
          </h3>
          <h3 className="block:inline text-nk-dark-gray lg:text-xl">{title}</h3>
        </div>
        <p className="my-3 font-metropolis-extralight text-xs lg:font-metropolis lg:text-base">
          {description}
        </p>
      </div>
      <div className="flex shrink-0 flex-row gap-2 lg:flex-col lg:justify-between">
        <div className="flex hidden flex-row lg:order-2 lg:ml-auto lg:block lg:justify-end">
          <LinkButton
            text="view more"
            navigateTo={`careers/${id}`}
            type="transparent"
            className="h-10 w-40 border-2 border-nk-red text-nk-red"
          />
        </div>
        <div className="lg:hidden">
          <LinkButton
            text="apply now"
            navigateTo={`careers/${id}`}
            type="transparent"
            className="h-10 w-32 border-2 border-nk-red text-nk-red"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-0.5 lg:order-1 lg:justify-end">
          <Image src={LocationIcon} alt="location icon" />
          <p className="text-clip text-base lg:text-right lg:text-xl">{city}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
