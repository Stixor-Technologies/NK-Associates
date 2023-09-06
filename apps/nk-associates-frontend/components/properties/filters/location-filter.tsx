import { useState } from "react";
import useFilters from "../../../utils/useFilters";

type PropsType = {
  locationsList: { id: number; name: string }[];
};

const LocationFilter = ({ locationsList }: PropsType) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handleLocationChange = (e) => {
    filtersDispatch({
      type: "setLocation",
      payload: +e.target.value,
    });
  };

  return (
    <div className="flex items-center relative">
      <select
        name="Location"
        className={`mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 pr-14 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none focus:border-nk-gray focus:ring-nk-gray`}
        placeholder="Select Location"
        value={filtersState.location}
        onChange={handleLocationChange}
      >
        <option value={undefined}>Select Location</option>
        {locationsList?.map((location, index) => (
          <option key={index} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>

      <div className="absolute right-1 pr-4 bg-white">
        <svg
          className="w-7 h-7"
          viewBox="0 0 18 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.82459 12.6779C7.99959 12.6779 7.20838 12.3502 6.62502 11.7668C6.04166 11.1835 5.71393 10.3923 5.71393 9.56727C5.71393 8.74227 6.04166 7.95106 6.62502 7.3677C7.20838 6.78434 7.99959 6.45661 8.82459 6.45661C9.64958 6.45661 10.4408 6.78434 11.0242 7.3677C11.6075 7.95106 11.9352 8.74227 11.9352 9.56727C11.9352 9.97577 11.8548 10.3803 11.6985 10.7577C11.5421 11.1351 11.313 11.478 11.0242 11.7668C10.7353 12.0557 10.3924 12.2848 10.015 12.4411C9.63758 12.5975 9.23308 12.6779 8.82459 12.6779ZM8.82459 0.857422C6.51459 0.857422 4.29921 1.77506 2.6658 3.40848C1.03239 5.04189 0.114746 7.25727 0.114746 9.56727C0.114746 16.0997 8.82459 25.7427 8.82459 25.7427C8.82459 25.7427 17.5344 16.0997 17.5344 9.56727C17.5344 7.25727 16.6168 5.04189 14.9834 3.40848C13.35 1.77506 11.1346 0.857422 8.82459 0.857422Z"
            fill="url(#paint0_linear_1903_1107)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1903_1107"
              x1="8.82459"
              y1="0.857422"
              x2="8.82459"
              y2="25.7427"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E4404A" />
              <stop offset="1" stop-color="#EB4B5E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default LocationFilter;
