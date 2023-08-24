import React, { useState, useEffect, useRef, useMemo } from "react";

import FilterDropDown from "./filter-dropdown";
import { SearchFilterProperties } from "../../../utils/types/types";
import useFilters from "../../../utils/useFilters";

type PropsType = {
  tile: { name: string; value: string };
  filtersProperties: SearchFilterProperties;
};

const SearchBarTile = ({ tile, filtersProperties }: PropsType) => {
  const searchFilterRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);

  const [filtersState, filtersDispatch] = useFilters();
  const [scroll, setScroll] = useState(0);

  const filterPosition = useMemo(() => {
    if (searchFilterRef.current) {
      const containerPosition = searchFilterRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      const tooCloseToTheEdge = windowWidth - containerPosition.left < 400;

      return {
        x: tooCloseToTheEdge
          ? containerPosition.right - 360
          : containerPosition.left,
        y:
          windowWidth > 1024
            ? containerPosition.top + containerPosition.height
            : containerPosition.top + 60,
        tooCloseToTheEdge,
      };
    }

    return {
      x: 0,
      y: 0,
      tooCloseToTheEdge: false,
    };
  }, [activeFilter, scroll]);

  const handleFilterOptionClick = () => {
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

  const handleScroll = (e) => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
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
        <p className="text-base lg:text-lg text-nk-gray">{tile.name}</p>

        <div className="flex justify-between items-center">
          <p className="text-sm lg:text-base text-nk-black mr-2">
            {tile.value}
          </p>

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
          className="w-[22.5rem] fixed z-10"
          style={{
            left: filterPosition.x,
            top: filterPosition.y + 10,
          }}
        >
          <FilterDropDown
            position={filterPosition.tooCloseToTheEdge ? "end" : "start"}
            filterName={tile.name}
            filtersProperties={filtersProperties}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBarTile;
