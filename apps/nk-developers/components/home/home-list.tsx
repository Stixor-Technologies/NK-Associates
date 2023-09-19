import React from "react";
import HomeCard from "./home-card";

const HomeList = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-nk-red font-metropolis-bold text-[2.5rem] py-4 mt-[3.625rem]">
          How it works.
        </h1>
        <p className="text-nk-dark-gray text-[1.313rem] font-metropolis-light mb-[3.438rem] px-24 lg:px-16">
          A dynamic and visionary department specialized in transformative real
          estate development. A redefined industry standard, driven by
          meticulous planning, visionary design, and unwavering operational
          excellence. By leading the market, we shape the future of real estate
          through innovative strategies, pushing boundaries to create
          extraordinary projects that inspire and leave a lasting impact.
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
