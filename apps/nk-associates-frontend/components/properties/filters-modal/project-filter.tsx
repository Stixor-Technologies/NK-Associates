import React, { FC, ChangeEvent } from "react";
import useFilters from "../../../utils/useFilters";
import Image from "next/image";
import ArrowDown from "../../../public/assets/icons/arrow-down.svg";
import Select, { components, DropdownIndicatorProps } from "react-select";

type PropsType = {
  projectsList: { id: number; label: string }[];
};

const ProjectFilter: FC<PropsType> = ({ projectsList }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "0px solid #D1D5DB",
      // This line disable the blue border
      boxShadow: "none",
      fontSize: "14px",
      padding: "10px 12px",
      zIndex: 3,
      //   color: "#6B7280",
    }),

    singleValue: (provided, state) => ({
      ...provided,
      // const opacity = state.isDisabled ? 0.5 : 1;
      // const transition = 'opacity 300ms';
      color: "#6B7280",

      // return { ...provided, opacity, transition };
    }),
  };

  const handleProjectChange = (selectOption, ACTIONTYPE) => {
    // filtersDispatch({
    //   type: "setSelectedProjectId",
    //   payload: +e.target.value,
    // });
  };

  return (
    <div className="w-full relative mb-4">
      <Select
        closeMenuOnSelect={false}
        // defaultValue={selectedLocations}
        placeholder="Select Projects"
        onChange={handleProjectChange}
        isMulti
        options={projectsList}
        getOptionValue={(option) => `${option["id"]}`}
        styles={customStyles}
        isClearable={false}
      />

      {/* <select
        name="Project"
        className={`flex items-center h-[3.625rem] w-full rounded-lg border px-4 py-4 pr-14 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none focus:border-nk-gray focus:ring-nk-gray`}
        placeholder="Select Project"
        onChange={handleProjectChange}
      >
        <option value={undefined}>Select Project</option>
        {projectsList?.map((project, index) => (
          <option key={index} value={project?.id}>
            {project?.name}
          </option>
        ))}
      </select> */}

      {/* <div className="absolute right-1 pr-4 bg-white pointer-events-none top-1/2 flex -translate-y-1/2">
        <Image src={ArrowDown} width={20} height={20} alt="dropdown" />
      </div> */}
    </div>
  );
};

export default ProjectFilter;
