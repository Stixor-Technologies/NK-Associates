"use client";
import React, { FC } from "react";
import Image from "next/image";
import Bath_Icon from "../../../../public/assets/icons/bath-icon.svg";
import Bedroom_Icon from "../../../../public/assets/icons/bedrooms-icon.svg";
import LinkButton from "../../../../components/button/link-button";

interface PropertyDetailProps {
  params: {
    id: string;
  };
}

const PropertyDetail: FC<PropertyDetailProps> = ({ params: { id } }) => {
  console.log(id);
  return (
    <section className="container mx-auto h-screen">
      <div>
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex lg:gap-10 xl:gap-20">
            <h2 className="font-metropolis-semibold text-4xl">
              DHA-III Residential Plots
            </h2>

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Image src={Bath_Icon} width={27} height={27} alt="" />
                <span className="text-nk-grey font-metropolis-medium text-lg">
                  7
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Image src={Bedroom_Icon} width={27} height={27} alt="" />
                <span className="text-nk-grey font-metropolis-medium text-lg">
                  6
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Image src={Bath_Icon} width={27} height={27} alt="" />
                <span className="text-nk-grey font-metropolis-medium text-lg">
                  4500 sq.ft
                </span>
              </div>
            </div>
          </div>

          <LinkButton
            text="Inquires"
            type="solid"
            navigateTo="#"
            className="w-[11.75rem] md:w-[11.75rem] text-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyDetail;
