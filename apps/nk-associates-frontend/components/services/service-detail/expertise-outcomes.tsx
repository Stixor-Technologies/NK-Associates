"use client";
import React, { FC, useLayoutEffect, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
interface OutcomesProps {
  outcome_images?: string[];
  expertise?: string;
  outcomes?: String;
}

const ExpertiseOutcomes: FC<OutcomesProps> = ({
  outcome_images,
  expertise,
  outcomes,
}) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const breakPoint = 1024;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    // pinned animation
    ScrollTrigger.getById("expertiseTrigger")?.kill();
    let pinnedTl = null; // Initialize the variable

    if (windowSize > breakPoint) {
      const panels: HTMLElement[] = gsap.utils.toArray(".panels");
      const textPanels: HTMLElement[] = gsap.utils.toArray(".text-panel");
      const imagesPanel: HTMLElement[] = gsap.utils.toArray(".images-panel");

      pinnedTl = gsap.timeline({
        scrollTrigger: {
          id: "expertiseTrigger",
          trigger: "[data-expertise-outcomes]",
          start: "top 10%",
          end: `+=${35 * panels.length}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: true,
          snap: {
            snapTo: 1 / (textPanels.length - 1),
            duration: 0.5,
            ease: "power2.out",
          },
        },
      });

      panels.forEach((panel, index) => {
        if (imagesPanel[index + 1]) {
          pinnedTl
            .to(textPanels[index], {
              opacity: 0,
            })
            .to(
              textPanels[index + 1],
              {
                opacity: 1,
              },
              "<0.1",
            )
            .to(
              imagesPanel[index + 1],
              {
                opacity: 1,
                y: 0,
                rotate: 6,
              },
              "<0.1",
            );
        }
      });
    }

    // Clear the timeline if it exists and windowSize is below the breakpoint
    if (pinnedTl && windowSize <= breakPoint) {
      gsap.set(".text-panel", { opacity: 1 });
      gsap.set(".image-panel", { opacity: 1, y: 0, rotate: 0 });

      pinnedTl.clear();
      pinnedTl = null; // Clear the reference after clearing the timeline
    }
  }, [windowSize]);

  return (
    <div
      data-expertise-outcomes
      className="lg:h-[70vh] lg:flex lg:flex-col relative lg:justify-center"
    >
      {/* expertise */}
      <div className="panels flex flex-col lg:flex-row gap-9 lg:absolute">
        <div className="images-panel self-center w-full max-w-[22rem] md:max-w-[27rem] mx-auto lg:w-[45%] lg:-rotate-6">
          <div className="relative aspect-square w-full">
            <Image
              src={`/assets/images/bg-project.jpeg`}
              alt="expertise-picture"
              fill
              className="rounded-3xl shadow-xl object-cover"
            />
          </div>
        </div>
        <div className="text-panel self-center text-panel w-full bg-transparent text-center lg:text-left lg:w-[55%]">
          <div className="overflow-hidden">
            <h2 className="text-[1.75rem] font-metropolis-bold text-nk-black md:text-5xl">
              Areas of Expertise
            </h2>
          </div>
          <p className="text-base font-metropolis-thin text-nk-black py-4 md:text-xl">
            {expertise}
          </p>
        </div>
      </div>

      {/* outcomes */}
      <div className="panels flex flex-col lg:flex-row gap-9 my-10 lg:absolute">
        <div className="self-center images-panel w-full max-w-[22rem] md:max-w-[27rem] mx-auto lg:w-[45%] lg:translate-y-full lg:opacity-0">
          <div className="relative aspect-square w-full">
            <Image
              src={`/assets/images/bg-project.jpeg`}
              alt="expertise-picture"
              fill
              className="rounded-3xl shadow-xl object-cover"
            />
          </div>
        </div>
        <div className="text-panel self-center w-full bg-transparent text-center lg:text-left lg:w-[55%] lg:opacity-0">
          <div className="overflow-hidden">
            <h2 className="text-[1.75rem] font-metropolis-bold text-nk-black md:text-5xl">
              Outcomes
            </h2>
          </div>
          <p className="text-base font-metropolis-thin text-nk-black py-4 md:text-xl">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseOutcomes;
