import React, {FC } from "react";
import PropertyCard from "./property-card";
import { Property } from "../../utils/types/types";

interface PropertyListProps {
  properties: Property[]
}

const PropertyList: FC<PropertyListProps> = ({properties}) => {
  return (    
      <div className="container mx-auto px-4 grid gap-x-7 gap-y-12 overflow-hidden py-6 pb-12 sm:grid-cols-2 md:pb-16 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
  );
};

export default PropertyList;
