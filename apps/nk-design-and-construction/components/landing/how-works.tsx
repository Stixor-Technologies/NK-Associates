import React from "react";
import Cards from "./cards";

interface props {
  title1: string;
  title2: string;
  src1: string;
  src2: string;
  src3: string;
  card1: string;
  card2: string;
  card3: string;
}

const HowWorks: React.FC<props> = ({
  title1,
  title2,
  src1,
  src2,
  src3,
  card1,
  card2,
  card3,
}) => {
  return (
    <div>
      <div className="flex flex-col text-center">
        <div className=" text-nk-red text-[2rem] md:texts-[2.537rem] font-metropolis-bold mb-[0.589rem] md:mb-[1rem]">
          {title1}
        </div>
        <div className="text-[1.313rem] text-nk-black mb-[2.313rem] md:mb-[3.571rem] font-metropolis-extralight">
          {title2}
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <Cards
            src={src2}
            text1={card1}
            text2="Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar
          iaculis. Id massa a aenean lacus orci sit vehicula."
          />
          <Cards
            src={src1}
            text1={card2}
            text2="Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar
          iaculis. Id massa a aenean lacus orci sit vehicula."
          />
          <Cards
            src={src3}
            text1={card3}
            text2="Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar
          iaculis. Id massa a aenean lacus orci sit vehicula."
          />
        </div>
      </div>
    </div>
  );
};
export default HowWorks;
