"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import AreaMarker from "../../public/assets/icons/area-marker.svg";

import MapComponent from "../shared/map-component";

type PropTypes = {
  address: string;
  coordinates: {
    lng: number;
    lat: number;
  };
};

const ProjectMap = ({ address, coordinates }: PropTypes) => {
  useEffect(() => {
    const projectMapTl = gsap.timeline({
      scrollTrigger: {
        id: "data-project-map",
        trigger: "[data-project-map]",
        start: "top 80%",
      },
    });

    projectMapTl.to("[data-project-map] h2", {
      opacity: 1,
      transform: "translateY(0%)",
    });

    projectMapTl.to("[data-project-map-content]", {
      opacity: 1,
      duration: 0.8,
    });
    return () => {
      ScrollTrigger.getById("data-project-map")?.kill();
    };
  }, []);

  return (
    <section data-project-map className="container rounded-xl py-8 md:py-14">
      <h2 className="mb-4 text-center font-metropolis-bold text-2xl md:mb-8 opacity-0 translate-y-full">
        Location
      </h2>

      <div data-project-map-content className="opacity-0">
        <MapComponent locations={coordinates} />

        <div className="mt-6 flex items-center gap-3 py-1 md:gap-3.5 md:py-4">
          <Image
            src={AreaMarker}
            width={16}
            height={16}
            alt="address-marker"
            className="w-3.5 md:w-5"
          />
          <h2 className="self-end text-sm text-nk-black md:font-metropolis-extralight md:text-[1.75rem]">
            {address}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ProjectMap;
