import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "../../utils/constants";
import { ValueGoals } from "../../utils/types/types";

interface CardProps {
  about: ValueGoals;
  className: string;
  spin: number;
}
const AboutCard2: FC<CardProps> = ({ about, spin }) => {
  const { title, list } = about;
  const cardImage = about?.card_image?.data?.attributes?.url;
  const cardIcon = about?.card_icon?.data?.attributes?.url;

  return (
    <div className="card lg:absolute w-full h-full mobileTrigger overflow-hidden ">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 px-4 about-card">
        <div className="relative images-about max-w-[24rem] w-full min-h-[30rem] sm:min-h-[42rem] mx-auto p-10">
          <Image
            src={`${BASE_URL}${cardImage || "/"}`}
            alt="Card Image 1"
            fill
            style={{ transform: `rotate(${spin}deg)` }}
          />
        </div>
        <div className="text-about flex flex-col font-metropolis text-xl text-center lg:text-left text-nk-dark-gray lg:w-[55%] my-auto">
          <div className="relative max-w-[6rem] w-full min-h-[5rem] my-1 mx-auto lg:mx-0">
            <Image src={`${BASE_URL}${cardIcon || "/"}`} alt="Card Icon" fill />
          </div>
          <h1 className="font-metropolis-bold text-[2.75rem] mt-3 mb-7">
            {title}
          </h1>
          <div>
            {list.map((item, index) => (
              <div
                key={index}
                className="flex font-metropolis text-base gap-4 mb-2.5 shrink-0 items-center"
              >
                <div className="relative w-full max-w-[3rem] h-[3rem] bg-white rounded-full shadow-xl flex justify-center items-center">
                  <Image
                    src={` ${BASE_URL}${
                      item?.icon.data?.attributes?.url || "/"
                    }`}
                    alt="Icon"
                    height={32}
                    width={32}
                  />
                </div>
                <p className="font-metropolis-light text-nk-dark-gray text-left text-base pr-10">
                  {item.title && (
                    <span className="font-metropolis-semibold text-[1.375rem]]">
                      {item.title + " : "}
                    </span>
                  )}
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard2;
