"use client";
import React, { FC, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingMobile from "../../public/assets/images/floating-mobile.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type StoreLinks = {
  name: string;
  link: string;
};

interface NKAppProps {
  storeLinks: StoreLinks[];
}

const NkApp: FC<NKAppProps> = ({ storeLinks }) => {
  const mobileAppSection = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (storeLinks?.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "home-mobileapp-trigger",
          trigger: mobileAppSection.current,
          start: "top 35%",
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
        tl.from(
          ".link",
          {
            opacity: 0,
            x: -250,
            scale: 0,
            duration: 0.5,
            stagger: 0.2,
          },
          "<0.3",
        );
      tl.from(".download-text", {
        opacity: 0,
        y: -60,
        duration: 0.6,
      });
    }
    return () => {
      ScrollTrigger.getById("home-mobileapp-trigger")?.kill();
    };
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
              <div key={index} className="link w-full">
                <Link
                  href={store?.link || "#"}
                  target={store?.link ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="relative bg-black rounded-xl inline-flex items-center justify-center w-full h-[5.5rem] sm:w-[18.75rem] md:w-[21.875rem] lg:w-[24.625rem] transition-all duration-300 hover:!scale-[1.015]"
                >
                  <Image
                    src={`/assets/icons/${store?.name}.svg`}
                    width={300}
                    height={200}
                    alt={`${store.name}`}
                    className=" object-contain"
                  />
                </Link>
              </div>
            ))}
          </div>

          <div className="download-text order-0 sm:order-none sm:max-w-[28.125rem]">
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
