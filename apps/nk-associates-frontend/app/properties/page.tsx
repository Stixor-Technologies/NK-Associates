import React from "react";
import PropertyCard from "../../components/button/properties/property-card";

const Properties = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <section className=" h-full bg-right-top bg-no-repeat bg-[#f5f5f5] md:bg-[url('/assets/images/bg-property.svg')]">
      <div className="container mx-auto px-4">
        <div className="mt-12 text-center md:mt-20">
          <h2 className="py-3 text-3xl text-nk-black md:text-5xl">Property</h2>
          <p className="py-2 text-sm text-nk-black md:text-xl">
            Unlock Your Perfect Property, Find, Buy, Rent with Ease
          </p>
        </div>
        <div className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {arr.map((a) => (
            <PropertyCard key={a} />
          ))}
        </div>
      </div>
      {/* <PropertyCard /> */}
    </section>
  );
};

export default Properties;
