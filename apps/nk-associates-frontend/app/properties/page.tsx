import React from "react";
import Properties from "../../components/properties/properties";

const PropertyPage = () => {
  return (
    <section className="flex flex-col bg-right-top bg-no-repeat md:bg-nk-bg">
      <div className="pt-6 flex flex-col md:pt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="py-3 font-metropolis-bold text-3xl text-nk-black md:py-6 md:text-5xl">
            Property
          </h2>
          <p className="py-2 font-metropolis-light text-sm text-nk-black md:text-xl">
            Unlock Your Perfect Property, Find, Buy, Rent with Ease
          </p>
        </div>
        <Properties />
      </div>
    </section>
  );
};

export default PropertyPage;
