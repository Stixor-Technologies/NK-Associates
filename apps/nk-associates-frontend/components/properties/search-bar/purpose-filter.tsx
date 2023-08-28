import useFilters from "../../../utils/useFilters";

const PurposeFilter = ({
  propertyPurposeList,
  rentFrequencyList,
  completionStatusList,
}) => {
  const [filtersState, filtersDispatch] = useFilters();

  const selectedPurpose = propertyPurposeList.filter(
    (purpose) => purpose.id === filtersState.selectedPurposeId,
  );

  const handleSelectedPurposeChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedPurposeId",
      payload: id,
    });
    filtersDispatch({
      type: "setSelectedCompletionStatusId",
      payload: undefined,
    });
    filtersDispatch({
      type: "setSelectedRentFrequencyId",
      payload: undefined,
    });
  };

  const handleSelectedCompletionStatusChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedCompletionStatusId",
      payload: id,
    });
  };

  const handleSelectedRentFrequencyChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedRentFrequencyId",
      payload: id,
    });
  };

  const subOptionsContent =
    selectedPurpose &&
    selectedPurpose.length &&
    selectedPurpose[0].name &&
    selectedPurpose[0].name.toLowerCase() === "rent"
      ? rentFrequencyList.map((rentFrequency, index) => (
          <li key={index}>
            <input
              id={rentFrequency.name}
              className="peer hidden"
              type="radio"
              name="rentFrequency-radio"
              value={rentFrequency.id}
              checked={
                filtersState.selectedRentFrequencyId === rentFrequency.id
              }
              onChange={() =>
                handleSelectedRentFrequencyChange(rentFrequency.id)
              }
            />
            <label
              htmlFor={rentFrequency.name}
              className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
            >
              {rentFrequency.name}
            </label>
          </li>
        ))
      : completionStatusList.map((completionStatus, index) => (
          <li key={index}>
            <input
              id={completionStatus.name}
              className="peer hidden"
              type="radio"
              name="completionStatus-radio"
              value={completionStatus.id}
              checked={
                filtersState.selectedCompletionStatusId === completionStatus.id
              }
              onChange={() =>
                handleSelectedCompletionStatusChange(completionStatus.id)
              }
            />
            <label
              htmlFor={completionStatus.name}
              className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
            >
              {completionStatus.name}
            </label>
          </li>
        ));

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-2">
        {propertyPurposeList.map((purpose, index) => (
          <li key={index}>
            <input
              id={purpose.name}
              className="peer hidden"
              type="radio"
              name="purpose-radio"
              value={purpose.id}
              checked={filtersState.selectedPurposeId === purpose.id}
              onChange={() => handleSelectedPurposeChange(purpose.id)}
            />
            <label
              htmlFor={purpose.name}
              className="px-4 py-2 text-lg cursor-pointer rounded-full justify-center items-center w-full text-nk-black border border-nk-red hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white transition-colors"
            >
              {purpose.name}
            </label>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <ul className="flex flex-wrap justify-center gap-2">
        {subOptionsContent}
      </ul>
    </>
  );
};

export default PurposeFilter;
