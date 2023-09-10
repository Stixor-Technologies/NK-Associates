import { useState } from "react";
import useFilters from "../../../utils/useFilters";

import AreaRangeFilter from "../filters/area-range-filter";
import AreaDropdown from "./area-dropdown";

type PropTypes = {
  areaRange: [number, number];
  areaUnitsList: { id: number; name: string }[];
};

const AreaSection = ({ areaRange, areaUnitsList }: PropTypes) => {
  const [filtersState, filtersDispatch] = useFilters();
  const disableInputs = filtersState?.selectedAreaUnit?.toLowerCase() === "all";
  const [errorMinArea, setErrorMinArea] = useState({
    error: false,
    message: "",
  });
  const [errorMaxArea, setErrorMaxArea] = useState({
    error: false,
    message: "",
  });

  const handleValidation = (type, value) => {
    if (typeof +value !== "number" || Number.isNaN(+value))
      return { message: "Only number values are allowed.", error: true };

    if (type === "min") {
      if (+value < areaRange[0]) {
        return {
          message: "Value can't be less than lower range limit.",
          error: true,
        };
      }

      if (+value > filtersState.maxSelectedArea) {
        return {
          message: "Value can't be more than max range.",
          error: true,
        };
      }
    }

    if (type === "max") {
      if (+value > areaRange[1]) {
        return {
          message: "Value can't be more than higher range limit.",
          error: true,
        };
      }

      if (+value < filtersState.minSelectedArea) {
        return {
          message: "Value can't be less than min range.",
          error: true,
        };
      }
    }

    return {
      message: "",
      error: false,
    };
  };

  const handleMinAreaChange = (e) => {
    const result = handleValidation("min", e.target.value);

    setErrorMinArea(result);
    if (result.error) {
      return;
    }

    filtersDispatch({
      type: "setMinSelectedArea",
      payload: e.target.value,
    });
  };

  const handleMaxAreaChange = (e) => {
    const result = handleValidation("max", e.target.value);

    setErrorMaxArea(result);
    if (result.error) {
      return;
    }

    filtersDispatch({
      type: "setMaxSelectedArea",
      payload: e.target.value,
    });
  };

  return (
    <>
      <div className="w-full mb-4">
        <h3 className="text-lg font-metropolis-semibold capitalize">
          Area ({filtersState.selectedAreaUnit})
          <AreaDropdown areaUnitsList={areaUnitsList} />
        </h3>
      </div>

      <AreaRangeFilter areaRange={areaRange} disableSlider={disableInputs} />

      <div className="w-full mb-4 md:w-1/2 md:pr-2.5">
        <label
          htmlFor="Min Area"
          className="font-metropolis-thin text-nk-black relative capitalize md:text-base"
        >
          Min Area
        </label>

        <input
          type="number"
          name="Min Area"
          className={`font-metropolis-light placeholder:font-metropolis-thin mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 placeholder:text-base focus:outline-none ${
            errorMinArea.error
              ? "border-nk-red"
              : " focus:border-nk-gray focus:ring-nk-gray"
          } ${
            disableInputs
              ? "text-gray-400 bg-gray-200"
              : "text-nk-gray shadow-md"
          }`}
          value={filtersState.minSelectedArea}
          onChange={handleMinAreaChange}
          placeholder="PKR 100000"
          disabled={disableInputs}
        />

        {errorMinArea.error && (
          <p className="text-nk-red mt-2 text-sm italic">
            {errorMinArea.message as string}
          </p>
        )}
      </div>

      <div className="w-full mb-4 md:w-1/2 md:pl-2.5">
        <label
          htmlFor="Max Area"
          className="font-metropolis-thin text-nk-black relative capitalize md:text-base"
        >
          Max Area
        </label>

        <input
          type="number"
          name="Max Area"
          className={`font-metropolis-light placeholder-nk-gray placeholder:font-metropolis-thin mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 placeholder:text-base focus:outline-none ${
            errorMaxArea.error
              ? "border-nk-red"
              : " focus:border-nk-gray focus:ring-nk-gray"
          } ${
            disableInputs
              ? "text-gray-400 bg-gray-200"
              : "text-nk-gray shadow-md"
          }`}
          value={filtersState.maxSelectedArea}
          onChange={handleMaxAreaChange}
          placeholder="PKR 10000000"
          disabled={disableInputs}
        />

        {errorMaxArea.error && (
          <p className="text-nk-red mt-2 text-sm italic">
            {errorMaxArea.message as string}
          </p>
        )}
      </div>
    </>
  );
};

export default AreaSection;
