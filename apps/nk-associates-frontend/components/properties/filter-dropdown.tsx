import React, { FC } from "react";
import { SearchFilter } from "../../utils/types/types";

interface DropDownProps {
  filterName: string;
  filtersData: SearchFilter;
}

const FilterDropDown: FC<DropDownProps> = ({ filterName, filtersData }) => {
  const PropertyFilter = () => {
    return (
      <div className="absolute left-0 top-full w-auto z-10 bg-nk-white px-8 py-6">
        <ul className="flex gap-2">
          {filtersData?.type?.enum?.map((val) => (
            <li key={val}>
              {/* <input className=""  type="radio" id={val} name={val} />
              <label htmlFor={val}>{val}</label> */}
               <input id={val} type="radio" value="" name="default-radio" className="peer hidden" />
                <label htmlFor={val} className=" px-4 py-1.5 cursor-pointer  bg-nk-light-gray rounded-full justify-center items-center w-full font-medium text-nk-black peer-checked:bg-rose-500 peer-checked:text-white text-sm ">{val}</label>
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
