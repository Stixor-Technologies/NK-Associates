import React, { FC } from "react";
import useFilters from "../../../utils/useFilters";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

type FilterTabsProps = {
  topPicks: { id: number; name: string }[];
};

const FilterTabs: FC<FilterTabsProps> = ({ topPicks }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handleTopPickChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedTopPick",
      payload: id,
    });
  };

  return (
    <li className="list-none overflow-hidden flex gap-2">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        className="tabSwiper"
      >
        {topPicks?.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className={`!w-[9.549rem] ${index === 0 && "md:ml-12"}`}
            >
              <div key={index} className="flex">
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
                  htmlFor={item?.name}
                  className="w-[9.549rem] h-[2.25rem] text-center text-base cursor-pointer rounded-full flex justify-center items-center text-nk-gray border border-nk-red  peer-checked:bg-nk-red peer-checked:text-white transition-all duration-300 ease-in-out md:hover:bg-nk-red md:hover:text-white"
                >
                  {item?.name}
                </label>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </li>
  );
};

export default FilterTabs;
