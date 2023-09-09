import React, { FC, ChangeEvent } from "react";
import useFilters from "../../../utils/useFilters";
import Image from "next/image";
import ArrowDown from "../../../public/assets/icons/arrow-down.svg";

type PropsType = {
  projectsList: { id: number; name: string }[];
};

const ProjectFilter: FC<PropsType> = ({ projectsList }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handleProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    filtersDispatch({
      type: "setSelectedProjectId",
      payload: +e.target.value,
    });
  };

  return (
    <div className="flex items-center relative">
      <select
        name="Project"
        className={`flex items-center h-[3.625rem] w-full rounded-lg border px-4 py-4 pr-14 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none focus:border-nk-gray focus:ring-nk-gray`}
        placeholder="Select Project"
        onChange={handleProjectChange}
      >
        <option value={undefined}>All Projects</option>
        {projectsList?.map((project, index) => (
          <option key={index} value={project?.id}>
            {project?.name}
          </option>
        ))}
      </select>

      <div className="absolute right-1 pr-4 bg-white pointer-events-none top-1/2 flex -translate-y-1/2">
        <Image src={ArrowDown} width={20} height={20} alt="dropdown" />
      </div>
    </div>
  );
};

export default ProjectFilter;
