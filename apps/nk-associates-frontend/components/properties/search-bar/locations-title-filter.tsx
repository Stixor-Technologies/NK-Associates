import useFilters from "../../../utils/useFilters";

type PropsType = {
  locationsList: { id: number; name: string }[];
};

const LocationsTileFilter = ({ locationsList }: PropsType) => {
  const [filtersState, filtersDispatch] = useFilters();
  console.log("lcoation", filtersState?.location);

  const handleSelectedLocationChange = (id: number) => {
    // filtersDispatch({
    //   type: "setLocation",
    //   payload: +id,
    // });
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
            {/* <input
              id={location.name}
              className="peer hidden"
              type="radio"
              name="locations-radio"
              value={location.id}
              checked={+filtersState.location === location.id}
              onChange={() => handleSelectedLocationChange(location.id)}
            />
            <label
              htmlFor={location.name}
              className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
            >
              {location.name}
            </label> */}
            <input
              id={location?.name}
              className="peer hidden"
              type="checkbox"
              name="projects-checkbox"
              value={location?.id}
              checked={filtersState?.location?.includes(location?.id)}
              onChange={() => handleSelectedLocationChange(location?.id)}
            />
            <label
              htmlFor={location?.name}
              className={`px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors
            
              `}
            >
              {location?.name}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LocationsTileFilter;
