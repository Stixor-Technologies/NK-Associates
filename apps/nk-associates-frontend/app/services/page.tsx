import React from "react";
import LinkButton from "../../components/button/link-button";
import ServicesList from "../../components/services/services-list";

const Services = () => {
  return (
    <section className="bg-right-top bg-no-repeat md:bg-nk-bg">
      <div className="container flex flex-col">
        <div className="flex flex-col items-center pt-6 md:pt-20">
          <h1 className="text-nk-black text-3xl font-metropolis-bold text-center md:text-5xl">
            Services
          </h1>
          <p className="text-center max-w-5xl text-nk-black font-metropolis-thin text-sm md:text-xl my-4 md:my-8">
            Experience our all-encompassing real estate services, customized to
            cater to your diverse needs with unrivaled professionalism and
            expertise.
          </p>
          <LinkButton
            type="gradient"
            text="contact us"
            navigateTo="contact"
            className="h-11 w-72 md:h-[3.125rem] md:my-5"
          />
        </div>
        <ServicesList />
      </div>
    </section>
  );
};

export default Services;
