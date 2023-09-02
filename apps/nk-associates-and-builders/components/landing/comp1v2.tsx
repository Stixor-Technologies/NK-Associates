"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import rectangle6 from "../../public/assets/icons/Rectangle 6-2.svg";
import rectangle7 from "../../public/assets/icons/Rectangle 7-2.svg";
import rectangle8 from "../../public/assets/icons/Rectangle 8-2.svg";
import checkIcon from "../../public/assets/icons/Vector.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function ComponentOneV2() {
  let imageOne = useRef(null);
  let imageTwo = useRef(null);
  let imageThree = useRef(null);
  useEffect(() => {
    gsap.from(imageThree.current, {
      x: -1000, // Initial off-screen position
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: imageThree.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
      },
    });

    gsap.from(imageTwo.current, {
      x: -1000, // Initial off-screen position
      opacity: 0,
      duration: 0.75,
      delay: 1, // Delay for the second image
      scrollTrigger: {
        trigger: imageTwo.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
      },
    });

    gsap.from(imageOne.current, {
      x: -1000, // Initial off-screen position
      opacity: 0,
      duration: 1,
      delay: 1.5, // Delay for the third image
      scrollTrigger: {
        trigger: imageOne.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
      },
    });
  }, []);
  return (
    <div className="flex flex-col lg2:flex-row">
      <div className="flex-grow flex md:flex-col justify-center relative overflow-x-hidden lg:-ml-[10%] lg2:-ml-[15%] min-h-[21rem] lg:min-h-[35rem]">
        <Image
          ref={imageOne}
          src={rectangle8}
          alt="rectangle"
          className="absolute lg:w-[33.8rem] w-[18.375rem] lg:h-[29.1rem] h-[19.6rem] mb-[5%]  -ml-[75%] sm:-ml-[50%] md:ml-[0%] lg:ml-[3%] lg2:-ml-[14%]"
        />
        <Image
          ref={imageTwo}
          src={rectangle7}
          alt="rectangle"
          className="absolute lg:w-[33.8rem] w-[18.375rem] lg:h-[29.1rem] h-[19.6rem] mb-[5%] sm:left-[] md:ml-[28%] lg:ml-[29%] lg2:ml-[10%]"
        />
        <Image
          ref={imageThree}
          src={rectangle6}
          alt="rectangle"
          className="absolute lg:w-[33.8rem] w-[18.375rem] lg:h-[29.1rem] h-[19.6rem] mb-[5%] -mr-[95%] sm:-mr-[60%] md:ml-[60%] lg:ml-[62%] lg2:ml-[41%]"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex text-[2rem] md:text-[2.673rem] text-nk-red font-metropolis-bold text-center lg2:text-left mb-[0.938rem] md:mb-[0.75rem] leading-tight">
          Why you should choose us.
        </div>
        <div className="flex w-full justify-center text-nk-black text-[1.125rem] md:text-[1.336rem] text-center md:text-left font-metropolis-extralight">
          Creating quality urban lifestyles, building stronger communities
        </div>
        <div className="flex flex-col mt-[2.064rem] md:mt-[3rem] justify-center lg2:justify-normal mb-[1.875rem] md:mb-[2.7rem]">
          <div className="flex">
            <Image src={checkIcon} alt="check" />
            <span className="text-[1.25rem] font-metropolis-medium ml-1">
              World class
            </span>
            <Image src={checkIcon} alt="check" className="ml-[2.75rem]" />
            <span className="text-[1.25rem] font-metropolis-medium ml-1">
              Affordable
            </span>
          </div>
          <div className="flex">
            <Image src={checkIcon} alt="check" />
            <span className="text-[1.25rem] font-metropolis-medium ml-1">
              Trusted
            </span>
            <Image src={checkIcon} alt="check" className="ml-[5rem]" />
            <span className="text-[1.25rem] font-metropolis-medium ml-1">
              Amenities
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
