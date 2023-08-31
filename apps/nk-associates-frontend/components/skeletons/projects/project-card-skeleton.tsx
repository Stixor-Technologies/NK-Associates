import React from "react";

interface CardProps {
  primaryColor?: boolean;
  actHome?: boolean;
}

const ProjectCardSkeleton: React.FC<CardProps> = ({ actHome }) => {
  const cardHeight = actHome
    ? "h-[35rem] sm:h-[16.875rem] md:h-[20.625rem] lg:h-[25rem]"
    : "h-[35rem] sm:h-[21rem] md:h-[26rem] lg:h-[31.25rem]";

  return (
    <div
      className={`project-card mb-[2.3rem] flex w-full flex-col overflow-hidden rounded-2xl shadow-md last-of-type:mb-4  md:mb-[4.5rem] md:rounded-3xl ${cardHeight} animate-pulse bg-nk-skeleton-grey`}
    ></div>
  );
};

export default ProjectCardSkeleton;
