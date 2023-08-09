// import {useState} from 'react';

import ProjectDetailsVR from "../_components/project-details-vr";
import ProjectIntroduction from "../_components/project-introduction";

import { Project } from "../../../utils/types/types";
import { getProjectDetail } from "../../../utils/api-calls";
import ProjectGallery from "../_components/project-gallery";
import { BASE_URL } from "../../../utils/constants";

type ProjectDetailProps = {
  params: {
    id: string;
  };
};

async function ProjectDetails({ params: { id } }: ProjectDetailProps) {
  const { attributes: project }: Project = await getProjectDetail(id);
  console.log("project detail", id, { project });

  const picturesArr = project.pictures.data.map((picture) => {
    return `${BASE_URL}${picture.attributes.url}`;
  })

  return (
    <>
      <ProjectDetailsVR />
      <ProjectIntroduction
        projectName={project.title}
        description={project.description}
        totalUnits={project.totalUnits}
        unitsSold={project.unitsSold}
        price={project.price}
        coveredArea={project.coveredArea}
        coveredAreaUnits={project.coveredAreaUnits}
        category={project.category}
        city={project.city}
        types={["Shops", "Flats"]}
      />
      <ProjectGallery pictures={picturesArr} />
    </>
  );
}

export default ProjectDetails;
