"use client";
import React, { useState, useEffect, useMemo } from "react";
import Spinner from "../spinner";
import { Project } from "../../utils/types/types";
import { getFeaturedProjects } from "../../utils/api-calls";
import LinkButton from "../button/link-button";
import ProjectCardItem from "../projects/project-card/project-card-item";

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFeaturedProjects = async () => {
    setIsLoading(true);
    const resp = await getFeaturedProjects();
    if (resp?.data) {
      const projectsArray = Object.keys(resp?.data?.attributes)
        .filter((key) => !["createdAt", "updatedAt"]?.includes(key))
        .map((key) => resp?.data?.attributes[key]?.data);

      setFeaturedProjects(projectsArray);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  return (
    <>
      {featuredProjects.length > 0 || isLoading ? (
        <div className="xl:container py-10">
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold px-4 md:px-8 md:text-4xl xl:px-0">
            Featured Projects
          </h6>

          {isLoading && featuredProjects.length === 0 ? (
            <div className="min-h-[50vh] flex flex-1">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="property-carousel flex flex-col px-4 gap-3 py-9 md:gap-6 md:py-8 md:px-8 xl:px-0">
                {featuredProjects?.map((project: Project, index: number) => {
                  return (
                    <ProjectCardItem
                      key={index}
                      project={project}
                      index={index}
                      actHome
                    />
                  );
                })}
              </div>

              <LinkButton
                text="Explore all"
                type="gradient"
                navigateTo="/projects"
                className="self-center w-64 h-11 text-lg md:mx-0 md:w-[25rem] md:h-[3.125rem]"
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default FeaturedProjects;
