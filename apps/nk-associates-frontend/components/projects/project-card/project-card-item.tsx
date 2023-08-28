import React, { useMemo } from "react";
import { BASE_URL } from "../../../utils/constants";
import ProjectCard from "./project-card";
import { Project } from "../../../utils/types/types";

const ProjectCardItem = ({
  project,
  index,
  actHome,
}: {
  project: Project;
  index: number;
  actHome?: boolean;
}) => {
  const imagesList = useMemo(() => {
    if (
      project?.attributes?.pictures?.data &&
      project?.attributes?.pictures?.data?.length > -1
    ) {
      const list: string[] = project?.attributes?.pictures?.data?.map(
        (picture) => {
          return `${BASE_URL}${picture?.attributes?.url}`;
        },
      );
      return list;
    }
    return undefined;
  }, [project?.attributes?.pictures]);

  return (
    <ProjectCard
      id={project?.id}
      imagesList={imagesList}
      propertyName={project?.attributes?.title}
      plotSize={`${project?.attributes?.plotSize} ${project?.attributes?.plotSizeUnits}`}
      plotNo={project?.attributes?.plotNumber}
      coveredArea={`${project?.attributes?.coveredArea} ${project?.attributes?.coveredAreaUnits}`}
      location={`${project?.attributes?.address}, ${project?.attributes?.city}`}
      propertyDescription={project?.attributes?.description}
      propertyType={project?.attributes?.category}
      primaryColor={index % 2 == 0 ? true : false}
      actHome
    />
  );
};

export default ProjectCardItem;
