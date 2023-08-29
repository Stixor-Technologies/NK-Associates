"use client";
import React, { FC, useLayoutEffect, useEffect, useState } from "react";
import Image from "next/image";
import { BASE_URL } from "../../../utils/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface OutcomesProps {
  expertise: string;
  expertise_image: string;
  outcome: string;
  outcome_image: string;
}

const ExpertiseOutcomes: FC<OutcomesProps> = ({
  expertise,
  expertise_image,
  outcome,
  outcome_image,
}) => {
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

  useLayoutEffect(() => {
    ScrollTrigger.getById("expertiseTrigger")?.kill();
    ScrollTrigger.getById("mobileExpertiseTrigger")?.kill();
    ScrollTrigger.getById("mobileOutcomeTrigger")?.kill();

    if (windowSize >= breakPoint) {
      gsap.set("[data-expertise] .images-panel:first-child", {
        opacity: 1,
        y: 0,
        x: "0%",
        rotate: -6,
      });

      gsap.set("[data-outcome] .images-panel:first-child", {
        opacity: 1,
        y: "200%",
        x: "0%",
        rotate: 0,
      });

      gsap.set("[data-outcome] .text-panel:nth-child(2)", { opacity: 0 });

      const panels: HTMLElement[] = gsap.utils.toArray(".panels");
      const textPanels: HTMLElement[] = gsap.utils.toArray(".text-panel");
      const imagesPanel: HTMLElement[] = gsap.utils.toArray(".images-panel");

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          id: "expertiseTrigger",
          trigger: "[data-expertise-outcomes]",
          start: "top 20%",
          end: `+=${40 * panels.length}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
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
    } else {
      gsap.set(".text-panel", {
        opacity: 1,
      });

      gsap.set(".images-panel", { opacity: 0, y: 0, x: "-100%", rotate: 0 });
      const expertiseTl = gsap.timeline({
        scrollTrigger: {
          id: "mobileExpertiseTrigger",
          trigger: "[data-expertise]",
          start: "top 70%",
        },
      });

      expertiseTl.to("[data-expertise] .images-panel:first-child", {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      });
      expertiseTl.to("[data-expertise] .images-panel:first-child", {
        rotate: -6,
      });

      const outComeTl = gsap.timeline({
        scrollTrigger: {
          id: "mobileOutcomeTrigger",
          trigger: "[data-outcome]",
          start: "top 70%",
        },
      });

      outComeTl.to("[data-outcome] .images-panel:first-child", {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      });

      outComeTl.to("[data-outcome] .images-panel:first-child", {
        rotate: -6,
      });
    }
  }, [windowSize]);

  return (
    <div
      data-expertise-outcomes
      className="relative lg:h-[70vh] lg:flex lg:flex-col lg:my-[5.625rem] lg:justify-center"
    >
      {/* expertise */}
      <div
        data-expertise
        className="panels my-10 flex flex-col w-full gap-10 sm:my-0 lg:flex-row lg:my-0 lg:absolute"
      >
        <div className="images-panel self-center w-[90%] max-w-[22rem] mx-auto sm:w-full md:max-w-[27rem] lg:w-[45%] lg:-rotate-6">
          <div className="relative aspect-square w-full">
            <Image
              src={`${BASE_URL}${expertise_image || "/"}`}
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
          <p className="text-base font-metropolis-thin text-nk-black md:py-4 md:text-xl">
            {expertise}
          </p>
        </div>
      </div>

      {/* outcomes */}
      <div
        data-outcome
        className="panels my-10 flex flex-col w-full gap-10 lg:flex-row lg:my-0 lg:absolute"
      >
        <div className="images-panel self-center w-[90%] max-w-[22rem] mx-auto sm:w-full md:max-w-[27rem] lg:w-[45%] lg:translate-y-[200%] opacity-0 lg:opacity-1">
          <div className="relative aspect-square w-full">
            <Image
              src={`${BASE_URL}${outcome_image || "/"}`}
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
          <p className="text-base font-metropolis-thin text-nk-black md:py-4 md:text-xl">
            {outcome}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseOutcomes;
