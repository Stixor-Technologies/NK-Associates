import Image from "next/image";
import React from "react";

interface CardProps {
  text1: string;
  text2: string;
  imageSrc: string;
  altText: string;
}

const Card: React.FC<CardProps> = ({ text1, text2, imageSrc, altText }) => {
  return (
    <div className="flex flex-col text-center items-center mr-[1rem] ml-[1rem]">
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={imageSrc}
          alt={altText}
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
  );
};
export default Card;
