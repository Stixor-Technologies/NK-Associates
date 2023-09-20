import React, { FC } from "react";
import useFilters from "../../../utils/useFilters";
import { id } from "date-fns/locale";

type FilterTabsProps = {
  topPicks: any;
};

const FilterTabs: FC<FilterTabsProps> = ({ topPicks }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handleTopPickChange = (id: number) => {
    // console.log("selected top pick", id);
    filtersDispatch({
      type: "setSelectedTopPick",
      payload: id,
    });
  };

  return (
    <div className="">
      <li className=" list-none container scrollbar-hide flex flex-nowrap gap-x-2 overflow-x-auto px-4 pt-6 sm:gap-x-2.5">
        {topPicks?.map((item, index) => {
          console.log("selected ID", filtersState.selectedTopPick);
          console.log("current ID", item?.id);
          console.log("check", filtersState.selectedTopPick === item?.id);
          return (
            <div key={index}>
              <input
                key={index}
                id={item?.name}
                className="peer hidden"
                type="radio"
                name={item?.name}
                value={item?.id}
                checked={filtersState.selectedTopPick === item?.id}
                onChange={() => handleTopPickChange(item?.id)}
              />
              <label
                htmlFor={item.name}
                className="h-8 w-[9.549rem] px-4 py-2 text-center text-lg cursor-pointer rounded-full flex justify-center items-center text-nk-black border border-nk-red  peer-checked:bg-nk-red peer-checked:text-white transition-all duration-300 ease-in-out md:hover:bg-nk-red md:hover:text-white md:w-[10.688rem] lg:w-[13.688rem] lg:text-lg xl:w-[16.688rem] md:h-[3rem] lg:h-[3.2rem] xl:h-[3.5rem]"
              >
                {item.name}
              </label>
            </div>
          );
        })}
      </li>
    </div>
  );
};

export default FilterTabs;
