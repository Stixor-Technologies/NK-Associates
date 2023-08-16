import React from "react";
import PlaceHolderImage from "../../public/assets/images/placeholder.svg";
import ServiceLogo from "../../public/assets/images/serviceLogo.svg";
import Arrow from "../../public/assets/images/arrow.svg";
import Image from "next/image";
import Link from "next/link";

const serviceCard = () => {
  return (
    <div className="m-2 p-1 lg:px-3 border bg-gradient-to-b from-nk-off-white to-nk-background rounded-xl flex-col lg:flex-row justify-center lg:mx-auto lg:w-5/6 ">
      <div className="justify-center text-center text-nk-dark-gray py-2 lg:flex lg:gap-8">
        <div className="relative lg:w-1/2 xl:w-2/5 min-h-[400px]  rounded-xl items-center justify-center my-auto">
          <Image
            src={PlaceHolderImage}
            alt="service-card"
            fill
            className="w-full h-full p-2 mx-auto object-cover"
          />
        </div>
        <div className="lg:flex-col lg:text-left lg:w-1/2 xl:w-3/5 lg:my-auto">
          <h1 className="font-metropolis-bold text-2xl lg:text-3xl my-4">
            Title
          </h1>
          <p className="text-sm lg:text-xl font-metropolis-light">
            NK Design and Construction offer bespoke services for residential
            and commercial edifices within Pakistan. Our mastery in
            architecture, construction, and interior design results in
            spectacular outcomes and prioritizes client satisfaction. Entrust us
            with your dream residential or commercial project, and witness our
            unwavering dedication to excellence firsthand.
          </p>
          <div className="flex justify-center lg:justify-between ">
            <Image src={ServiceLogo} alt="service Logo" className="mt-5 mb-2" />
            <button className="mt-20 lg:block hidden">
              <Link href="">
                <Image src={Arrow} alt="arrow" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serviceCard;
