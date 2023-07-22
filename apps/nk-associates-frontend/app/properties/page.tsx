import React from "react";
import PropertyList from "../../components/button/properties/property-list";

const Properties = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <section className=" h-full bg-right-top bg-no-repeat md:bg-[url('/assets/images/bg-property.svg')]">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center">
          <h2 className="py-3 font-metropolis-bold text-3xl text-nk-black md:py-6 md:text-5xl">
            Property
          </h2>
          <p className="py-2 font-metropolis-light text-sm text-nk-black md:text-xl">
            Unlock Your Perfect Property, Find, Buy, Rent with Ease
          </p>
        </div>
        <PropertyList />
        {/* <div className="grid gap-x-7 gap-y-12 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
        {/* {arr.map((a) => (
            <PropertyCard key={a} />
          ))} */}
        {/* <PropertyList /> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default Properties;
