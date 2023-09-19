import React from "react";
import ClientCard from "./client-card";

const ClientList = () => {
  return (
    <div className="flex justify-center flex-col mt-[3.438rem] lg:mt-[4.625rem]">
      <div className="container w-[80%] mx-auto text-center">
        <h1 className="font-metropolis-semibold text-nk-dark-gray text-[1.5rem] md:text-[2rem]">
          Discover What Our Valued Clients Say
        </h1>
        <p className="font-metropolis-light text-nk-dark-gray text-[1rem] md:text-[1.125rem] flex flex-col w-full md:w-[75%] mx-auto my-2">
          <span>
            Explore the experiences of others who have chosen us for their real
            estate needs!
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
