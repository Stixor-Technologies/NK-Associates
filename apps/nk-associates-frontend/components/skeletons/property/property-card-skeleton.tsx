import React from "react";

const PropertySkeleton = () => {
  return (
    <div className="property-card min-w-[17.288rem] bg-transparent overflow-hidden rounded-xl max-w-[37.5rem]">
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 flex-col md:items-center"
      >
        <div className="flex items-center justify-center w-full h-[17.5rem] bg-nk-light-gray rounded-xl"></div>
        <div>
          <div className="h-6 bg-nk-light-gray rounded-full w-full my-3"></div>
          <div className="h-4 bg-nk-light-gray rounded-full w-1/3 my-3.5"></div>
          <div className="h-4 bg-nk-light-gray rounded-full w-1/3 mb-3.5"></div>
          <div className="h-4 bg-nk-light-gray rounded-full w-1/3 mb-3.5"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default PropertySkeleton;
