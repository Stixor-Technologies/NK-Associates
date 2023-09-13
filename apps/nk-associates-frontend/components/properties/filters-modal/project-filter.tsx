import React, { FC } from "react";
import useFilters from "../../../utils/useFilters";
import Select, { StylesConfig } from "react-select";

type PropsType = {
  projectsList: { id: number; label: string }[];
};

const ProjectFilter: FC<PropsType> = ({ projectsList }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const selectedProjects = projectsList.filter(
    (project) => filtersState?.selectedProjectId?.includes(project?.id),
  );

  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      border: "0px",
      boxShadow: "none",
      fontSize: "14px",
      padding: "10px 12px",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ":hover": {
        cursor: "pointer",
        color: "#E74451",
      },
    }),
  };

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
