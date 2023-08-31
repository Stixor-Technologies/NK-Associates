import useFilters from "../../../utils/useFilters";

const PurposeSection = ({
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
    selectedPurpose[0].name.toLowerCase() === "rent" ? (
      <>
        <h4 className="text-sm font-metropolis-semibold mb-2">
          Rent Frequency
        </h4>
        <ul className="w-full flex flex-wrap gap-2">
          {rentFrequencyList.map((rentFrequency, index) => (
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
                className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red bg-white peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
              >
                {rentFrequency.name}
              </label>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <>
        <h4 className="text-sm font-metropolis-semibold mb-2">
          Completion Status
        </h4>
        <ul className="w-full flex flex-wrap gap-2">
          {completionStatusList.map((completionStatus, index) => (
            <li key={index}>
              <input
                id={completionStatus.name}
                className="peer hidden"
                type="radio"
                name="completionStatus-radio"
                value={completionStatus.id}
                checked={
                  filtersState.selectedCompletionStatusId ===
                  completionStatus.id
                }
                onChange={() =>
                  handleSelectedCompletionStatusChange(completionStatus.id)
                }
              />
              <label
                htmlFor={completionStatus.name}
                className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red bg-white peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
              >
                {completionStatus.name}
              </label>
            </li>
          ))}
        </ul>
      </>
    );

  return (
    <div className="w-full mb-8">
      <h3 className="text-lg font-metropolis-semibold mb-4">Purpose</h3>

      <div className="flex flex-col md:flex-row">
        <ul className="flex flex-col w-full md:max-w-[12rem] justify-center gap-2 mb-4 md:mb-0">
          {propertyPurposeList.map((purpose, index) => (
            <li className="w-full flex items-center" key={index}>
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
                className="w-full block p-4 cursor-pointer rounded-lg justify-center items-center text-center text-nk-black hover:text-nk-red bg-white peer-checked:bg-nk-red peer-checked:text-white transition-colors"
              >
                {purpose.name}
              </label>
              <hr className="hidden md:block mx-4 w-[1px] min-h-[2.5rem] bg-nk-gray" />
            </li>
          ))}
        </ul>

        <hr className="md:hidden mb-4 border-t-[1px] border-nk-gray/70" />

        <div className="w-full flex flex-col">{subOptionsContent}</div>
      </div>
    </div>
  );
};

export default PurposeSection;
