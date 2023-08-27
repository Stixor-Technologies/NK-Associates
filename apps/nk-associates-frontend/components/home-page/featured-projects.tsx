"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Spinner from "../spinner";
import { Project } from "../../utils/types/types";
import { getFeaturedProjects } from "../../utils/api-calls";
import LinkButton from "../button/link-button";
import ProjectCardItem from "../projects/project-card/project-card-item";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cardsContainer = useRef<HTMLDivElement | null>(null);

  const fetchFeaturedProjects = async () => {
    setIsLoading(true);
    const resp = await getFeaturedProjects();
    if (resp?.data) {
      const projectsArray = Object.keys(resp?.data?.attributes)
        .filter((key) => !["createdAt", "updatedAt"]?.includes(key))
        .map((key) => resp?.data?.attributes[key]?.data)
        .filter((project) => project !== null);

      setFeaturedProjects(projectsArray);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  useLayoutEffect(() => {
    if (featuredProjects.length > 0) {
      const projectCards: HTMLDivElement[] =
        gsap.utils.toArray(".project-card");
      projectCards.forEach((box, index) => {
        if (index >= 1) {
          gsap.from(box, {
            y: 65,
            scrollTrigger: {
              trigger: box,
              start: "top 90%",
              end: "+=350",
              scrub: true,
            },
          });
        }
      });
    }
  }, [featuredProjects]);
  // 2000, 1130, 1340 1550
  return (
    <>
      {featuredProjects.length > 0 || isLoading ? (
        <div
          ref={cardsContainer}
          className="container py-10 lg:min-h-[96.875rem] h-full"
        >
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold mb-7 md:mb-9 md:text-4xl">
            Featured Projects
          </h6>

          {isLoading && featuredProjects.length === 0 ? (
            <div className="min-h-[50vh] flex flex-1">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-col gap-3 md:gap-6">
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
                className="self-center w-64 h-11 text-lg mt-12 md:mx-0 md:w-[25rem] md:h-[3.125rem]"
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default FeaturedProjects;
