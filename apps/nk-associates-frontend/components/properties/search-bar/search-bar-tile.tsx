import React, { useState, useEffect, useRef, useMemo } from "react";

import FilterDropDown from "./filter-dropdown";
import { SearchFilterProperties } from "../../../utils/types/types";
import useFilters from "../../../utils/useFilters";

type PropsType = {
  tile: { name: string };
  filtersProperties: SearchFilterProperties;
};

const SearchBarTile = ({ tile, filtersProperties }: PropsType) => {
  const searchFilterRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<boolean>(false);

  const [filtersState, filtersDispatch] = useFilters();
  const [scroll, setScroll] = useState(0);
  const [resize, setResize] = useState(0);

  const filterValue = useMemo(() => {
    if (tile.name === "Property Type") {
      const selectedType = filtersProperties.propertyTypesList.filter(
        (type) => +type.id === +filtersState.selectedCategoryId,
      );
      return selectedType && selectedType.length ? selectedType[0].name : "Any";
    } else if (tile.name === "Price Range") {
      return filtersState.minSelectedPrice || filtersState.maxSelectedPrice
        ? `${filtersState.minSelectedPrice}, ${filtersState.maxSelectedPrice}`
        : "Any";
    } else if (tile.name === "Project") {
      const selectedProject = filtersProperties.projectsList.filter(
        (type) => +type.id === +filtersState.selectedProjectId,
      );
      return selectedProject && selectedProject.length
        ? selectedProject[0].name
        : "Any";
    } else if (tile.name === "Purpose") {
      const selectedPurpose = filtersProperties.propertyPurposeList.filter(
        (type) => +type.id === +filtersState.selectedPurposeId,
      );
      return selectedPurpose && selectedPurpose.length
        ? selectedPurpose[0].name
        : "Any";
    }
    // else if (tile.name === "Location") {
    //   const selectedLocation = filtersProperties.propertyLocationList.filter(
    //     (type) => +type.id === +filtersState.location,
    //   );
    //   return selectedLocation && selectedLocation.length
    //     ? selectedLocation[0].name
    //     : "Any";
    // }
  }, [tile, filtersState]);

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

  const filterWidth = useMemo(() => {
    if (searchFilterRef.current) {
      const element = document.querySelector(
        `[data-filter-tile-title="${tile.name}"]`,
      );
      const containerPosition = element.getBoundingClientRect();
      const widthInRems = containerPosition.width / 16;
      return widthInRems / 1.5;
    }

    return 3;
  }, [resize]);

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

  const handleResize = (e) => {
    setResize(window.innerWidth);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
        <p
          data-filter-tile-title={tile.name}
          className="text-base lg:text-lg text-nk-gray"
        >
          {tile.name}
        </p>

        <div className="flex justify-between items-center">
          <p
            className="text-sm lg:text-base text-nk-black mr-2 truncate whitespace-nowrap"
            style={{ width: filterWidth + "rem" }}
            title={filterValue}
          >
            {filterValue}
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
          className="w-[22.5rem] fixed z-50"
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
