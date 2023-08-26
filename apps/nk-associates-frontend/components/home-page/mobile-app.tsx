"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSocials } from "../../utils/api-calls";
import FloatingMobile from "../../public/assets/images/floating-mobile.png";
import GooglePlayIcon from "../../public/assets/icons/play-store-home.svg";
import AppStoreIcon from "../../public/assets/icons/app-store-home.svg";
import AppGalleryIcon from "../../public/assets/icons/app-gallery-home.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StoreLinks = {
  playstore: string;
  appstore: string;
  appgallery: string;
};

const NkApp = () => {
  const [storeLinks, setStoreLinks] = useState<StoreLinks>(null);
  const mobileAppSection = useRef<HTMLDivElement | null>(null);

  const fetchSocials = async () => {
    const resp = await getSocials();
    if (resp?.data) {
      const { playstore, appstore, appgallery } = resp?.data?.attributes;

      setStoreLinks({
        playstore,
        appstore,
        appgallery,
      });
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  useEffect(() => {
    console.log(mobileAppSection.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mobileAppSection.current,
        start: "top top",
        // markers: true,
        // scrub: true,
        toggleActions: "play none none none",
      },
    });
    tl.from(".floating-mobile", {
      opacity: 0,
      x: -200,
      y: 200,
      scale: 0,
      duration: 0.5,
    }),
      // tl.to(".link", {
      //   opacity: 1,
      //   x: 0,
      //   // scale: 1,
      //   duration: 0.5,
      //   stagger: 0.2,
      //   ease: "circ.out",
      // }),
      tl.to(".download-text", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "circ.out",
      });
  }, []);

  return (
    <div
      ref={mobileAppSection}
      data-mobile-app
      className="pt-20 pb-10 md:pt-16 md:pb-4"
    >
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-0">
        <div className="sm:w-1/2 ">
          <Image
            src={FloatingMobile}
            width={470}
            height={470}
            alt="floating-mobile"
            className="floating-mobile mx-auto"
          />
        </div>
        <div className="sm:w-1/2 flex flex-col justify-center sm:items-start lg:px-14">
          <div className="order-1 mt-5 flex flex-col items-center gap-3 sm:mt-0 sm:order-none">
            <Link
              href={storeLinks?.playstore || "#"}
              target={storeLinks?.playstore ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="link relative -translate-x-16 opacity-1 bg-black rounded-xl inline-flex items-center justify-center w-full h-[88px] sm:w-[300px] md:w-[350px] lg:w-[394px] transition-all duration-300 hover:scale-[1.015]"
            >
              <Image src={GooglePlayIcon} fill alt="play-store-link" />
            </Link>

            <Link
              href={storeLinks?.appstore || "#"}
              target={storeLinks?.appstore ? "_blank" : "_self"}
              className="link relative -translate-x-16 opacity-1 bg-black rounded-xl inline-flex items-center justify-center w-full h-[88px] sm:w-[300px] md:w-[350px] lg:w-[394px] transition-all duration-300 hover:scale-[1.015]"
            >
              <Image src={AppStoreIcon} fill alt="app-store-link" />
            </Link>

            <Link
              href={storeLinks?.appgallery || "#"}
              target={storeLinks?.appgallery ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="link relative -translate-x-16  opacity-1 bg-black rounded-xl inline-flex items-center justify-center w-full h-[88px] sm:w-[300px] md:w-[350px] lg:w-[394px] transition-all duration-300 hover:scale-[1.015]"
            >
              <Image src={AppGalleryIcon} fill alt="app-gallery-link" />
            </Link>
          </div>

          <div className="download-text order-0 opacity-0 -translate-y-[60%] sm:order-none sm:max-w-[450px]">
            <p className="text-center text-2xl font-metropolis-semibold leading-tight text-nk-black sm:font-metropolis sm:text-left lg:text-4xl sm:mt-10">
              Download
              <span className="font-metropolis-bold"> NK Associates </span>
              App Today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NkApp;
