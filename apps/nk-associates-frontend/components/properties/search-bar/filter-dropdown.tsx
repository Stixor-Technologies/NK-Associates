import React, { FC } from "react";

import { SearchFilter } from "../../../utils/types/types";
import useFilters from "./useFilters";

interface DropDownProps {
  filterName: string;
  filtersData: SearchFilter;
}

const PropertyTypeFilter = ({ propertyTypes }: { propertyTypes: any[] }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const selectedCategoryIndex = propertyTypes.findIndex(
    (category) => category.id === filtersState.selectedCategoryId,
  );
  const selectedCategoryTypes = propertyTypes[selectedCategoryIndex].types;
  console.log({ filtersState });

  const handleSelectedCategoryChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedCategoryId",
      payload: id,
    });
  };

  const handleSelectedTypeChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedTypeId",
      payload: id,
    });
  };

  return (
    <div className="max-w-[22.5rem] bg-nk-white px-6 py-6 rounded-r-[1.25rem] rounded-bl-[1.25rem]">
      <ul className="flex flex-wrap justify-center gap-2">
        {propertyTypes.map((val, index) => (
          <li key={index}>
            <input
              id={val.name}
              className="peer hidden"
              type="radio"
              name="categories-radio"
              value={val.id}
              checked={filtersState.selectedCategoryId === val.id}
              onChange={() => handleSelectedCategoryChange(val.id)}
            />
            <label
              htmlFor={val.name}
              className="px-4 py-2 text-lg cursor-pointer rounded-full justify-center items-center w-full text-nk-black border border-nk-red hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white transition-colors"
            >
              {val.name}
            </label>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <ul className="flex flex-wrap justify-center gap-2">
        {selectedCategoryTypes.map((val, index) => (
          <li key={index}>
            <input
              id={val.name}
              className="peer hidden"
              type="radio"
              name="types-radio"
              value={val.id}
              checked={filtersState.selectedTypeId === val.id}
              onChange={() => handleSelectedTypeChange(val.id)}
            />
            <label
              htmlFor={val.name}
              className="px-4 py-1.5 cursor-pointer  bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-rose-500 peer-checked:text-white text-sm transition-colors"
            >
              {val.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PropertyFilter = () => null;

const FilterDropDown: FC<DropDownProps> = ({ filterName, filtersData }) => {
  console.log({ filtersData });
  switch (filterName) {
    case "Property Type":
      return <PropertyTypeFilter propertyTypes={filtersData.propertyTypes} />;
    case "Price Range":
      return <PropertyFilter />;
    case "Project":
      return <PropertyFilter />;
    case "Location":
      return <PropertyFilter />;
    case "Purpose":
      return <PropertyFilter />;
    // ... other filters
    default:
      return null;
  }
};

export default FilterDropDown;
