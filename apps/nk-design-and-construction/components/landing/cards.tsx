import Image from "next/image";
import React from "react";
import { text } from "stream/consumers";

interface props {
  src1: string;
  src2: string;
  src3: string;
  text1: string;
  text2: string;
}

const Cards: React.FC<props> = ({ src1, src2, src3, text1, text2 }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="flex flex-col text-center items-center mr-[1rem] ml-[1rem]">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={src1}
            alt="Rectange 9"
            className="transition-all duration-700 ease-in-out hover:scale-110"
          />
        </div>

        <span className="text-[1.5rem] md:text-[1.75rem] text-nk-red font-metropolis-semibold pt-[1.766rem] pb-[0.723rem]">
          {text1}
        </span>
        <span className="text-[1rem] md:text-[1.125rem] pb-[2.313rem]">
          {text2}
        </span>
      </div>
      <div className="flex flex-col text-center items-center mr-[1rem] ml-[1rem] ">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={src2}
            alt="Rectange 10"
            className="transition-all duration-700 ease-in-out hover:scale-110"
          />
        </div>
        <span className="text-[1.5rem] md:text-[1.75rem] text-nk-red font-metropolis-semibold pt-[1.766rem] pb-[0.723rem]">
          Find Home
        </span>
        <span className="text-[1rem] md:text-[1.125rem] pb-[2.313rem]">
          Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar
          iaculis. Id massa a aenean lacus orci sit vehicula.
        </span>
      </div>
      <div className="flex flex-col text-center items-center mr-[1rem] ml-[1rem]">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={src3}
            alt="Rectange 11"
            className="transition-all duration-700 ease-in-out hover:scale-110"
          />
        </div>

        <span className="text-[1.5rem] md:text-[1.75rem] text-nk-red font-metropolis-semibold pt-[1.766rem] pb-[0.723rem]">
          Find Home
        </span>
        <span className="text-[1rem] md:text-[1.125rem] pb-[2.313rem]">
          Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar
          iaculis. Id massa a aenean lacus orci sit vehicula.
        </span>
      </div>
    </div>
  );
};

export default Cards;
