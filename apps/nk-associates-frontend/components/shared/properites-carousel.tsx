import React, { FC } from "react";
import PropertyCard from "../properties/property-card";
import { Property } from "../../utils/types/types";

interface PropertyCarouselProps {
  properties: Property[];
}

const PropertyCarousel: FC<PropertyCarouselProps> = ({ properties }) => {
  return (
    <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 gap-4 py-8 pb-12 md:px-8 md:pb-16 md:gap-6 xl:px-0">
      {properties?.map((property: Property, index: number) => (
        <PropertyCard key={index} property={property} actSim={true} />
      ))}
    </div>
  );
};

export default PropertyCarousel;
