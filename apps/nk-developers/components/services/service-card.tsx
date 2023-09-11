import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { text } from "stream/consumers";

interface CardProp {
  image: string;
  text1: string;
  text2: string;
}
const ServiceCard: FC<CardProp> = ({ image, text1, text2 }) => {
  return (
    <div>
      <div className="h-[31.5rem] max-w-[24rem] lg:w-max-[15.875rem] mx-auto lg:mx-0">
        <div className="overflow-hidden rounded-2xl relative max-w-[24rem] lg:w-max-[15.875rem] h-[22.813rem]">
          {/* eslint-disable */}
          <img
            src={image}
            alt="Service Image"
            className="object-cover transition-all duration-700 ease-in-out
            hover:scale-110"
          />
        </div>
        <h2 className="text-nk-red tex-[1.5rem] font-metropolis-bold mt-[1.474rem]">
          {text1}
        </h2>
        <p className="text-nk-dark-gray font-metropolis-light text-[0.875rem]">
          {text2}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
