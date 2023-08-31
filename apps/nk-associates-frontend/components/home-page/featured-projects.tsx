"use client";
import React, { FC, useRef, useEffect } from "react";
import { Project } from "../../utils/types/types";
import LinkButton from "../button/link-button";
import ProjectCardItem from "../projects/project-card/project-card-item";
import { gsap } from "gsap";

interface FeaturedProjectsProps {
  featuredProjects: Project[];
}

const FeaturedProjects: FC<FeaturedProjectsProps> = ({ featuredProjects }) => {
  const cardsContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (featuredProjects.length > 0) {
      const ctx = gsap.context((self) => {
        if (self && self.selector) {
          const boxes: HTMLDivElement[] = self.selector(".project-card");
          boxes.forEach((box, index) => {
            if (index >= 1) {
              gsap.from(box, {
                y: 85,
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
      }, cardsContainer.current); // <- Scope!
      return () => {
        ctx.revert();
      }; // <- Cleanup!
    }

    return () => {
      ScrollTrigger.getById("project-card-home")?.kill();
    };
  }, [featuredProjects]);
  return (
    <>
      {featuredProjects.length > 0 && (
        <div ref={cardsContainer} className="container py-10">
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold mb-7 md:mb-9 md:text-4xl">
            Featured Projects
          </h6>

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
        </div>
      )}
    </>
  );
};

export default FeaturedProjects;
