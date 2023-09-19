import React from "react";
import ClientCard from "./client-card";

const ClientList = () => {
  return (
    <div className="flex justify-center flex-col">
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
              reviewDesc="Exceptional service from start to finish! The team at NK design and construction went above and beyond to help me find my dream home."
              reviewerName="Regina Miles"
            />
            <ClientCard
              center={false}
              reviewDesc="Their knowledge of the local market was impressive, and they made the entire buying process smooth and stress-free."
              reviewerName="Regina Miles"
            />
            <ClientCard
              center={false}
              reviewDesc="They guided me through every step and offered valuable insights. I highly recommend NK design and construction to anyone looking for top-notch real estate service."
              reviewerName="Regina Miles"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
