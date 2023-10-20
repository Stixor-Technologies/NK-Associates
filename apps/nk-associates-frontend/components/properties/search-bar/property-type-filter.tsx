import useFilters from "../../../utils/useFilters";

const PropertyTypeFilter = ({
  propertyTypesList,
}: {
  propertyTypesList: any[];
}) => {
  const [filtersState, filtersDispatch] = useFilters();

  const selectedCategoryIndex = filtersState?.selectedCategoryId
    ? propertyTypesList?.findIndex(
        (category) => category.id === filtersState?.selectedCategoryId,
      )
    : undefined;

  const selectedCategoryTypes = selectedCategoryIndex
    ? propertyTypesList[selectedCategoryIndex]?.types
    : propertyTypesList[0]?.types;

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
    <>
      <ul className="flex flex-wrap justify-center gap-3">
        {propertyTypesList?.map((val, index) => (
          <li key={index}>
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
              className="px-4 py-2 text-lg cursor-pointer rounded-full justify-center items-center w-full text-nk-black border border-nk-red hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white transition-colors"
            >
              {val.name}
            </label>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <ul className="flex flex-wrap justify-center gap-2">
        {selectedCategoryTypes?.map((val, index) => (
          <li key={index}>
            <input
              id={val.name}
              className="peer hidden"
              type="radio"
              name="types-radio"
              value={val.id}
              checked={filtersState?.selectedTypeId === val.id}
              onChange={() => handleSelectedTypeChange(val.id)}
            />
            <label
              htmlFor={val.name}
              className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
            >
              {val.name}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PropertyTypeFilter;
