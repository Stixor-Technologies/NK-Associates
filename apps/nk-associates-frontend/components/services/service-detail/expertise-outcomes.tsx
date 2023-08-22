"use client";
import React, { FC, useLayoutEffect } from "react";
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
  const images = ["placeholder", "placeholder2", "placeholder"];

  // useLayoutEffect(() => {
  //   // expertise text and images animation
  //   const expertiseImages: HTMLDivElement[] =
  //     gsap.utils.toArray(".expertise-images");
  //   const ourText = new SplitType("[data-expertise] h2", { types: "chars" });
  //   const chars = ourText.chars;

  //   const expertiseTl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "[data-expertise]",
  //       start: "top 30%",
  //       // toggleActions: "play none none none",
  //     },
  //   });

  //   expertiseTl.from(".expertise-images", {
  //     xPercent: 60,
  //     opacity: 0,
  //     yPercent: 12,
  //     stagger: 0.3,
  //     duration: 1,
  //     // scale: 0,
  //     scale: 0.5,
  //     ease: "power2.out",
  //   });

  //   expertiseTl.from(
  //     chars,
  //     {
  //       y: 100,
  //       opacity: 0,
  //       duration: 1,
  //       stagger: 0.03,
  //       ease: "power4.out",
  //     },
  //     "<0.5",
  //   );
  //   expertiseTl.from(
  //     "[data-expertise] p",
  //     {
  //       x: "50%",
  //       opacity: 0,
  //       duration: 1,
  //       ease: "sine.out",
  //     },
  //     "<",
  //   );

  //   // pinned animation
  //   const textPanels: HTMLElement[] = gsap.utils.toArray(".text-panel");
  //   const outcomeTl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "[data-expertise-outcomes]",
  //       start: "top top",
  //       end: `+=${40 * textPanels.length}%`,
  //       pin: true,
  //       scrub: 1,
  //       // markers: true
  //       invalidateOnRefresh: true,
  //       snap: {
  //         snapTo: 1 / (textPanels.length - 1),
  //         duration: 0.5,
  //         ease: "power2.out",
  //       },
  //     },
  //   });

  //   textPanels.forEach((panel, index) => {
  //     if (index !== 0) {
  //       gsap.set(panel, {
  //         y: `${index * 50}%`,
  //         opacity: 0,
  //       });
  //     }
  //     const pos = index ? "+=0.5" : "";
  //     if (textPanels[index + 1]) {
  //       outcomeTl
  //         .to(
  //           panel,
  //           {
  //             opacity: 0,
  //             y: "-50%",
  //           },
  //           pos,
  //         )
  //         .to(
  //           textPanels[index + 1],
  //           {
  //             opacity: 1,
  //             y: 0,
  //           },
  //           "<0.5",
  //         );
  //     }
  //   });
  // }, []);
  // md:h-screen
  // h-[600px]

  return (
    <div data-expertise-outcomes className="min-h-[600px] bg-slate-300">
      <div className="h-full flex items-center flex-col md:flex-row md:w-1/2">
        <div className="w-full h-full">
          <div className="relative flex items-center h-full">
            {images.map((img, index) => {
              const numberOfImages = images.length;
              const scale = 1 - 0.1 * (numberOfImages - index - 1);
              const left = index * 10;
              return (
                <div
                  key={index}
                  className="expertise-images absolute w-[80%] max-w-[400px] h-[500px] origin-left"
                  style={{
                    transform: `scale(${scale})`,
                    left: `${left}%`,
                  }}
                >
                  <Image
                    src={`/assets/images/bg-project.jpeg`}
                    fill
                    alt=""
                    className="object-cover rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full relative flex items-center justify-center h-full md:w-1/2">
          <div data-expertise className="text-panel absolute bg-transparent">
            <div className="overflow-hidden">
              <h2 className="text-[1.75rem] font-metropolis-bold text-nk-black md:text-5xl">
                Areas of Expertise
              </h2>
            </div>
            <p className="text-base font-metropolis-thin text-nk-black py-4 md:text-xl">
              {expertise}
            </p>
          </div>

          <div className="text-panel absolute bg-transparent">
            <h2 className="text-[1.75rem] font-metropolis-bold text-nk-black md:text-5xl">
              Outcomes
            </h2>
            <p className="text-base font-metropolis-thin text-nk-black py-4 md:text-xl">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseOutcomes;
