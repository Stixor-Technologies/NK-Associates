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
  name: string;
  link: string;
};

const NkApp = () => {
  const [storeLinks, setStoreLinks] = useState<StoreLinks[]>(null);
  const mobileAppSection = useRef<HTMLDivElement | null>(null);

  const fetchSocials = async () => {
    const resp = await getSocials();
    if (resp?.data) {
      const { playstore, appstore, appgallery } = resp?.data?.attributes;
      const storeLinksArray = [
        {
          name: "google-play-home",
          link: playstore,
        },
        {
          name: "app-store-home",
          link: appstore,
        },
        {
          name: "app-gallery-home",
          link: appgallery,
        },
      ];

      setStoreLinks(storeLinksArray);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  useLayoutEffect(() => {
    if (storeLinks?.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileAppSection.current,
          start: "top 25%",
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
        tl.to(
          ".link",
          {
            opacity: 1,
            // x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.5,
            // ease: "circ.out",
          },
          "<0.1",
        ),
        tl.to(".download-text", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "circ.out",
          delay: 0.5,
        });
    }
  }, [storeLinks]);

  return (
    <div
      ref={mobileAppSection}
      data-mobile-app
      className="container pt-20 pb-10 md:pt-16 md:pb-4"
    >
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-0">
        <div className="sm:w-1/2 ">
          <Image
            src={FloatingMobile}
            width={470}
            height={470}
            alt="floating-mobile"
            priority={true}
            className="floating-mobile mx-auto"
          />
        </div>
        <div className="sm:w-1/2 flex flex-col justify-center sm:items-start lg:px-14">
          <div className="order-1 mt-5 flex flex-col items-center gap-3 sm:mt-0 sm:order-none">
            {storeLinks?.map((store, index) => (
              <Link
                key={index}
                href={store?.link || "#"}
                target={store?.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="link relative scale-0 opacity-0 bg-black rounded-xl inline-flex items-center justify-center w-full h-[5.5rem] sm:w-[18.75rem] md:w-[21.875rem] lg:w-[24.625rem] transition-all duration-300 hover:!scale-[1.015]"
              >
                <Image
                  src={`/assets/images/${store?.name}.svg`}
                  width={300}
                  height={200}
                  alt={`${store.name}`}
                  className=" object-contain"
                />
              </Link>
            ))}
          </div>

          <div className="download-text order-0 opacity-0 -translate-y-[60%] sm:order-none sm:max-w-[28.125rem]">
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
