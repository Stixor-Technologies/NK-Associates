"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import LinkButton from "../../components/button/link-button";
import facebookIcon from "../../public/assets/icons/facebook.svg";
import instagramIcon from "../../public/assets/icons/instagram.svg";
import youtubeIcon from "../../public/assets/icons/youtube.svg";
import twitterIcon from "../../public/assets/icons/Twitter.svg";
import callIcon from "../../public/assets/icons/call.svg";
import rectangle6 from "../../public/assets/icons/Rectangle 6.svg";
import rectangle7 from "../../public/assets/icons/Rectangle 7.svg";
import rectangle8 from "../../public/assets/icons/Rectangle 8.svg";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function ComponentOne() {
  let imageOne = useRef(null);
  let imageTwo = useRef(null);
  let imageThree = useRef(null);
  useEffect(() => {
    gsap.from(imageOne.current, {
      x: 1000, // Initial off-screen position
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: imageOne.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
        markers: true,
      },
    });

    gsap.from(imageTwo.current, {
      x: 1000, // Initial off-screen position
      opacity: 0,
      duration: 0.75,
      delay: 1, // Delay for the second image
      scrollTrigger: {
        trigger: imageTwo.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
        markers: true,
      },
    });

    gsap.from(imageThree.current, {
      x: 1000, // Initial off-screen position
      opacity: 0,
      duration: 1,
      delay: 1.5, // Delay for the third image
      scrollTrigger: {
        trigger: imageThree.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
        markers: true,
      },
    });
  }, []);
  return (
    <div className="flex flex-col lg2:flex-row">
      <div className="flex flex-col w-full lg2:max-w-[560px]">
        <div className="flex text-[2.25rem] md:text-[3.5rem] text-nk-red font-metropolis-medium text-center lg2:text-left mb-[0.938rem] md:mb-[0.75rem] leading-tight">
          Helping you find the property of your dreams.
        </div>
        <div className="flex w-full justify-center text-nk-black text-[1.25rem] md:text-[1.75rem] text-center md:text-left font-metropolis-extralight">
          Creating quality lifestyles, building stronger communities
        </div>
        <div className="flex mt-[2.064rem] md:mt-[3rem] justify-center lg2:justify-normal mb-[1.875rem] md:mb-[2.7rem]">
          <LinkButton
            text="Contact Us"
            type="solid"
            className="md:h-[3.666rem] md:w-[13.5rem] text-[1rem] md:text-lg md:text-[1.094rem] h-[2.75rem] w-[13.5rem]"
            navigateTo="#form"
          />
        </div>
        <div className="flex divide-x mb-[2.639rem]">
          <div className="flex font-metropolis-semibold text-[1.06rem]">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={callIcon} width={20} height={30} alt="Facebook" />
            </Link>
            3103365966
          </div>
          <div className="flex ml-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={facebookIcon} width={20} height={30} alt="Facebook" />
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={youtubeIcon} width={20} height={30} alt="Youtube" />
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={twitterIcon} width={20} height={30} alt="Twitter" />
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image
                src={instagramIcon}
                width={20}
                height={30}
                alt="Instagram"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-grow flex md:flex-col justify-center relative overflow-x-hidden overflow-y-auto lg:-mr-[10%] lg2:-mr-[15%] min-h-[21rem] lg:min-h-[35rem]">
        <Image
          ref={imageOne}
          src={rectangle6}
          alt="rectangle"
          className="absolute lg:w-[33.8rem] w-[20.5rem] lg:h-[29.1rem] h-[17.7rem] mb-[5%]  -ml-[95%] sm:-ml-[60%] md:ml-[5%] lg:ml-[0%] lg2:-ml-[10%]"
        />
        <Image
          ref={imageTwo}
          src={rectangle7}
          alt="rectangle"
          className="absolute lg:w-[33.8rem] w-[20.5rem] lg:h-[29.1rem] h-[17.7rem] mb-[5%] sm:left-[] md:ml-[32.5%] lg:ml-[25%] lg2:ml-[27%]"
        />
        <Image
          ref={imageThree}
          src={rectangle8}
          alt="rectangle"
          className="absolute lg:w-[33.8rem] w-[20.5rem] lg:h-[29.1rem] h-[17.7rem] mb-[5%] -mr-[95%] sm:-mr-[60%] md:ml-[60%] lg:ml-[50%] lg2:ml-[64.5%]"
        />
      </div>
    </div>
  );
}
