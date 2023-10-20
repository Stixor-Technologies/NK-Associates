import useFilters from "../../../utils/useFilters";
import PillRadio from "../../shared/pill-radio";

const BedRoomsFilter = () => {
  const [filtersState, filtersDispatch] = useFilters();
  const numberOfRoomsFilter = [...new Array(8)];

  const handleSetSelectedOption = (val) => {
    filtersDispatch({
      type: "setSelectedRoomsLimit",
      payload: val === "Any" ? undefined : val,
    });
  };

  return (
    <div className="mb-4">
      <h4 className="mb-2">Bedrooms</h4>

      <div className="flex flex-wrap text-nk-black text-sm">
        <PillRadio
          label="Any"
          name="bedrooms-radio"
          checked={!filtersState.selectedRoomsLimit}
          onChange={() => handleSetSelectedOption("Any")}
        />

        {numberOfRoomsFilter.map((num, index) => (
          <PillRadio
            key={index}
            label={`${index + 1}${
              index + 1 >= numberOfRoomsFilter.length ? "+" : ""
            }`}
            name="bedrooms-radio"
            checked={filtersState.selectedRoomsLimit === index + 1}
            onChange={() => handleSetSelectedOption(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

const BathRoomsFilter = () => {
  const [filtersState, filtersDispatch] = useFilters();
  const numberOfRoomsFilter = [...new Array(8)];

  const handleSetSelectedOption = (val) => {
    filtersDispatch({
      type: "setSelectedBathRoomsLimit",
      payload: val === "Any" ? undefined : val,
    });
  };

  return (
    <div className="mb-4">
      <h4 className="mb-2">Bathrooms</h4>

      <div className="flex flex-wrap text-nk-black text-sm">
        <PillRadio
          id="Any-Bathroom"
          label="Any"
          name="bathrooms-radio"
          checked={!filtersState.selectedBathRoomsLimit}
          onChange={() => handleSetSelectedOption("Any")}
        />
        {numberOfRoomsFilter.map((num, index) => (
          <PillRadio
            key={index}
            id={`${index + 1}-Bathroom`}
            label={`${index + 1}${
              index + 1 >= numberOfRoomsFilter.length ? "+" : ""
            }`}
            name="bathrooms-radio"
            checked={filtersState.selectedBathRoomsLimit === index + 1}
            onChange={() => handleSetSelectedOption(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

const RoomBedsSection = () => {
  return (
    <div className="w-full mb-4">
      <h3 className="text-lg font-metropolis-semibold mb-4">Rooms and Beds</h3>

      <BedRoomsFilter />
      <BathRoomsFilter />
    </div>
  );
};

export default RoomBedsSection;
