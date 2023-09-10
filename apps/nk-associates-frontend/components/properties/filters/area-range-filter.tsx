import RangeSelectorSlider from "../../shared/range-selector-slider";
import useFilters from "../../../utils/useFilters";

const AreaRangeFilter = ({ areaRange }: { areaRange: [number, number] }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handleAreaRangeChange = (
    range: [number, number],
    thumbIndex: number,
  ) => {
    if (thumbIndex < 0) {
      filtersDispatch({
        type: "setBothSelectedArea",
        payload: range,
      });
    } else if (thumbIndex === 1) {
      filtersDispatch({
        type: "setMaxSelectedArea",
        payload: range[thumbIndex],
      });
      filtersDispatch({ type: "setFilterIsSelected", payload: true });
    } else {
      filtersDispatch({
        type: "setMinSelectedArea",
        payload: range[thumbIndex],
      });
      filtersDispatch({ type: "setFilterIsSelected", payload: true });
    }
  };

  return (
    <>
      <RangeSelectorSlider
        min={areaRange[0]}
        max={areaRange[1]}
        thumbLabel={filtersState.selectedAreaUnit}
        values={[filtersState.minSelectedArea, filtersState.maxSelectedArea]}
        onChange={handleAreaRangeChange}
      />
    </>
  );
};

export default AreaRangeFilter;
