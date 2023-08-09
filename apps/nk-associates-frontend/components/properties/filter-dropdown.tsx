import React, {FC} from "react";


interface DropDownProps {
    filterName: string;
}

const FilterDropDown:FC<DropDownProps> = ({filterName}) => {
  const PropertyFilter = () => {
    return <div className="absolute left-0 -bottom-8">Select a Property Type...</div>;
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
