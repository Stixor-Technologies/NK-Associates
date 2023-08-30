import React from "react";

interface CardProps {
  primaryColor?: boolean;
  actHome?: boolean;
}

const ProjectCardSkeleton: React.FC<CardProps> = ({
  actHome,
  primaryColor = true,
}) => {
  const cardHeight = actHome
    ? "h-[35rem] sm:h-[16.875rem] md:h-[20.625rem] lg:h-[25rem]"
    : "h-[35rem] sm:h-[21rem] md:h-[26rem] lg:h-[31.25rem]";

  const flexDirection = primaryColor ? "sm:flex-row-reverse" : "sm:flex-row";

  return (
    <div
      className={`project-card mb-[2.3rem] flex w-full flex-col overflow-hidden rounded-2xl shadow-md last-of-type:mb-4  md:mb-[4.5rem] ${flexDirection} md:rounded-3xl ${cardHeight} animate-pulse`}
    >
      <div className="h-full min-h-[21rem] w-full sm:h-auto sm:w-[65%] bg-nk-light-gray"></div>
      <div className="flex flex-col px-4 py-3.5 sm:w-[35%] md:p-6 bg-nk-gray">
        <div className="h-6 bg-nk-light-gray rounded-full w-1/2 mb-4"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-full mb-4"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-full mb-4"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-full mb-4"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-full mb-4"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-11/12 mb-4"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-1/2 mt-8"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-1/3 mt-4"></div>
        <div className="h-4 bg-nk-light-gray rounded-full w-1/2 mt-4"></div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
