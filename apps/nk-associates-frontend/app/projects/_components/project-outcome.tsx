'use client';

import Image from "next/image";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";

type PropTypes = {
  outcomeImage: string;
  outcomeDescription: string;
}

const ProjectOutcome = ({outcomeImage, outcomeDescription}: PropTypes) => {

  useLayoutEffect(() => {
    gsap.to("[data-project-outcome-image]", {
      opacity: 1,
      translateX: "0%",
      duration: 0.5,
      scrollTrigger: {
        trigger: "[data-project-outcome]",
        start: "top 60%",
      }
    });
    gsap.to("[data-project-outcome-image]", {
      rotate: -4,
      duration: 0.3,
      delay: 0.4,
      scrollTrigger: {
        trigger: "[data-project-outcome]",
        start: "top 60%",
      }
    });

    gsap.to("[data-project-outcome] h2", {
      opacity: 1,
      transform: 'translateY(0%)',
      scrollTrigger: {
        trigger: "[data-project-outcome]",
        start: "top 80%",
      }
    });

    gsap.to("[data-project-outcome-description]", {
      opacity: 1,
      duration: 0.3,
      transform: 'translateY(0%)',
      scrollTrigger: {
        trigger: "[data-project-outcome]",
        start: "top 65%",
      }
    });
  }, []);

  return (
    <section data-project-outcome className="container flex flex-col items-center pb-6 pt-10 md:pt-14 lg:flex-row lg:items-start">
        <div className="w-full max-w-[30rem] md:px-4 lg:w-5/12">
          <div data-project-outcome-image className="relative mx-auto mb-10 aspect-square h-[90%] w-[90%] -translate-x-full opacity-0">
            <Image
              src={outcomeImage}
              alt="Project Picture"
              fill
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="w-full md:px-8 lg:w-7/12">
          <h2 className="mb-4 text-center font-metropolis-bold text-2xl md:mb-8 opacity-0 translate-y-full">
            Project Outcomes
          </h2>

          <p data-project-outcome-description className="whitespace-pre-line text-center opacity-0">
            {outcomeDescription}
          </p>
        </div>
      </section>
  )
}

export default ProjectOutcome