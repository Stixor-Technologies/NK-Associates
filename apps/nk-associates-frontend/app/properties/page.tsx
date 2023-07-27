import React from "react";
import Properties from "../../components/properties/properties";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col bg-right-top bg-no-repeat md:bg-nk-bg">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col md:py-16">
        <div className="text-center">
          <h2 className="py-3 font-metropolis-bold text-3xl text-nk-black md:py-6 md:text-5xl">
            Property
          </h2>
          <p className="py-2 font-metropolis-light text-sm text-nk-black md:text-xl">
            Unlock Your Perfect Property, Find, Buy, Rent with Ease
          </p>
        </div>
        <Properties/>
      </div>
    </section>
  );
};

export default Home;
