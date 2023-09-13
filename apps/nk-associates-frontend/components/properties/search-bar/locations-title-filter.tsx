import useFilters from "../../../utils/useFilters";

type PropsType = {
  locationsList: { id: number; label: string }[];
};

const LocationsTileFilter = ({ locationsList }: PropsType) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handleSelectedLocationChange = (id: number) => {
    filtersDispatch({
      type: "setLocation",
      payload: [id],
    });
  };

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-2">
        {locationsList?.map((location, index) => (
          <li key={index}>
            <input
              id={location?.label}
              className="peer hidden"
              type="checkbox"
              name="projects-checkbox"
              value={location?.id}
              checked={filtersState?.location?.includes(location?.id)}
              onChange={() => handleSelectedLocationChange(location?.id)}
            />
            <label
              htmlFor={location?.label}
              className={`px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors
            
              `}
            >
              {location?.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LocationsTileFilter;
