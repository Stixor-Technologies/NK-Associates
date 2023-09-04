import React from "react";
import Cards from "./cards";

interface props {
  title1: string;
  title2: string;
  src1: string;
  src2: string;
  src3: string;
}

const ComponentTwo: React.FC<props> = ({
  title1,
  title2,
  src1,
  src2,
  src3,
}) => {
  return (
    <div>
      <div className="flex flex-col text-center">
        <div className=" text-nk-red text-[2rem] md:texts-[2.537rem] font-metropolis-bold mb-[0.589rem] md:mb-[1rem]">
          {title1}
        </div>
        <div className="text-[1rem] md:text-[1.688rem] text-nk-black mb-[2.313rem] md:mb-[3.571rem] font-metropolis-extralight">
          {title2}
        </div>
        <div>
          <Cards src1={src2} src2={src1} src3={src3} />
        </div>
      </div>
    </div>
  );
};
export default ComponentTwo;
