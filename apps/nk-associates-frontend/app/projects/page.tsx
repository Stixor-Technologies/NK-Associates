"use client";
import { useEffect, useState } from "react";
import ProjectCard from "../../components/projectcard/project-card";
import { getProjects } from "../../utils/api-calls";
import LinkButton from "../../components/button/link-button";

interface Project {
  attributes: {
    Pictures: {
      data: Array<{ attributes: { url: string } }>;
    };
    Title: string;
    PlotSize: string;
    PlotSizeUnits: string;
    PlotNumber: string;
    CoveredArea: string;
    CoveredAreaUnits: string;
    Address: string;
    City: string;
    Description: string;
    Category: string;
  };
}

export default function Projects() {
  const [selectedButton, setSelectedButton] = useState<
    "All" | "Residential" | "Commercial" | "Hotel"
  >("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [projectsData, setProjectsData] = useState<Array<Project>>([]);
  const getProjectsData = async (
    category?: "Residential" | "Commercial" | "Hotel"
  ) => {
    try {
      setError(false);
      setLoading(true);
      let res: Response;
      if (category) {
        res = await getProjects({ category: category });
      } else {
        res = await getProjects();
      }
      const data = await res.json();
      setProjectsData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  return (
    <div
      className="relative min-h-screen bg-nk-white-dark pt-6 lg:bg-[url('/BackgroundImageTranslucent.png')] lg:bg-auto lg:bg-right-top lg:bg-no-repeat lg:pt-24"
      style={{ backgroundSize: "56rem 42rem" }}
    >
      <div className="mb-5 pt-6 text-center font-metropolis-bold text-3xl text-nk-black lg:mb-10 lg:pt-24 lg:text-5xl">
        NK Projects
      </div>

      <div className="flex justify-center overflow-hidden">
        <div className="flex flex-nowrap gap-x-2 overflow-x-auto sm:gap-x-3.5">
          <LinkButton
            text="Residential"
            type={selectedButton == "Residential" ? "gradient" : "transparent"}
            navigateTo="/projects"
            clickEvent={() => {
              setSelectedButton("Residential");
              getProjectsData("Residential");
            }}
            additionalStyles="flex-none mx-2 sm:mx-3.5 w-[9.549rem] md:w-[9.549rem] lg:w-[16.688rem] h-8 md:h-8 lg:h-[3.5rem] text-xs md:text-xs lg:text-xl"
          />
          <LinkButton
            text="Commercial"
            type={selectedButton == "Commercial" ? "gradient" : "transparent"}
            clickEvent={() => {
              setSelectedButton("Commercial");
              getProjectsData("Commercial");
            }}
            additionalStyles="flex-none mx-2 sm:mx-3.5 w-[9.549rem] md:w-[9.549rem] lg:w-[16.688rem] h-8 md:h-8 lg:h-[3.5rem] text-xs md:text-xs lg:text-xl"
          />
          <LinkButton
            text="Hotel"
            type={selectedButton == "Hotel" ? "gradient" : "transparent"}
            clickEvent={() => {
              setSelectedButton("Hotel");
              getProjectsData("Hotel");
            }}
            additionalStyles="flex-none mx-2 sm:mx-3.5 w-[9.549rem] md:w-[9.549rem] lg:w-[16.688rem] h-8 md:h-8 lg:h-[3.5rem] text-xs md:text-xs lg:text-xl"
          />
          <LinkButton
            text="All"
            type={selectedButton == "All" ? "gradient" : "transparent"}
            clickEvent={() => {
              setSelectedButton("All");
              getProjectsData();
            }}
            additionalStyles="flex-none mx-2 sm:mx-3.5 w-[9.549rem] md:w-[9.549rem] lg:w-[16.688rem] h-8 md:h-8 lg:h-[3.5rem] text-xs md:text-xs lg:text-xl"
          />
        </div>
      </div>
      <div className="mt-24 flex flex-col items-center lg:mt-16">
        {loading ? (
          <div className="font-metropolis-bold text-xl text-nk-black">
            Loading...
          </div>
        ) : error ? (
          <div className="font-metropolis-bold text-xl text-nk-black">
            Error
          </div>
        ) : projectsData.length == 0 ? (
          <div className="font-metropolis-bold text-xl text-nk-black">
            No Projects
          </div>
        ) : (
          projectsData.map((value, index) => (
            <div key={index} className="mx-auto w-full max-w-screen-lg">
              <ProjectCard
                image={`${process.env["NEXT_PUBLIC_BACKEND_URL"]}${value.attributes.Pictures.data[0].attributes.url}`}
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
          ))
        )}
      </div>
    </div>
  );
}
