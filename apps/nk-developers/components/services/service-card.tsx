import React, { FC } from "react";
import Image from "next/image";

interface CardProp {
  image: string;
}
const ServiceCard: FC<CardProp> = ({ image }) => {
  return (
    <div>
      <div className="h-[31.5rem] max-w-[24rem] lg:w-max-[15.875rem] mx-auto lg:mx-0">
        <div className="overflow-hidden rounded-2xl relative max-w-[24rem] lg:w-max-[15.875rem] h-[22.813rem]">
          <Image
            src={image}
            alt="Service Image"
            fill
            className="object-cover transition-all duration-700 ease-in-out
            hover:scale-110"
          />
        </div>
        <h2 className="text-nk-red tex-[1.5rem] font-metropolis-bold mt-[1.474rem]">
          Find Home
        </h2>
        <p className="text-nk-dark-gray font-metropolis-light text-[0.875rem]">
          Lorem ipsum dolor sit amet consectetur. Tincidunt elit proin in non.
          Vulputate vivamus feugiat vitae viverra. Molestie diam dignissim
          tortor morbi rhoncus massa amet.
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
