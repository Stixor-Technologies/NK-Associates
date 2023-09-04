import React from "react";
import ClientCard from "./client-card";

const ClientList = () => {
  return (
    <div className="flex justify-center flex-col mt-[3.438rem] lg:mt-[4.625rem]">
      <div className="container max-w-[607px] mx-auto text-center">
        <h1 className="font-metropolis-semibold text-nk-dark-gray text-[3rem]">
          What Clients Say
        </h1>
        <p className="font-metropolis-light text-nk-dark-gray text-[1.125rem] flex flex-col">
          <span>
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </span>
        </p>
      </div>
      <div className="lg:contianer">
        <div className="flex flex-col">
          <div className="carousel flex flex-nowrap overflow-x-scroll px-4 gap-4 py-8 pb-12 md:px-8 md:pb-16 md:gap-6 xl:px-0 lg:justify-center">
            <ClientCard
              center={false}
              text1="Slate helps you see how many more days you need to work to reach your
          financial goal."
              text2="Regina Miles"
            />
            <ClientCard
              center={false}
              text1="Slate helps you see how many more days you need to work to reach your
          financial goal."
              text2="Regina Miles"
            />
            <ClientCard
              center={false}
              text1="Slate helps you see how many more days you need to work to reach your
          financial goal."
              text2="Regina Miles"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
