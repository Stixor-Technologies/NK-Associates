"use client";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/projectcard/project-card";
import { getProjects } from "../../utils/api-calls";
import LinkButton from "../../components/button/link-button";
import { Project } from "../../utils/types/types";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../../components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Projects() {
  const [selectedButton, setSelectedButton] = useState<
    "All" | "Residential" | "Commercial" | "Hotel"
  >("All");
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
          start: projectsData.length,
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

  return (
    <div className="relative min-h-screen bg-nk-white-dark pt-6 md:bg-nk-bg md:bg-auto md:bg-right-top md:bg-no-repeat md:pt-24">
      <div className="mb-5 pt-6 text-center font-metropolis-bold text-3xl text-nk-black md:mb-10 md:pt-24 md:text-5xl">
        NK Projects
      </div>

      <div className="flex justify-center overflow-hidden">
        <div className="scrollbar-hide flex flex-nowrap gap-x-2 overflow-x-auto sm:gap-x-3.5">
          <LinkButton
            text="Residential"
            type={selectedButton == "Residential" ? "gradient" : "transparent"}
            navigateTo="/projects"
            clickEvent={() => {
              setSelectedButton("Residential");
              setButtonSwitched(true);
            }}
            className="mx-2 h-8 w-[9.549rem] flex-none text-xs sm:mx-3.5 md:h-[3.5rem] md:w-[16.688rem] md:text-xl"
          />
          <LinkButton
            text="Commercial"
            type={selectedButton == "Commercial" ? "gradient" : "transparent"}
            clickEvent={() => {
              setSelectedButton("Commercial");
              setButtonSwitched(true);
            }}
            className="mx-2 h-8 w-[9.549rem] flex-none text-xs sm:mx-3.5 md:h-[3.5rem] md:w-[16.688rem] md:text-xl"
          />
          <LinkButton
            text="Hotel"
            type={selectedButton == "Hotel" ? "gradient" : "transparent"}
            clickEvent={() => {
              setSelectedButton("Hotel");
              setButtonSwitched(true);
            }}
            className="mx-2 h-8 w-[9.549rem] flex-none text-xs sm:mx-3.5 md:h-[3.5rem] md:w-[16.688rem] md:text-xl"
          />
          <LinkButton
            text="All"
            type={selectedButton == "All" ? "gradient" : "transparent"}
            clickEvent={() => {
              setSelectedButton("All");
              setButtonSwitched(true);
            }}
            className="mx-2 h-8 w-[9.549rem] flex-none text-xs sm:mx-3.5 md:h-[3.5rem] md:w-[16.688rem] md:text-xl"
          />
        </div>
      </div>
      <div className="mt-24 flex flex-col items-center md:mt-16">
        {error && !loading ? (
          <div className="font-metropolis-bold text-xl text-nk-black">
            Error
          </div>
        ) : projectsData.length == 0 && !loading ? (
          <div className="font-metropolis-bold text-xl text-nk-black">
            No Projects
          </div>
        ) : (
          <div className="mx-auto mb-11 w-full overflow-hidden md:mb-8">
            <InfiniteScroll
              dataLength={projectsData.length}
              next={getProjectsData}
              hasMore={total !== projectsData.length}
              loader={loading && <Spinner />}
            >
              {projectsData.map((value, index) => (
                <div key={index} className="flex justify-center">
                  <ProjectCard
                    image={`${BASE_URL}${value.attributes.Pictures.data[0].attributes.url}`}
                    propertyName={value.attributes.Title}
                    plotSize={`${value.attributes.PlotSize} ${value.attributes.PlotSizeUnits}`}
                    plotNo={value.attributes.PlotNumber}
                    coveredArea={`${value.attributes.CoveredArea} ${value.attributes.CoveredAreaUnits}`}
                    location={`${value.attributes.Address}, ${value.attributes.City}`}
                    propertyDescription={value.attributes.Description}
                    propertyType={value.attributes.Category}
                    primaryColor={index % 2 == 0 ? true : false}
                  />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
}
