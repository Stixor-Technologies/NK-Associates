import React, { FC } from "react";
import { SearchFilter } from "../../utils/types/types";

interface DropDownProps {
  filterName: string;
  filtersData: SearchFilter;
}

const FilterDropDown: FC<DropDownProps> = ({ filterName, filtersData }) => {
  const PropertyFilter = () => {
    return (
      <div className="absolute left-0 top-[calc(100%+0.5rem)] w-auto z-10 bg-nk-white px-6 py-6 rounded-r-[1.25rem] rounded-bl-[1.25rem]">
        <ul className="flex flex-wrap justify-center gap-2">
          {filtersData?.type?.enum?.map((val) => (
            <li key={val}>
              <input
                id={val}
                type="radio"
                value=""
                name="default-radio"
                className="peer hidden"
              />
              <label
                htmlFor={val}
                className=" px-4 py-1.5 cursor-pointer  bg-nk-light-gray rounded-full justify-center items-center w-full font-metropolis-thin text-nk-black peer-checked:bg-rose-500 peer-checked:text-white text-sm "
              >
                {val}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  switch (filterName) {
    case "Property Type":
      return <PropertyFilter />;
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
