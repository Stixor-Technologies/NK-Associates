"use client";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { ServiceProcess } from "../../../utils/types/types";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

interface ProcessStepsProps {
  process: ServiceProcess[];
}

const ProcessSteps: FC<ProcessStepsProps> = ({ process }) => {
  const [windowSize, setWindowSize] = useState<number>(0);
  const breakPoint = 768;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.getById("processTriger")?.kill();
    if (windowSize > breakPoint) {
      const cards: HTMLDivElement[] = gsap.utils.toArray(".process-card");
      gsap.set(".process-card:not(:first-child)", { x: "200%" });

      gsap.to("[data-cards-container]", {
        scrollTrigger: {
          id: "processTriger",
          trigger: "[data-cards-container]",
          endTrigger: ".panels-container",
          start: "top 15%",
          end: `+=${cards[0].clientHeight * (cards.length * 1.5)}`,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        gsap.to(card, {
          x: "0%",
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: `${index * 100}% top`,
            end: `${(index + 1) * 100}% top`,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      });
    } else {
      gsap.set(".process-card", { x: "0%" });
    }
  }, [windowSize]);

  return (
    <div data-cards-container className="min-h-[34.688rem] py-8 text-nk-black">
      <h3 className="text-center font-metropolis-semibold text-[1.75rem] mb-7 md:text-4xl md:mb-12">
        Service Process
      </h3>
      <div className="panels-container relative min-h-[20.25rem]">
        {process.map((step, index) => {
          const processImage = step?.process_image?.data?.attributes?.url;
          return (
            <div
              key={index}
              className="process-card w-full my-5 flex flex-col items-center bg-nk-white rounded-xl shadow-md gap-8 sm:gap-6 px-6 py-8 sm:flex-row md:gap-8 md:px-8 md:py-12 md:absolute md:my-0"
            >
              <div className="relative w-[8.875rem] h-[9rem] md:w-[14.125rem] md:h-[14.25rem]">
                <Image
                  src={`${BASE_URL}${processImage || "/"}`}
                  fill
                  alt={`process-img-${index}`}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-metropolis-semibold md:text-[2.5rem]">
                  {`${step?.process_title}: `}
                </h2>
                <p className="text-xl font-metropolis-thin mt-2 md:mt-6 md:text-[2rem]">
                  {`${step?.process_description}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <p className=" max-w-5xl mx-auto text-center mt-4 text-base font-metropolis-thin text-nk-black md:mt-8 md:text-2xl">
        NK Design and Construction&rsquo;s commitment to innovation,
        collaboration, and attention to detail ensures that every project is a
        testament to our expertise and the vision of our clients.
      </p>
    </div>
  );
};

export default ProcessSteps;
