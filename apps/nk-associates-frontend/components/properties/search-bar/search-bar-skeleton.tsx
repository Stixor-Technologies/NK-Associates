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
          actHome
            ? "h-[4.5rem] lg:h-20 my-6 rounded-full"
            : "h-16 lg:h-[4.25rem] rounded-xl "
        }`}
      ></div>
      {!actHome && (
        <div className="flex flex-col gap-6 md:flex-row md:gap-0 md:items-center">
          <div
            className={`hidden md:block w-[7.408rem] mr-12 h-[2.25rem] rounded-full animate-pulse bg-nk-skeleton-grey ${
              !actListView && "absolute top-28 left-12 z-20"
            }`}
          ></div>
          <div className="block md:hidden"></div>
          <div
            className={`block md:hidden w-full h-[2.25rem] rounded-full animate-pulse bg-nk-skeleton-grey ${
              !actListView && "absolute top-28 left-12 z-20"
            }`}
          ></div>
        </div>
      )}
    </section>
  );
};

export default SearchBarSkeleton;
