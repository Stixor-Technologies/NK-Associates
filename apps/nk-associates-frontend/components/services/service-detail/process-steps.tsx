"use client";
import React, { FC, useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { ServiceProcess } from "../../../utils/types/types";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ProcessStepsProps {
  process: ServiceProcess[];
}

const ProcessSteps: FC<ProcessStepsProps> = ({ process }) => {
  const [windowSize, setWindowSize] = useState<number>(0);
  const breakPoint = 1024;

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

  useEffect(() => {
    if (windowSize >= breakPoint) {
      const cards: HTMLDivElement[] = gsap.utils.toArray(".process-card");
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          id: "process-step-trigger",
          trigger: "[data-cards-container]",
          pin: true,
          start: "top 15%",
          scrub: true,
          end: () => "+=" + cards[0].clientWidth * (cards.length * 1),
          markers: true,
        },
      });
    } else {
      ScrollTrigger.getById("process-step-trigger")?.kill();
    }

    return () => {
      ScrollTrigger.getById("process-step-trigger")?.kill();
    };
  }, [windowSize]);

  return (
    <div className="w-full text-nk-black py-2 lg:py-10">
      <div>
        <h3 className="text-center font-metropolis-semibold mb-8 text-[1.75rem] md:text-4xl md:mb-12">
          Service Process
        </h3>
        <div
          data-cards-container
          className="min-h-[80vh] container lg:flex lg:items-center"
        >
          <div className="flex flex-col justify-center 2xl:h-[80%]">
            <div className="h-full">
              <div className="panels-container relative flex flex-col gap-8 lg:flex-row lg:items-start lg:flex-nowrap p-0 h-full">
                {process?.map((step, index) => {
                  const processImage =
                    step?.process_image?.data?.attributes?.url;
                  const formattedIndex =
                    index < 9 ? `0${index + 1}` : index + 1;

                  return (
                    <div
                      key={index}
                      className={`h-full flex-shrink-0 process-card relative flex flex-col lg:flex-row lg:items-center w-[100%] border bg-nk-white rounded-xl sm:min-h-[35rem] gap-6 shadow-md px-8 py-6 md:gap-[3.125rem] md:px-12 md:py-16`}
                    >
                      <div className="relative shrink-0 self-center w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem] md:w-[37.5rem] md:h-[37.5rem] lg:w-[40%] lg:h-[20.125rem] 2xl:h-[34rem]">
                        <Image
                          src={`${BASE_URL}${processImage || "/"}`}
                          fill
                          alt={`process-img-${index}`}
                          className="object-cover"
                        />
                      </div>
                      <div className="lg:w-[60%] 2xl:pr-6">
                        <h2 className="text-2xl font-metropolis-semibold md:text-[2.5rem]">
                          {`${step?.process_title}: `}
                        </h2>
                        <p className="text-xl font-metropolis-thin text-nk-black leading-tight mt-3 sm:mt-6 md:text-[1.75rem]">
                          {`${step?.process_description}`}
                        </p>
                      </div>

                      <span className="absolute leading-none top-3 right-5 text-nk-red opacity-20 font-metropolis-extrabold text-2xl sm:text-6xl md:text-[5.625rem]">
                        {formattedIndex}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
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
