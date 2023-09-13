import useFilters from "../../../utils/useFilters";

const ProjectFilter = ({ projectsList }) => {
  const [filtersState, filtersDispatch] = useFilters();

  const handleSelectedProjectChange = (id: number) => {
    filtersDispatch({
      type: "setSelectedProjectId",
      payload: [id],
    });
  };

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-2">
        {projectsList.map((project, index) => (
          <li key={index}>
            {/* <input
              id={project.name}
              className="peer hidden"
              type="checkbox"
              name="projects-radio"
              value={project.id}
              checked={filtersState.selectedProjectId === project.id}
              onChange={() => handleSelectedProjectChange(project.id)}
            />
            <label
              htmlFor={project.name}
              className="px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors"
            >
              {project.name}
            </label> */}

            {/* ${
                filtersState.selectedProjectId?.includes(project?.id)
                  ? "bg-nk-red text-white"
                  : "text-sm peer-checked:bg-nk-red peer-checked:text-white transition-colors"
              } */}
            <input
              id={project.name}
              className="peer hidden"
              type="checkbox"
              name="projects-checkbox"
              value={project.id}
              checked={filtersState?.selectedProjectId?.includes(project?.id)}
              onChange={() => handleSelectedProjectChange(project?.id)}
            />
            <label
              htmlFor={project?.name}
              className={`px-4 py-1.5 cursor-pointer bg-nk-light-gray rounded-full justify-center items-center w-full text-nk-black hover:text-nk-red peer-checked:bg-nk-red peer-checked:text-white text-sm transition-colors
            
              `}
            >
              {project?.name}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectFilter;
