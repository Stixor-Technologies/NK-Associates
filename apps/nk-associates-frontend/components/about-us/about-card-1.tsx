import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "../../utils/constants";
import { VisionMission } from "../../utils/types/types";

interface CardProps {
  about: VisionMission;
  className: string;
  spin: number;
}
const AboutCard1: FC<CardProps> = ({ about, spin }) => {
  const { question, title, description } = about;
  const id = about?.id;
  const cardImage = about?.card_image?.data?.attributes?.url;
  const cardIcon = about?.card_icon?.data?.attributes?.url;

  return (
    <div className="card lg:absolute w-full h-full mobileTrigger overflow-hidden ">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 px-4 about-card">
        <div className="relative images-about max-w-[24rem] w-full min-h-[32rem] sm:min-h-[42rem] mx-auto">
          <Image
            src={`${BASE_URL}${cardImage || "/"}`}
            alt="Card Image 1"
            fill
            style={{ transform: `rotate(${spin}deg)` }}
          />
        </div>
        <div className="text-about flex flex-col font-metropolis text-xl text-center lg:text-left text-nk-dark-gray lg:w-[55%] my-auto">
          <div className="relative max-w-[6.25rem] w-full min-h-[5rem] my-1 mx-auto lg:mx-0">
            <Image src={`${BASE_URL}${cardIcon || "/"}`} alt="Card Icon" fill />
          </div>
          <h4 className="text-nk-red my-1">{question}</h4>
          <h1 className="font-metropolis-bold text-[2.75rem] mt-3 mb-8">
            {title}
          </h1>
          <p className="pr-10"> {description}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard1;
