"use client";
import React, { FC, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Vector from "../../../public/assets/images/Vector.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStepsProps {}

const ProcessSteps: FC<ProcessStepsProps> = () => {
  const sam = [1, 2, 3, 5];

  useLayoutEffect(() => {
    const cards = gsap.utils.toArray(".process-card");
    gsap.set(".process-card:not(:first-child)", { x: "200%" });

    gsap.to("[data-cards-container]", {
      scrollTrigger: {
        trigger: "[data-cards-container]",
        endTrigger: ".panels-container",
        start: "top 15%",
        end: `+=${cards[0].clientHeight * (cards.length * 1.5)}`,
        pin: true,
        markers: true,
        pinSpacing: true,
      },
    });

    cards.forEach((card, index) => {
      gsap.to(card, {
        x: "0%",
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
  }, []);

  return (
    <div data-cards-container className="min-h-[34.688rem] py-10 text-nk-black">
      <h3 className="text-center font-metropolis-semibold text-[1.75rem] mb-7 md:text-4xl md:mb-12">
        Service Process
      </h3>
      <div className="panels-container relative">
        {sam.map((index) => (
          <div
            key={index}
            className="process-card absolute w-full flex flex-col items-center bg-nk-white rounded-xl shadow-md gap-8 px-6 py-8 md:flex-row md:gap-8 md:px-8 md:py-12"
          >
            <div>
              <Image src={Vector} width={226} height={229} alt="" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-metropolis-semibold md:text-[2.5rem]">
                Initial Consultation:
              </h2>
              <p className="text-xl font-metropolis-thin mt-2 md:mt-6 md:text-[2rem]">
                Understand client requirements and project objectives
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
