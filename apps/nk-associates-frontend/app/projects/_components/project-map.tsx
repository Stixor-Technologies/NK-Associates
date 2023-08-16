"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";

import MapComponent from "../../../components/shared/map-component";

type PropTypes = {
  address: string;
  coordinates: {
    lng: number;
    lat: number;
  };
};

const ProjectMap = ({ address, coordinates }: PropTypes) => {
  useLayoutEffect(() => {
    gsap.to("[data-project-map] h2", {
      opacity: 1,
      transform: "translateY(0%)",
      scrollTrigger: {
        trigger: "[data-project-map]",
        start: "top 80%",
      },
    });

    gsap.to("[data-project-map-content]", {
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: "[data-project-map]",
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section data-project-map className="container rounded-xl py-8 md:py-14">
      <h2 className="mb-4 text-center font-metropolis-bold text-2xl md:mb-8 opacity-0 translate-y-full">
        Location
      </h2>

      <div data-project-map-content className="opacity-0">
        <MapComponent locations={coordinates} />

        <div className="mt-6 flex">
          <div className="mr-3 h-4 w-4 text-nk-red md:h-6 md:w-6">
            <svg
              viewBox="0 0 21 30"
              fill="currentColor"
              stroke="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.9889 14.1148C10.0412 14.1148 9.13225 13.7383 8.46211 13.0681C7.79197 12.398 7.41549 11.4891 7.41549 10.5414C7.41549 9.59366 7.79197 8.68475 8.46211 8.01461C9.13225 7.34447 10.0412 6.96799 10.9889 6.96799C11.9366 6.96799 12.8455 7.34447 13.5156 8.01461C14.1858 8.68475 14.5623 9.59366 14.5623 10.5414C14.5623 11.0106 14.4698 11.4753 14.2903 11.9089C14.1107 12.3424 13.8475 12.7363 13.5156 13.0681C13.1838 13.4 12.7899 13.6632 12.3564 13.8428C11.9228 14.0223 11.4581 14.1148 10.9889 14.1148ZM10.9889 0.535889C8.33526 0.535889 5.79033 1.59004 3.91394 3.46643C2.03754 5.34282 0.983398 7.88776 0.983398 10.5414C0.983398 18.0455 10.9889 29.123 10.9889 29.123C10.9889 29.123 20.9944 18.0455 20.9944 10.5414C20.9944 7.88776 19.9402 5.34282 18.0638 3.46643C16.1874 1.59004 13.6425 0.535889 10.9889 0.535889Z" />
            </svg>
          </div>

          <p>{address}</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectMap;
