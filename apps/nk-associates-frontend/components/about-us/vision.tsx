import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "../../utils/constants";
import { Vision } from "../../utils/types/types";

interface CardProps {
  about: Vision;
}
const VisionCard: FC<CardProps> = ({ about }) => {
  const { question, title, description } = about || {};
  const cardImage = about?.card_image?.data?.attributes?.url;
  const cardIcon = about?.card_icon?.data?.attributes?.url;

  return (
    <div className="card h-full lg:absolute w-full mb-12 lg:mb-0 overflow-hidden lg:overflow-visible">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 xl:gap-5 px-0 about-card">
        <div className="relative images-about max-w-[28rem] w-full h-[38rem] lg:max-w-[25rem] lg:h-[34rem] 2xl:h-[38rem] 2xl:max-w-[28rem] mx-auto mb-8 lg:mb-0 translate-x-[200%] lg:translate-x-0 lg:translate-y-[250%]">
          <Image
            src={`${BASE_URL}${cardImage || "/"}`}
            alt="Card Image 1"
            fill
            className="object-cover rounded-2xl lg:rotate-[4deg]"
          />
        </div>
        <div className="text-about flex flex-col font-metropolis text-xl text-center lg:text-left text-nk-dark-gray lg:w-[55%] my-auto lg:opacity-0">
          <div className="relative max-w-[6.25rem] w-full min-h-[5rem] my-1 mx-auto lg:mx-0">
            <Image src={`${BASE_URL}${cardIcon || "/"}`} alt="Card Icon" fill />
          </div>
          <h4 className="text-nk-red my-1 text-[1.25rem] font-metropolis-bold">
            {question}
          </h4>
          <h1 className="font-metropolis-bold text-[2.75rem] mt-3 mb-8">
            {title}
          </h1>
          <p className="lg:pr-10"> {description}</p>
        </div>
      </div>
    </div>
  );
};

export default VisionCard;
