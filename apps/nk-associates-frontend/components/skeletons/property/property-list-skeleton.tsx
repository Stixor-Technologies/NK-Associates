import React from "react";
import PropertyCardSkeleton from "./property-card-skeleton";

const PropertyListSkeleton = () => {
  const numberOfCards = 12;
  return (
    <div>
      <div className="mx-auto container px-4 grid gap-x-7 gap-y-12 overflow-hidden py-6 pb-12 sm:grid-cols-2 md:pb-16 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: numberOfCards }, (_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default PropertyListSkeleton;
