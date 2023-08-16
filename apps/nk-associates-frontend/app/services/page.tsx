import React from "react";
import LinkButton from "../../components/button/link-button";
import ServiceCard from "../../components/services/service-card";
const page = () => {
  return (
    <div className="flex flex-col container">
      <div className="flex flex-col justify-center items-center px-4">
        <h1 className="text-nk-dark-gray text-3xl md:text-5xl font-metropolis-bold my-10 text-center">
          Services
        </h1>
        <p className="text-center font-metropolis text-sm md:text-xl">
          Experience our all-encompassing real estate services, customized to
          cater to your diverse needs with unrivaled professionalism and
          expertise.
        </p>
        <LinkButton
          type="solid"
          text="contact us"
          navigateTo="contact"
          className="h-11 w-72 md:h-12 my-10"
        />
      </div>

      {/* cards go here */}

      <div className="p4">
        <ServiceCard />
      </div>
    </div>
  );
};

export default page;
