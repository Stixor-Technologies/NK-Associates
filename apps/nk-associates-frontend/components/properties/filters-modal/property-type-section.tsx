import useFilters from "../../../utils/useFilters";

const PropertyTypeSection = ({
  propertyTypesList,
}: {
  propertyTypesList: any[];
}) => {
  const [filtersState, filtersDispatch] = useFilters();

  const selectedCategoryIndex = filtersState.selectedCategoryId
    ? propertyTypesList.findIndex(
        (category) => category.id === filtersState.selectedCategoryId,
      )
    : undefined;

  const selectedCategoryTypes = selectedCategoryIndex
    ? propertyTypesList[selectedCategoryIndex].types
    : propertyTypesList[0].types;

  const handleSelectedCategoryChange = (id: number) => {
    if (
      filtersState?.selectedCategoryId &&
      filtersState?.selectedTypeId &&
      filtersState?.selectedCategoryId !== id
    ) {
      filtersDispatch({
        type: "setSelectedTypeId",
        payload: undefined,
      });
    }
    filtersDispatch({
      type: "setSelectedCategoryId",
      payload: id,
    });
  };

  const handleSelectedTypeChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedTypeId",
      payload: id,
    });
  };

  return (
    <div className="w-full mb-8">
      <h3 className="text-lg font-metropolis-semibold mb-4">Property Type</h3>

      <div className="flex flex-col md:flex-row">
        <ul className="flex flex-col w-full md:max-w-[12rem] justify-center gap-2">
          {propertyTypesList.map((val, index) => (
            <li className="w-full flex items-center" key={index}>
              <input
                id={val.name}
                className="peer hidden"
                type="radio"
                name="categories-radio"
                value={val.id}
                checked={filtersState.selectedCategoryId === val.id}
                onChange={() => handleSelectedCategoryChange(val.id)}
              />
              <label
                htmlFor={val.name}
                className="w-full block p-4 cursor-pointer rounded-lg justify-center items-center text-center text-nk-black hover:text-nk-red bg-white peer-checked:bg-nk-red peer-checked:text-white transition-colors"
              >
                {val.name}
              </label>
              <hr className="hidden md:block mx-4 w-[1px] min-h-[2.5rem] bg-nk-gray" />
            </li>
          ))}
        </ul>

        <hr className="md:hidden mt-4 border-t border-nk-gray/70" />

        <ul className="flex flex-wrap gap-2 py-3.5">
          {selectedCategoryTypes.map((val, index) => (
            <li key={index}>
              <input
                id={val.name}
                className="peer hidden"
                type="radio"
                name="types-radio"
                value={val.id}
                checked={filtersState.selectedTypeId === val.id}
                onChange={() => handleSelectedTypeChange(val.id)}
              />
              <label
                htmlFor={val.name}
                className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red bg-white peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
              >
                {val.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyTypeSection;
