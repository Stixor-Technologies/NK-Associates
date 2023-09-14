"use client";
import React, { FC } from "react";
import PropertyCard from "../properties/property-card";
import { Property } from "../../utils/types/types";
import LinkButton from "../button/link-button";

interface FeaturedPropertyProps {
  featuredProperties: Property[];
}

const FeaturedProperties: FC<FeaturedPropertyProps> = ({
  featuredProperties,
}) => {
  return (
    <>
      {featuredProperties?.length > 0 && (
        <div className="md:container py-10 md:py-16">
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold mb-7 md:mb-9 md:text-4xl xl:px-0">
            Featured Properties
          </h6>

          <div className="flex flex-col overflow-y-hidden">
            <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:px-0 xl:px-0">
              {featuredProperties?.map((property: Property, index: number) => (
                <PropertyCard key={index} property={property} actFeatured />
              ))}
            </div>

            <LinkButton
              text="Explore all"
              type="gradient"
              navigateTo="/properties"
              className="self-center w-64 h-11 text-lg mt-12 md:mx-0 md:w-[25rem] md:h-[3.125rem]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProperties;
