"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import LinkButton from "../../components/button/link-button";
import facebookIcon from "../../public/assets/icons/Facebook.svg";
import instagramIcon from "../../public/assets/icons/instagram.svg";
import youtubeIcon from "../../public/assets/icons/youtube.svg";
import twitterIcon from "../../public/assets/icons/Twitter.svg";
import callIcon from "../../public/assets/icons/call.svg";
import Family from "../../public/assets/images/family.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ContactComponent() {
  useEffect(() => {
    const cards: HTMLElement[] = gsap.utils.toArray(".family-image");
    // gsap.set(".family-image", { opacity: 1, y: 0, x: "0%", rotate: 0 });

    cards.forEach((card, index) => {
      gsap.to(card, {
        x: "0%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          id: "FamilyTrigger",
          trigger: card,
          start: "top 40%",
        },
      });
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="lg:ml-10 lg:w-1/2 pt-[6.188rem]">
        <div className="flex flex-col w-full lg:max-w-[560px] mx-auto">
          <div className="flex text-[2.25rem] md:text-[3.5rem] text-nk-red font-metropolis-medium text-center lg:text-left mb-[0.938rem] md:mb-[0.75rem] leading-tight py-4 sm:px-24 lg:p-0">
            Helping you find the property of your dreams.
          </div>
          <div className="flex w-full justify-center text-nk-black text-[1.25rem] md:text-[1.75rem] text-center md:text-left font-metropolis-extralight">
            Creating quality lifestyles, building stronger communities
          </div>
          <div className="flex mt-[2.064rem] md:mt-[3rem] justify-center lg:justify-normal mb-[1.875rem] md:mb-[2.7rem]">
            <LinkButton
              text="Contact Us"
              type="solid"
              className="md:h-[3.666rem] md:w-[13.5rem] text-[1rem] md:text-lg md:text-[1.094rem] h-[2.75rem] w-[13.5rem]"
              navigateTo="https://develop.d2vr74cwsk1kb.amplifyapp.com/contact"
            />
          </div>
          <div className="flex divide-x mb-[2.639rem] justify-center lg:justify-start">
            <div className="flex font-metropolis-semibold text-[1.06rem]">
              <Link
                href="tel:923103365966"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 shrink-0 flex gap-2"
              >
                <Image src={callIcon} width={20} height={30} alt="Facebook" />
                310 3365966
              </Link>
            </div>
            <div className="flex ml-2">
              <Link
                href="https://www.facebook.com/NKAssociatesOfficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 shrink-0"
              >
                <Image
                  src={facebookIcon}
                  width={20}
                  height={30}
                  alt="Facebook"
                />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCUdSaD4ZjxDYxXiQXZIM7tw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 shrink-0 my-auto"
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
      </div>

      <div className="flex-grow flex md:flex-col justify-center relative overflow-x-hidden min-h-[21rem] lg:min-h-[35rem]">
        <div className="relative family-image translate-x-full">
          <div className="bg-nk-pink max-h-[85%] w-full absolute inset-0 "></div>
          <div className="relative max-w-[56.5rem] max-h-[40.875rem]">
            <Image
              src={Family}
              alt="family"
              width={904}
              height={654}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
