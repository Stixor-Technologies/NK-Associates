import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "../../utils/constants";
import { About1 } from "../../utils/types/types";

interface CardProps {
  about: About1;
}
const AboutCard1: FC<CardProps> = ({ about }) => {
  const { question, title, description } = about?.attributes;
  const id = about?.id;
  const cardImage = about?.attributes?.card_image?.data?.attributes?.url;
  const cardIcon = about?.attributes?.card_icon?.data?.attributes?.url;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="relative max-w-[32rem] w-full min-h-[32rem] sm:min-h-[42rem] mx-auto">
          <Image
            src={`${BASE_URL}${cardImage || "/"}`}
            alt="Card Image 1"
            fill
            className="lg:p-3"
          />
        </div>
        <div className="flex flex-col font-metropolis text-xl text-center lg:text-left text-nk-dark-gray lg:w-1/2 my-auto mx-auto">
          <div className="relative max-w-[6.25rem] w-full min-h-[5rem] my-1 mx-auto lg:mx-0">
            <Image src={`${BASE_URL}${cardIcon || "/"}`} alt="Card Icon" fill />
          </div>
          <h4 className="text-nk-red my-1">{question}</h4>
          <h1 className="font-metropolis-bold text-[2.75rem] mt-3 mb-8">
            {title}
          </h1>
          <p className=""> {description}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard1;
