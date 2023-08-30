import React from "react";
import ProjectCardSkeleton from "./project-card-skeleton";
const ProjectListSkeleton = () => {
  const numberOfCards = 5;

  return (
    <div>
      <div className="flex flex-col justify-center overflow-hidden">
        {Array.from({ length: numberOfCards }, (_, index) => (
          <ProjectCardSkeleton
            key={index}
            primaryColor={index % 2 == 0 ? true : false}
            actHome
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectListSkeleton;
