import RangeSelectorSlider from "../../shared/range-selector-slider";
import useFilters from "../../../utils/useFilters";

const PriceRangeFilter = ({ priceRange }: { priceRange: [number, number] }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handlePriceRangeChange = (
    range: [number, number],
    thumbIndex: number,
  ) => {
    if (thumbIndex < 0) {
      filtersDispatch({
        type: "setBothSelectedPrice",
        payload: range,
      });
    } else if (thumbIndex === 1) {
      filtersDispatch({
        type: "setMaxSelectedPrice",
        payload: range[thumbIndex],
      });
    } else {
      filtersDispatch({
        type: "setMinSelectedPrice",
        payload: range[thumbIndex],
      });
    }
  };

  return (
    <>
      <RangeSelectorSlider
        min={priceRange[0]}
        max={priceRange[1]}
        thumbLabel="PKR"
        values={[filtersState.minSelectedPrice, filtersState.maxSelectedPrice]}
        onChange={handlePriceRangeChange}
      />
    </>
  );
};

export default PriceRangeFilter;
