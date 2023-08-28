import React from "react";

import ProjectDetailsVR from "../../../../components/project-details/project-details-vr";
import { getProjectDetail } from "../../../../utils/api-calls";
import { Project } from "../../../../utils/types/types";
import { BASE_URL } from "../../../../utils/constants";

type PropsTypes = {
  params: {
    id: string;
  };
};

const threeDModel = async ({ params: { id } }: PropsTypes) => {
  const { attributes: project }: Project = await getProjectDetail(id);

  const modelURL =
    project.threeDModel && project.threeDModel.data
      ? `${BASE_URL}${project?.threeDModel?.data?.attributes?.url}`
      : undefined;

  return <ProjectDetailsVR modelURL={modelURL} />;
};

export default threeDModel;
