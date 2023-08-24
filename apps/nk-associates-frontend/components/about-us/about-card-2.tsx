import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "../../utils/constants";
import { ValueGoals } from "../../utils/types/types";

interface CardProps {
  about: ValueGoals;
}
const AboutCard2: FC<CardProps> = ({ about }) => {
  const { title, list } = about;
  const cardImage = about?.card_image?.data?.attributes?.url;
  const cardIcon = about?.card_icon?.data?.attributes?.url;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 px-4 pt-10">
        <div className="relative max-w-[32rem] w-full min-h-[32rem] sm:min-h-[42rem] mx-auto">
          <Image
            src={`${BASE_URL}${cardImage || "/"}`}
            alt="Card Image 1"
            fill
          />
        </div>
        <div className="flex flex-col font-metropolis text-xl text-center lg:text-left text-nk-dark-gray lg:w-1/2 my-auto">
          <div className="relative max-w-[6.25rem] w-full min-h-[5rem] my-1 mx-auto lg:mx-0">
            <Image src={`${BASE_URL}${cardIcon || "/"}`} alt="Card Icon" fill />
          </div>
          <h1 className="font-metropolis-bold text-[2.75rem] mt-3 mb-8">
            {title}
          </h1>
          <div>
            {list.map((item, index) => (
              <div
                key={index}
                className="flex font-metropolis text-base gap-4 mb-4 shrink-0 items-center"
              >
                <div className="relative w-full max-w-[3.75rem] h-[3.75rem] bg-white rounded-full shadow-xl flex justify-center items-center">
                  <Image
                    src={` ${BASE_URL}${
                      item?.icon.data?.attributes?.url || "/"
                    }`}
                    alt="Icon"
                    height={36}
                    width={36}
                  />
                </div>
                <p className="font-metropolis-light text-nk-dark-gray text-left text-base">
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
