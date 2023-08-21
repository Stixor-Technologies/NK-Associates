import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectIntroduction from "../../../components/project-details/project-introduction";
import ProjectGallery from "../../../components/project-details/project-gallery";
import ProjectTimeline from "../../../components/project-details/project-timeline";
import ProjectComparison from "../../../components/project-details/project-comparison";
import ProjectOutcome from "../../../components/project-details/project-outcome";
import ProjectMap from "../../../components/project-details/project-map";
import { Project } from "../../../utils/types/types";
import { getProjectDetail } from "../../../utils/api-calls";
import { BASE_URL } from "../../../utils/constants";

type ProjectDetailProps = {
  params: {
    id: string;
  };
};

gsap.registerPlugin(ScrollTrigger);

async function ProjectDetails({ params: { id } }: ProjectDetailProps) {
  const { attributes: project }: Project = await getProjectDetail(id);

  const pdfUrl: string = project?.pdf?.data?.attributes?.url;

  const picturesArr = project?.pictures?.data?.map((picture) => {
    return `${BASE_URL}${picture?.attributes?.url}`;
  });

  return (
    <>
      <ProjectIntroduction
        projectName={project.title}
        description={project.description}
        totalUnits={project.totalUnits}
        unitsSold={project.unitsSold}
        price={project.price}
        coveredArea={project.coveredArea}
        coveredAreaUnits={project.coveredAreaUnits}
        category={project.category}
        city={project.city}
        types={project.types}
        numberOfBathRooms={project.numberOfBathRooms}
        numberOfRooms={project.numberOfRooms}
      />
      <ProjectGallery pictures={picturesArr} />
      <ProjectTimeline />
      <ProjectComparison projectId={+id} />
      <ProjectOutcome
        outcomeDescription={project.projectOutcomeDescription}
        outcomeImage={`${BASE_URL}${project.projectOutcomeImage.data.attributes.url}`}
      />
      <ProjectMap
        address={`${project.address}, ${project.city}`}
        coordinates={{ lat: project.latitude, lng: project.longitude }}
      />

      {pdfUrl && (
        <Link
          href={`${BASE_URL}${pdfUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative z-10 mx-auto mb-12 flex w-[13.75rem] items-center justify-center gap-4 rounded-full border bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two px-4 py-2.5 text-sm text-nk-white transition-all duration-100 hover:border-nk-red hover:shadow-lg md:w-[25rem] md:justify-center lg:text-lg"
        >
          Download Brochure
          <span className="block">
            <svg
              width="21"
              height="27"
              viewBox="0 0 21 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_179_3153)">
                <path
                  d="M10.1781 13.4955C9.91764 12.683 9.92285 11.1138 10.0739 11.1138C10.5114 11.1138 10.4697 12.9876 10.1781 13.4955ZM10.0895 15.8923C9.68848 16.9181 9.18848 18.0912 8.61035 19.0763C9.56348 18.7208 10.6416 18.2029 11.8864 17.9642C11.2249 17.4767 10.5895 16.7759 10.0895 15.8923ZM5.18848 22.2298C5.18848 22.2705 5.87598 21.9556 7.00618 20.1884C6.65723 20.5083 5.49056 21.4326 5.18848 22.2298ZM13.6208 8.61537H20.7041V25.2716C20.7041 25.947 20.1468 26.4904 19.4541 26.4904H1.9541C1.26139 26.4904 0.704102 25.947 0.704102 25.2716V1.70912C0.704102 1.03373 1.26139 0.490372 1.9541 0.490372H12.3708V7.39662C12.3708 8.06693 12.9333 8.61537 13.6208 8.61537ZM13.2041 17.3396C12.1624 16.7201 11.4697 15.8669 10.9801 14.6076C11.2145 13.6681 11.5843 12.2412 11.3031 11.3474C11.0583 9.85443 9.09473 10.0017 8.81348 11.0021C8.55306 11.9314 8.79264 13.2415 9.23535 14.9122C8.63119 16.3138 7.74056 18.1927 7.11035 19.2693C7.10514 19.2693 7.10514 19.2744 7.09994 19.2744C5.68848 19.9802 3.2666 21.5341 4.26139 22.7275C4.55306 23.0779 5.09473 23.2353 5.38119 23.2353C6.31348 23.2353 7.24056 22.3212 8.56348 20.097C9.90723 19.6654 11.3812 19.1271 12.6781 18.9189C13.8083 19.5181 15.1312 19.9091 16.0114 19.9091C17.5322 19.9091 17.6364 18.2841 17.0374 17.7052C16.3135 17.0146 14.2093 17.2126 13.2041 17.3396ZM20.3395 5.8224L15.2354 0.84584C15.001 0.617325 14.6833 0.490372 14.3499 0.490372H14.0374V6.99037H20.7041V6.68061C20.7041 6.36068 20.5739 6.05092 20.3395 5.8224ZM16.4801 18.7869C16.6937 18.6497 16.3499 18.1826 14.251 18.3298C16.1833 19.1322 16.4801 18.7869 16.4801 18.7869Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_179_3153">
                  <rect
                    width="20"
                    height="26"
                    fill="white"
                    transform="translate(0.704102 0.490372)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
        </Link>
      )}
    </>
  );
}

export default ProjectDetails;
