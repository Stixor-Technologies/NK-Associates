import React, { FC } from "react";
import Stars from "../../public/assets/icons/stars.svg";
import Image from "next/image";
import Person from "../../public/assets/icons/person.svg";

interface CardProp {
  center: boolean;
  text1: string;
  text2: string;
}

const ClientCard: FC<CardProp> = ({ center, text1, text2 }) => {
  let justify = "text-left justify-start";
  if (center) {
    justify = "text-center justify-center";
  }
  return (
    <div className="bg-nk-white flex-grow rounded font-metropolis text-nk-dark-gray text-[.875rem] border border-nk-light-gray min-w-[19.125rem] max-w-[20.625rem]">
      <div className="p-[1.875rem] flex flex-col">
        <div className="mb-[1.875rem]">
          <Image src={Stars} alt="stars rating" width={130} height={22} />
        </div>
        <div>{text1}</div>
        <div className="flex  mt-[1.25rem] items-center ">
          <div className="rounded-full mr-[1rem]">
            <Image src={Person} alt="person profile" width={50} height={50} />
          </div>
          <span className="text-nk-red">
            <p>{text2}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
