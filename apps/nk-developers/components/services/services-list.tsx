import React from "react";
import ServiceCard from "./service-card";

const ServicesList = () => {
  return (
    <div className="bg-nk-light-pink w-full ">
      <div className="justify-center pb-[5.625rem] mt-[4.375rem] lg:mt-[6.313rem] container">
        <div className="max-w-[65.25rem] flex flex-col items-center justify-center mx-auto">
          <h1 className="text-nk-red font-metropolis-bold text-[3rem] pt-[6.625rem] pb-[2.438rem] text-center">
            Our Services
          </h1>
          <span className="font-metropolis-light text-[2rem] text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam,
            dapibus mattis vel feugiat erat tortor eleifend.
          </span>
        </div>
        <div className="flex flex-col lg:flex-row gap-[3.125rem] justify-center mt-[2.5rem] mx-auto lg:mx-0">
          <ServiceCard
            image="/assets/images/image.svg"
            text1="Find Home"
            text2="Lorem ipsum dolor sit amet consectetur. Tincidunt elit proin in non.
          Vulputate vivamus feugiat vitae viverra. Molestie diam dignissim
          tortor morbi rhoncus massa amet."
          />
          <ServiceCard
            image="/assets/images/image1.svg"
            text1="Find Home"
            text2="Lorem ipsum dolor sit amet consectetur. Tincidunt elit proin in non.
          Vulputate vivamus feugiat vitae viverra. Molestie diam dignissim
          tortor morbi rhoncus massa amet."
          />
          <ServiceCard
            image="/assets/images/image2.svg"
            text1="Find Home"
            text2="Lorem ipsum dolor sit amet consectetur. Tincidunt elit proin in non.
          Vulputate vivamus feugiat vitae viverra. Molestie diam dignissim
          tortor morbi rhoncus massa amet."
          />
          <ServiceCard
            image="/assets/images/image3.svg"
            text1="Find Home"
            text2="Lorem ipsum dolor sit amet consectetur. Tincidunt elit proin in non.
          Vulputate vivamus feugiat vitae viverra. Molestie diam dignissim
          tortor morbi rhoncus massa amet."
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
