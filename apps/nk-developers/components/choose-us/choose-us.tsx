"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Valley from "../../public/assets/images/valley.svg";
import LinkButton from "../button/link-button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ChooseUs = () => {
  useEffect(() => {
    const cards: HTMLElement[] = gsap.utils.toArray(".valley-image");
    gsap.set(".valley-image", { opacity: 1, y: 0, x: "0%", rotate: 0 });

    cards.forEach((card, index) => {
      gsap.from(card, {
        x: "-150%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          id: "ValleyTrigger",
          trigger: card,
          start: "top 40%",
        },
      });
    });
  }, []);

  return (
    <div className="flex p-4 flex-col lg:flex-row lg:p-0 gap-[6.875rem] mt-[4.375rem] lg:mt-[9rem] items-center">
      <div className="max-h-[38.125] max-w-[38.625rem] valley-image">
        <Image src={Valley} alt="Valley" width={618} height={610} />
      </div>
      <div className="flex-col max-w-[42.375rem]">
        <h1 className="text-nk-red font-metropolis-bold text-[2.673rem] lg:pt-[4.188rem] text-center md:text-left">
          Why you should choose us.
        </h1>
        <div className="text-nk-dark-gray font-metropolis-light text-[1.313rem] pt-[1.625rem] flex-col text-center md:text-left">
          <p>
            NK Developer specializes in visionary real estate development, with
            expertise in creating landmark projects that enhance communities.
            The company&apos;s areas of expertise include strategic site
            selection, feasibility analysis, project planning, design
            coordination, construction management, and the creation of
            sustainable and modern living spaces.
          </p>
        </div>
        <div className="flex mt-[2.064rem] md:mt-[1.75rem] justify-center lg:justify-normal mb-[1.875rem] md:mb-[2.7rem]">
          <LinkButton
            text="Contact Us"
            type="solid"
            className="md:h-[3.666rem] md:w-[13.5rem] text-[1rem] md:text-lg md:text-[1.094rem] h-[2.75rem] w-[13.5rem]"
            navigateTo="https://develop.d2vr74cwsk1kb.amplifyapp.com/contact"
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
