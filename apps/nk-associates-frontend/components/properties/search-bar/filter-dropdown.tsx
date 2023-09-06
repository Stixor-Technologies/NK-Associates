import React, { FC } from "react";

import PropertyTypeFilter from "./property-type-filter";
import PriceRangeFilter from "../filters/price-range-filter";
import ProjectFilter from "./project-filter";
import LocationFilter from "../filters/location-filter";
import PurposeFilter from "./purpose-filter";

import { SearchFilterProperties } from "../../../utils/types/types";

interface DropDownProps {
  filterName: string;
  filtersProperties: SearchFilterProperties;
  position: "start" | "end";
}

const FilterDropDown: FC<DropDownProps> = ({
  filterName,
  filtersProperties,
  position,
}) => {
  const content = () => {
    switch (filterName) {
      case "Property Type":
        return (
          <PropertyTypeFilter
            propertyTypesList={filtersProperties.propertyTypesList}
          />
        );
      case "Price Range":
        return <PriceRangeFilter priceRange={filtersProperties.priceRange} />;
      case "Project":
        return <ProjectFilter projectsList={filtersProperties.projectsList} />;
      case "Location":
        return (
          <LocationFilter
            locationsList={filtersProperties.propertyLocationList}
          />
        );
      case "Purpose":
        return (
          <PurposeFilter
            propertyPurposeList={filtersProperties.propertyPurposeList}
            completionStatusList={filtersProperties.completionStatusList}
            rentFrequencyList={filtersProperties.rentFrequencyList}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full bg-nk-white px-6 py-6 shadow-lg max-h-[15.625rem] overflow-y-auto ${
        position === "start"
          ? "rounded-r-[1.25rem] rounded-bl-[1.25rem]"
          : "rounded-l-[1.25rem] rounded-br-[1.25rem]"
      }`}
    >
      {content()}
    </div>
  );
};

export default FilterDropDown;
