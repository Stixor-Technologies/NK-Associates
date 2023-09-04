"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LinkButton from "../../components/button/link-button";
import facebookIcon from "../../public/assets/icons/facebook.svg";
import instagramIcon from "../../public/assets/icons/instagram.svg";
import youtubeIcon from "../../public/assets/icons/youtube.svg";
import twitterIcon from "../../public/assets/icons/Twitter.svg";
import callIcon from "../../public/assets/icons/call.svg";
import rectangle3 from "../../public/assets/icons/Rectangle 3.svg";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function ComponentOne() {
  const [animated, setAnimated] = useState(false);
  let imageOne = useRef(null);
  useEffect(() => {
    setAnimated(true);
    gsap.from(imageOne.current, {
      x: 1000, // Initial off-screen positio
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: imageOne.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
      },
    });
  }, [animated]);
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
            navigateTo="https://develop.d2vr74cwsk1kb.amplifyapp.com/contact"
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
              href="https://www.facebook.com/NKAssociatesOfficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={facebookIcon} width={20} height={30} alt="Facebook" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCUdSaD4ZjxDYxXiQXZIM7tw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={youtubeIcon} width={20} height={30} alt="Youtube" />
            </Link>
            <Link
              href="https://twitter.com/NKAssociates6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={twitterIcon} width={20} height={30} alt="Twitter" />
            </Link>
            <Link
              href="https://www.instagram.com/nkassociatesofficial/"
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
      <div className="ml-[1.55rem] flex justify-center">
        {animated && (
          <Image
            priority={true}
            ref={imageOne}
            src={rectangle3}
            alt="rectangle"
            className=""
          />
        )}
      </div>
    </div>
  );
}
