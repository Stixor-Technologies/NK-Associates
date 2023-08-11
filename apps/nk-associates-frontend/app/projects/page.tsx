"use client";
import { useEffect, useState, useMemo, useLayoutEffect, useRef } from "react";
import ProjectCard from "../../components/projects/project-card/project-card";
import { getProjects } from "../../utils/api-calls";
import LinkButton from "../../components/button/link-button";
import { Project } from "../../utils/types/types";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../../components/spinner";
import { gsap } from "gsap";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type OptionsType = "All" | "Residential" | "Commercial" | "Hotel";

gsap.registerPlugin(ScrollTrigger);

const optionsList = ["Residential", "Commercial", "Hotel", "All"];

const ProjectCardItem = ({
  project,
  index
}: {
  project: Project;
  index: number;
}) => {
  const imagesList = useMemo(() => {
    if (
      project.attributes.pictures.data &&
      project.attributes.pictures.data.length > -1
    ) {
      const list: string[] = project.attributes.pictures.data.map((picture) => {
        return `${BASE_URL}${picture.attributes.url}`;
      });
      return list;
    }
    return undefined;
  }, [project.attributes.pictures]);

  return (
    <ProjectCard
      id={project.id}
      imagesList={imagesList}
      propertyName={project.attributes.title}
      plotSize={`${project.attributes.plotSize} ${project.attributes.plotSizeUnits}`}
      plotNo={project.attributes.plotNumber}
      coveredArea={`${project.attributes.coveredArea} ${project.attributes.coveredAreaUnits}`}
      location={`${project.attributes.address}, ${project.attributes.city}`}
      propertyDescription={project.attributes.description}
      propertyType={project.attributes.category}
      primaryColor={index % 2 == 0 ? true : false}
    />
  );
};

export default function Projects() {
  const [selectedButton, setSelectedButton] = useState<OptionsType>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [buttonSwitched, setButtonSwitched] = useState<boolean>(false);
  const [projectsData, setProjectsData] = useState<Array<Project>>([]);
  const [total, setTotal] = useState<number | null>(null);

  const getProjectsData = async () => {
    try {
      setError(false);
      setLoading(true);
      let res: Response;
      if (selectedButton != "All") {
        res = await getProjects({
          category: selectedButton,
          start: projectsData.length
        });
      } else {
        res = await getProjects({ start: projectsData.length });
      }
      const resJson = await res.json();
      setProjectsData((prevProjects) => [...prevProjects, ...resJson.data]);
      setTotal(resJson.meta.pagination.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  useEffect(() => {
    //if a button is switched (1) empty the array, (2) get new projects data, and (3) set button switched to false.
    if (buttonSwitched) {
      setProjectsData([]);
      if (projectsData.length == 0 && buttonSwitched) {
        getProjectsData();
        setButtonSwitched(false);
      }
    }
  }, [buttonSwitched, projectsData]);

  const main = useRef();

  useLayoutEffect(() => {
    if (projectsData.length > -1) {
      const ctx = gsap.context((self) => {
        if (self && self.selector) {
          const boxes = self.selector(".project-card");
          boxes.forEach((box, index) => {
            if (index >= 1) {
              gsap.from(box, {
                y: 85,
                scrollTrigger: {
                  trigger: box,
                  start: "top bottom",
                  end: "+=350",
                  scrub: true
                }
              });
            }
          });
        }
      }, main.current); // <- Scope!
      return () => ctx.revert(); // <- Cleanup!
    }
  }, [projectsData]);

  return (
    <div className="bg-nk-white-dark md:bg-nk-bg md:bg-auto md:bg-right-top md:bg-no-repeat">
      <div className="md:py-18 relative py-10">
        <div className="container mb-7 text-center font-metropolis-bold text-3xl text-nk-black md:mb-10 md:text-5xl">
          NK Projects
        </div>

        <div className="container flex justify-center overflow-hidden p-0">
          <div className="scrollbar-hide flex flex-nowrap gap-x-2 overflow-x-auto px-4 py-6 sm:gap-x-2.5">
            {optionsList.map((label, index) => (
              <LinkButton
                key={index}
                text={label}
                type={selectedButton == label ? "gradient" : "transparent"}
                clickEvent={() => {
                  setSelectedButton(label as OptionsType);
                  setButtonSwitched(true);
                }}
                className=" h-8 w-[9.549rem] flex-none text-xs md:h-[3rem] md:w-[10.688rem] md:text-base lg:h-[3.2rem] lg:w-[13.688rem] lg:text-lg xl:h-[3.5rem] xl:w-[16.688rem] xl:text-xl"
              />
            ))}
          </div>
        </div>

        <div className="container my-20 flex flex-col items-center md:mt-16">
          {error && !loading ? (
            <div className="text-md mb-18 font-metropolis-bold text-nk-black">
              Error loading projects.
            </div>
          ) : projectsData.length == 0 && !loading ? (
            <div className="text-md mb-18 font-metropolis-bold text-nk-black">
              No projects found.
            </div>
          ) : (
            <div className="w-full overflow-hidden py-4">
              <InfiniteScroll
                dataLength={projectsData.length}
                next={getProjectsData}
                hasMore={total !== projectsData.length}
                loader={loading && <Spinner />}
              >
                <div
                  ref={main}
                  className="flex flex-col justify-center overflow-hidden"
                >
                  {projectsData.map((project, index) => (
                    <ProjectCardItem
                      key={index}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
