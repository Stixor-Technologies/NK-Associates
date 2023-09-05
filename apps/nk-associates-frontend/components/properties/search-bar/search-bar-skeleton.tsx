import React from "react";

const SearchBarSkeleton = () => {
  return (
    <section className="container relative my-4 flex flex-col">
      <div className="md:hidden w-full flex justify-between items-center rounded-full px-5 py-2 mb-6 animate-pulse bg-gradient-to-r from-nk-skeleton-start to-nk-skeleton-stop h-[3.125rem]"></div>

      <div className="hidden md:block my-6 rounded-xl w-full shadow-3xl animate-pulse bg-gradient-to-r from-nk-skeleton-start to-nk-skeleton-stop h-16 lg:h-[4.25rem]"></div>

      <div className="hidden md:block ml-auto w-[7.408rem] h-[2.25rem] rounded-full animate-pulse bg-gradient-to-r from-nk-skeleton-start to-nk-skeleton-stop"></div>
    </section>
  );
};

export default SearchBarSkeleton;
