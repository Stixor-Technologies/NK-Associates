import React, { useState, useEffect, useRef } from "react";

import FilterDropDown from "./filter-dropdown";

const SearchBarTile = ({
  tile,
  filtersData,
}: {
  tile: { name: string; value: string };
}) => {
  const searchFilterRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);
  const [filterPosition, setFilterPosition] = useState({ x: 0, y: 0 });

  const handleFilterOptionClick = () => {
    const containerPosition = searchFilterRef.current.getBoundingClientRect();
    setFilterPosition({
      x: containerPosition.left,
      y: containerPosition.top + 60,
    });
    setActiveFilter(!activeFilter);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchFilterRef.current &&
      !searchFilterRef.current.contains(event.target as Node)
    ) {
      setActiveFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={searchFilterRef}
      className="min-w-fit flex-1 flex-grow-[2] bg-white"
    >
      <button
        className="h-full w-full bg-nk-white px-4 py-2 text-left"
        onClick={handleFilterOptionClick}
      >
        <p className="text-base lg:text-xl text-nk-gray">{tile.name}</p>
        <div className="flex justify-between items-center">
          <p className="text-sm lg:text-lg text-nk-black mr-2">{tile.value}</p>

          <svg
            className="w-3 h-3"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.04639 1.0459L10.0697 10.0691L19.0929 1.0459"
              stroke="#697388"
              strokeWidth="2"
            />
          </svg>
        </div>
      </button>
      {activeFilter && (
        <div
          className="fixed"
          style={{
            left: filterPosition.x,
            top: filterPosition.y + 10,
          }}
        >
          <FilterDropDown filterName={tile.name} filtersData={filtersData} />
        </div>
      )}
    </div>
  );
};

export default SearchBarTile;
