import React, { FC } from "react";
import Image from "next/image";
import Cricles from "../../public/assets/icons/circles.svg";

interface CardProp {
  SetShadow: boolean;
}
const HomeCard: FC<CardProp> = (SetShadow) => {
  let shadow = "shadow-2xl";
  if (!SetShadow) {
    shadow = "";
  }
  return (
    <div
      className={`flex-col mx-auto bg-nk-white border border-nk-light-gray rounded-3xl  lg:w-[24.875rem] min-h-[20.563rem] p-[.8rem] ${shadow} `}
    >
      <Image src={Cricles} alt="circles" width={71} height={70} />
      <div className="text-left">
        <h1 className="text-[1.75rem] text-nk-red font-metropolis-bold py-[.5rem]">
          Find Home
        </h1>
        <p className="text-[1rem] text-nk-dark-gray font-metropolis-thin py-[.5rem]">
          Lorem ipsum dolor sit amet consectetur. Tincidunt elit proin in non.
          Vulputate vivamus feugiat vitae viverra. Molestie diam dignissim
          tortor morbi rhoncus massa amet. Porta at sit ac platea eget sed. Diam
          urna praesent eleifend vel consectetur faucibus aliquam purus.
        </p>
      </div>
    </div>
  );
};

export default HomeCard;
