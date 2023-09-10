import React from "react";

const SearchBarSkeleton = ({
  actListView,
  actHome = false,
}: {
  actListView: boolean;
  actHome?: boolean;
}) => {
  return (
    <section
      className={`relative flex flex-col ${actListView && "my-4"} ${
        !actHome && "container"
      }`}
    >
      {/* Skeleton for small screen */}
      <div
        className={`md:hidden w-full flex justify-between items-center rounded-full px-5 py-2 animate-pulse bg-nk-skeleton-grey  ${
          actHome ? "h-11 " : "mb-6 h-[3.125rem]"
        }`}
      ></div>

      {/* skeleton for large screen */}
      <div
        className={`hidden md:block w-full shadow-3xl animate-pulse bg-nk-skeleton-grey ${
          actListView && "my-6"
        } ${
          actHome ? "h-20 my-6 rounded-full" : "h-16 lg:h-[4.25rem] rounded-xl "
        }`}
      ></div>
      {!actHome && (
        <div
          className={`hidden md:block ml-auto w-[7.408rem] h-[2.25rem] rounded-full animate-pulse bg-nk-skeleton-grey ${
            !actListView && "absolute top-28 -right-16 z-20"
          }`}
        ></div>
      )}
    </section>
  );
};

export default SearchBarSkeleton;
