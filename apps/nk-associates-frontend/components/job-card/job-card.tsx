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
  const { id } = job;
  const { title, description, city, department } = job?.attributes;
  const departmentName = department?.data?.attributes?.name;
  return (
    <div className="bg-nk-light-gray mx-1 my-3 rounded-2xl p-3 lg:mx-3 lg:my-4 lg:flex lg:gap-4 lg:p-7 xl:gap-8">
      <div className="lg:w-11/12">
        <div className="font-metropolis flex gap-2 text-base">
          <h3 className="text-nk-red inline-block lg:text-2xl">
            {departmentName}
          </h3>
          <h3 className="text-nk-dark-gray inline-block text-base lg:text-2xl">
            ( {title} )
          </h3>
        </div>
        <p className="font-metropolis-extralight lg:font-metropolis my-2 text-xs lg:text-base">
          {description}
          {/* Testing to see changes here */}
        </p>
      </div>
      <div className="flex shrink-0 gap-2 lg:flex-col lg:justify-between">
        <div className="flex lg:order-2 lg:ml-auto lg:justify-end">
          <LinkButton
            text="view more"
            navigateTo={`careers/${id}`}
            type="inverted"
            className="border-nk-red text-nk-red h-10 w-32 border bg-transparent lg:w-40"
          />
        </div>
        <div className="flex items-center justify-center gap-0.5 lg:order-1 lg:justify-end">
          <Image src={LocationIcon} alt="location icon" />
          <p className="text-clip text-base lg:text-right lg:text-xl">{city}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
