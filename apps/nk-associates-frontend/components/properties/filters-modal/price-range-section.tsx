import { useState } from "react";
import PriceRangeFilter from "../filters/price-range-filter";
import useFilters from "../../../utils/useFilters";

type PropTypes = {
  priceRange: [number, number];
};

const PriceRangeSection = ({ priceRange }: PropTypes) => {
  const [filtersState, filtersDispatch] = useFilters();
  const [errorMinPrice, setErrorMinPrice] = useState({
    error: false,
    message: "",
  });
  const [errorMaxPrice, setErrorMaxPrice] = useState({
    error: false,
    message: "",
  });

  const handleValidation = (type, value) => {
    if (typeof +value !== "number" || Number.isNaN(+value))
      return { message: "Only number values are allowed.", error: true };

    if (type === "min") {
      if (+value < priceRange[0]) {
        return {
          message: "Value can't be less than lower range limit.",
          error: true,
        };
      }

      if (+value > filtersState.maxSelectedPrice) {
        return {
          message: "Value can't be more than max range.",
          error: true,
        };
      }
    }

    if (type === "max") {
      if (+value > priceRange[1]) {
        return {
          message: "Value can't be more than higher range limit.",
          error: true,
        };
      }

      if (+value < filtersState.minSelectedPrice) {
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

  const handleMinPriceChange = (e) => {
    const result = handleValidation("min", e.target.value);

    setErrorMinPrice(result);
    if (result.error) {
      return;
    }

    filtersDispatch({
      type: "setMinSelectedPrice",
      payload: e.target.value,
    });
    filtersDispatch({ type: "setFilterIsSelected", payload: true });
  };

  const handleMaxPriceChange = (e) => {
    const result = handleValidation("max", e.target.value);

    setErrorMaxPrice(result);
    if (result.error) {
      return;
    }

    filtersDispatch({
      type: "setMaxSelectedPrice",
      payload: e.target.value,
    });
    filtersDispatch({ type: "setFilterIsSelected", payload: true });
  };

  return (
    <>
      <div className="w-full mb-4">
        <h3 className="text-lg font-metropolis-semibold mb-4">Price range</h3>
        <PriceRangeFilter priceRange={priceRange} />
      </div>

      <div className="w-full mb-4 md:w-1/2 md:pr-2.5">
        <label
          htmlFor="Min Price"
          className="font-metropolis-thin text-nk-black relative capitalize md:text-base"
        >
          Min Price
        </label>

        <input
          type="number"
          name="Min Price"
          className={`font-metropolis-light text-nk-gray placeholder-nk-gray placeholder:font-metropolis-thin mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 shadow-md placeholder:text-base focus:outline-none ${
            errorMinPrice.error
              ? "border-nk-red"
              : " focus:border-nk-gray focus:ring-nk-gray"
          }`}
          value={filtersState.minSelectedPrice}
          onChange={handleMinPriceChange}
          placeholder="PKR 100000"
        />

        {errorMinPrice.error && (
          <p className="text-nk-red mt-2 text-sm italic">
            {errorMinPrice.message as string}
          </p>
        )}
      </div>

      <div className="w-full mb-4 md:w-1/2 md:pl-2.5">
        <label
          htmlFor="Max Price"
          className="font-metropolis-thin text-nk-black relative capitalize md:text-base"
        >
          Max Price
        </label>

        <input
          type="number"
          name="Max Price"
          className={`font-metropolis-light text-nk-gray placeholder-nk-gray placeholder:font-metropolis-thin mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 shadow-md placeholder:text-base focus:outline-none ${
            errorMaxPrice.error
              ? "border-nk-red"
              : " focus:border-nk-gray focus:ring-nk-gray"
          }`}
          value={filtersState.maxSelectedPrice}
          onChange={handleMaxPriceChange}
          placeholder="PKR 10000000"
        />

        {errorMaxPrice.error && (
          <p className="text-nk-red mt-2 text-sm italic">
            {errorMaxPrice.message as string}
          </p>
        )}
      </div>
    </>
  );
};

export default PriceRangeSection;
