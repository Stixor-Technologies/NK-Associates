import React from "react";
import HomeCard from "./home-card";

const HomeList = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-nk-red font-metropolis-bold text-[2.5rem] py-[1rem] mt-[3.625rem]">
          How it works.
        </h1>
        <p className="text-nk-dark-gray text-[1.688rem] font-metropolis-light mb-[3.438rem]">
          This is how our products works
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:justify-between container">
        <HomeCard SetShadow={false} />
        <HomeCard SetShadow={true} />
        <HomeCard SetShadow={false} />
      </div>
    </div>
  );
};

export default HomeList;
