import React, { FC } from "react";
import useFilters from "../../../utils/useFilters";
import Select from "react-select";
import customStyles from "../../../utils/select-lib-styles";

type PropsType = {
  projectsList: { id: number; label: string }[];
};

const ProjectFilter: FC<PropsType> = ({ projectsList }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const selectedProjects = projectsList.filter(
    (project) => filtersState?.selectedProjectId?.includes(project?.id),
  );

  const handleProjectChange = (selectOption, ACTIONTYPE) => {
    let id = null;
    if (ACTIONTYPE?.action === "select-option") {
      id = ACTIONTYPE?.option?.id;
    } else if (ACTIONTYPE?.action === "remove-value") {
      id = ACTIONTYPE?.removedValue?.id;
    }

    filtersDispatch({
      type: "setSelectedProjectId",
      payload: [id],
    });
  };

  return (
    <div className="w-full relative mb-4">
      <Select
        closeMenuOnSelect={false}
        defaultValue={selectedProjects}
        placeholder="Select Projects"
        onChange={handleProjectChange}
        isMulti
        options={projectsList}
        getOptionValue={(option) => `${option["id"]}`}
        styles={customStyles}
        isClearable={false}
      />
    </div>
  );
};

export default ProjectFilter;
