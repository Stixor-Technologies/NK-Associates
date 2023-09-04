import React from "react";

const SearchBarSkeleton = () => {
  return (
    <div className="container">
      <div className="animate-pulse bg-gradient-to-r from-nk-skeleton-start to-nk-skeleton-stop w-full h-[6rem] rounded-xl shadow-3xl"></div>
    </div>
  );
};

export default SearchBarSkeleton;
