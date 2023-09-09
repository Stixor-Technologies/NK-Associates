import React, { FC } from "react";

interface ProjectSkeletonProps {
  actHome?: boolean;
}

const ProjectListSkeleton: FC<ProjectSkeletonProps> = ({ actHome }) => {
  const numberOfCards = 5;
  const cardHeight = actHome
    ? "h-[35rem] sm:h-[16.875rem] md:h-[20.625rem] lg:h-[29.5rem]"
    : "h-[35rem] sm:h-[21rem] md:h-[26rem] lg:h-[31.25rem]";
  return (
    <div>
      <div className="flex flex-col justify-center overflow-hidden">
        {Array.from({ length: numberOfCards }, (_, index) => (
          <div
            key={index}
            className={`project-card mb-[1.5rem] flex w-full flex-col overflow-hidden rounded-2xl shadow-md last-of-type:mb-4 md:mb-[3rem] md:rounded-3xl ${cardHeight} animate-pulse bg-nk-skeleton-grey`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListSkeleton;
