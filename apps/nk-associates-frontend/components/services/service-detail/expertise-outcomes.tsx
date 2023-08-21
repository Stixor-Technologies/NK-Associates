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

  useLayoutEffect(() => {
    const ourText = new SplitType("[data-expertise] h2", { types: "chars" });
    const chars = ourText.chars;

    // expertise animation
    const expertiseTl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-expertise]",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
    expertiseTl.from(chars, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out",
    });
    expertiseTl.from(
      "[data-expertise] p",
      {
        x: "50%",
        opacity: 0,
        duration: 1,
        ease: "sine.out",
      },
      "<",
    );

    // pinned animation
    const textPanels: HTMLElement[] = gsap.utils.toArray(".text-panel");
    const outcomeTl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-expertise-outcomes]",
        start: "top top",
        end: `+=${40 * textPanels.length}%`,
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

    textPanels.forEach((panel, index) => {
      if (index !== 0) {
        gsap.set(panel, {
          y: `${index * 50}%`,
          opacity: 0,
        });
      }
      const pos = index ? "+=0.5" : "";
      if (textPanels[index + 1]) {
        outcomeTl
          .to(
            panel,
            {
              opacity: 0,
              y: "-50%",
            },
            pos,
          )
          .to(
            textPanels[index + 1],
            {
              opacity: 1,
              y: 0,
            },
            "<0.5",
          );
      }
    });
  }, []);
  return (
    <div data-expertise-outcomes className="md:min-h-screen">
      <div className="h-full flex items-center flex-col md:flex-row">
        <div className="w-1/2">
          <div className="flex">
            {images.map((img, index) => {
              const left = `${index * 20}px`;
              const scal = 1;
              return (
                <div
                  key={index}
                  className={`relative w-[400px] h-[500px] ml-[${left}]`}
                >
                  <Image
                    src={`/assets/images/${img}.png`}
                    fill
                    alt=""
                    className=""
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-1/2 relative flex items-center  justify-center ">
          <div data-expertise className="text-panel absolute bg-nk-background">
            <div className="overflow-hidden">
              <h2 className="text-[1.75rem] font-metropolis-bold text-nk-black md:text-5xl">
                Areas of Expertise
              </h2>
            </div>
            <p className="text-base font-metropolis-thin text-nk-black py-4 md:text-xl">
              NK Design and Construction is a real estate development company
              that specializes in residential and commercial architecture,
              interior design, and construction management. The company has a
              proven track record of delivering exceptional outcomes for its
              clients, and its team of experienced professionals is dedicated to
              creating beautiful and functional spaces. If you are looking for a
              real estate development company that can help you achieve your
              goals, NK Design and Construction is the perfect choice.
            </p>
          </div>

          <div className="text-panel absolute bg-nk-background">
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
