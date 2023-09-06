import React, { FC } from "react";
import Image from "next/image";
import { BASE_URL } from "../../utils/constants";
import { Values } from "../../utils/types/types";

interface CardProps {
  about: Values;
}
const ValuesCard: FC<CardProps> = ({ about }) => {
  const { title, list } = about || {};
  const cardImage = about?.card_image?.data?.attributes?.url;
  const cardIcon = about?.card_icon?.data?.attributes?.url;

  return (
    <div className="card lg:absolute w-full mb-12 lg:mb-0 overflow-hidden lg:overflow-visible">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 xl:gap-5 px-0 about-card">
        <div className="relative images-about max-w-[25rem]  w-full min-h-[32rem] lg:min-h-[37rem] mx-auto mb-8 lg:mb-0 translate-x-[200%] lg:translate-x-0 lg:translate-y-[250%]">
          <Image
            src={`${BASE_URL}${cardImage || "/"}`}
            alt="Card Image 1"
            fill
            className="object-cover rounded-2xl lg:-rotate-[8deg]"
          />
        </div>
        <div className="text-about flex flex-col font-metropolis text-xl text-center lg:text-left text-nk-dark-gray lg:w-[55%] my-auto lg:opacity-0">
          <div className="relative max-w-[6rem] w-full min-h-[5rem] my-1 mx-auto lg:mx-0">
            <Image src={`${BASE_URL}${cardIcon || "/"}`} alt="Card Icon" fill />
          </div>
          <h1 className="font-metropolis-bold text-[2.75rem] mt-3 mb-7">
            {title}
          </h1>
          <div>
            {list?.map((item, index) => (
              <div
                key={index}
                className="flex font-metropolis text-base gap-4 mb-2.5 items-center"
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
                <div className="font-metropolis-light text-nk-dark-gray text-left text-base lg:pr-10">
                  {item.description.includes(":") ? (
                    <p>
                      <span className="font-metropolis-semibold text-[1.375rem]]">
                        {item.description.split(":")[0].trim() + " : "}
                      </span>
                      {item.description.split(":")[1]}
                    </p>
                  ) : (
                    <p>
                      <span>{item.description}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesCard;
