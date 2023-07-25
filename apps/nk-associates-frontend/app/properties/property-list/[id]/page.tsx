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
    <section>
      <div>
        <div>
          <h2>DHA-III Residential Plots</h2>

          <div>
            <div className="flex items-center gap-1">
              <Image src={Bath_Icon} width={13} height={13} alt="" />
              <span className="text-nk-grey font-metropolis-light text-sm md:text-[0.625rem]">
                7
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Image src={Bedroom_Icon} width={13} height={13} alt="" />
              <span className="text-nk-grey font-metropolis-light text-sm md:text-[0.625rem]">
                6
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Image src={Bath_Icon} width={13} height={13} alt="" />
              <span className="text-nk-grey font-metropolis-light text-sm md:text-[0.625rem]">
                4500 sq.ft
              </span>
            </div>
          </div>
         
         <LinkButton text="Inquires" type="solid" navigateTo="#" />

        </div>
      </div>
    </section>
  );
};

export default PropertyDetail;
