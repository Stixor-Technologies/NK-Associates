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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-expertise]",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
    tl.from(chars, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out",
    });
    tl.from(
      "[data-expertise] p",
      {
        x: "50%",
        opacity: 0,
        duration: 1,
        ease: "sine.out",
      },
      "<",
    );
  }, []);
  return (
    <div>
      <div className="flex">
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
                  {/* <div className="relative h-full w-full"> */}
                  <Image
                    src={`/assets/images/${img}.png`}
                    fill
                    alt=""
                    className=""
                  />
                </div>
                // </div>
              );
            })}
          </div>
        </div>

        <div className="self-center w-1/2">
          <div data-expertise className="">
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
        </div>
      </div>
    </div>
  );
};

export default ExpertiseOutcomes;
