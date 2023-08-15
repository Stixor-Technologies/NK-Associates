import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import FilterDropDown from "./filter-dropdown";
import { fetchPropertyTypesEnum } from "../../utils/api-calls";
import { SearchFilter } from "../../utils/types/types";
import ArrowDown from "../../public/assets/icons/arrow-down.svg";
import SearchIcon from "../../public/assets/icons/search-icon-white.svg";

const SearchBar = () => {
  const [filtersData, setFiltersData] = useState(null);
  const [activeFilter, setActiveFilter] = useState<string>(null);
  const searchFilterRef = useRef<HTMLDivElement>(null);

  const searchTiles = [
    { name: "Property Type", value: "Any" },
    { name: "Price Range", value: "Any" },
    { name: "Project", value: "Any" },
    { name: "Location", value: "Any" },
    { name: "Purpose", value: "Any" },
  ];

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchFilterRef.current &&
      !searchFilterRef.current.contains(event.target as Node)
    ) {
      setActiveFilter(null);
    }
  };

  const fetchData = async () => {
    console.log("called");
    const resp: SearchFilter = await fetchPropertyTypesEnum();
    if (resp) {
      setFiltersData(resp);
    }
  };

  useEffect(() => {
    fetchData();

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="container relative my-8 flex px-4">
      <div className="flex flex-1 gap-1 shadow-3xl" ref={searchFilterRef}>
        {searchTiles.map((tile, index) => {
          return (
            <div key={index} className="relative flex-1">
              <button
                className={`h-full w-full bg-nk-white px-6 py-4 text-left ${
                  index === 0 && "rounded-l-xl"
                }`}
                onClick={() => {
                  if (activeFilter === tile?.name) {
                    return setActiveFilter(null);
                  }
                  setActiveFilter(tile?.name);
                }}
              >
                <span className=" text-lg text-nk-gray">{tile.name}</span>
                <div className="flex justify-between">
                  <span className="text-[1.375rem] text-nk-black">
                    {tile.value}
                  </span>
                  <Image
                    src={ArrowDown}
                    width={18}
                    height={9}
                    alt="arrow-down"
                  />
                </div>
              </button>
              {activeFilter === tile.name && (
                <FilterDropDown
                  filterName={activeFilter}
                  filtersData={filtersData}
                />
              )}
            </div>
          );
        })}
      </div>

      <button className="flex items-center justify-end rounded-r-xl bg-nk-red px-6">
        <Image src={SearchIcon} width={45} height={46} alt="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
