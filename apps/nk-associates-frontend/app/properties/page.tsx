import React from "react";
import PropertyList from "../../components/properties/property-list";

const Properties = () => {
  return (
    <section className="min-h-screen flex flex-col bg-right-top bg-no-repeat md:bg-[url('/assets/images/bg-property.svg')]">
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col md:py-24">
        <div className="text-center">
          <h2 className="py-3 font-metropolis-bold text-3xl text-nk-black md:py-6 md:text-5xl">
            Property
          </h2>
          <p className="py-2 font-metropolis-light text-sm text-nk-black md:text-xl">
            Unlock Your Perfect Property, Find, Buy, Rent with Ease
          </p>
        </div>
        <PropertyList />
      </div>
    </section>
  );
};

export default Properties;
