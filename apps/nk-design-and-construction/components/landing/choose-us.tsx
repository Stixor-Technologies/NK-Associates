"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LinkButton from "../button/link-button";
import facebook_Icon from "../../public/assets/icons/facebook.svg";
import instagram_Icon from "../../public/assets/icons/instagram.svg";
import youtube_Icon from "../../public/assets/icons/youtube.svg";
import twitter_Icon from "../../public/assets/icons/Twitter.svg";
import call_Icon from "../../public/assets/icons/call.svg";
import rectangle_3 from "../../public/assets/icons/rectangle-3.svg";
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
      x: -1000, // Initial off-screen position
      opacity: 1,
      duration: 1,

      scrollTrigger: {
        trigger: imageOne.current,
        start: "top 70%", // Adjust as needed
        end: "center 50%",
      },
    });
  }, [animated]);
  return (
    <div className="flex flex-col lg2:flex-row-reverse">
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
              <Image src={call_Icon} width={20} height={30} alt="Facebook" />
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
              <Image
                src={facebook_Icon}
                width={20}
                height={30}
                alt="Facebook"
              />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCUdSaD4ZjxDYxXiQXZIM7tw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={youtube_Icon} width={20} height={30} alt="Youtube" />
            </Link>
            <Link
              href="https://twitter.com/NKAssociates6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image src={twitter_Icon} width={20} height={30} alt="Twitter" />
            </Link>
            <Link
              href="https://www.instagram.com/nkassociatesofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 shrink-0"
            >
              <Image
                src={instagram_Icon}
                width={20}
                height={30}
                alt="Instagram"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className=" mr-[1.55rem] flex justify-center ">
        {animated && (
          <Image
            priority={true}
            ref={imageOne}
            src={rectangle_3}
            alt="rectangle1"
            className=""
          />
        )}
      </div>
    </div>
  );
}
