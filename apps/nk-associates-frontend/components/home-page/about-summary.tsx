"use client";
import React, { FC, useState, useEffect } from "react";
import { MediaAttributes } from "../../utils/types/types";
import Image from "next/image";
import { BASE_URL } from "../../utils/constants";
import LinkButton from "../button/link-button";

interface AboutSummaryProp {
  about_summary: string;
  summary_image1: {
    data: MediaAttributes;
  };
  summary_image2: {
    data: MediaAttributes;
  };
}

const AboutSummary: FC<AboutSummaryProp> = ({
  about_summary,
  summary_image1,
  summary_image2,
}) => {
  const [windowSize, setWindowSize] = useState<number>(0);

  const totalLength = about_summary?.length;
  const halfLength = Math.ceil(totalLength / 2);

  const firstHalf = about_summary?.slice(0, halfLength);
  const secondHalf = about_summary?.slice(halfLength);

  const breakPoint = 768;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {about_summary &&
        summary_image1?.data?.attributes?.url &&
        summary_image2?.data?.attributes?.url && (
          <div className="container py-7 md:pt-12 md:pb-0">
            <div className="flex gap-14">
              <div className="text-center flex gap-14 flex-col items-center md:block md:py-14 md:text-left">
                <div className="order-1 md:order-none">
                  <h2 className="text-3xl text-nk-black font-metropolis-semibold md:text-5xl">
                    About Us
                  </h2>
                  <p className="text-base text-nk-black font-metropolis-thin leading-tight my-5 md:my-3 md:text-lg">
                    {windowSize > breakPoint ? firstHalf : about_summary}
                  </p>
                  <LinkButton
                    text="About Us"
                    type="solid"
                    navigateTo="/about-us"
                    className="w-[14.063rem] h-11 md:hidden"
                  />
                </div>
                <Image
                  src={`${BASE_URL}${
                    summary_image1?.data?.attributes?.url || "/"
                  }`}
                  width={600}
                  height={400}
                  alt={`${summary_image1?.data?.attributes?.name}`}
                  className="rounded-2xl mt-10 md:h-[23.938rem] order-0 md:order-none object-cover"
                />
              </div>

              <div className="hidden md:block">
                <Image
                  src={`${BASE_URL}${
                    summary_image2?.data?.attributes?.url || "/"
                  }`}
                  width={600}
                  height={400}
                  alt={`${summary_image2?.data?.attributes?.name}`}
                  className="rounded-2xl md:mb-10 md:h-[23.938rem] object-cover"
                />
                <p className="text-base text-nk-black font-metropolis-thin leading-tight md:text-lg">
                  {secondHalf}
                </p>

                <LinkButton
                  text="About Us"
                  type="solid"
                  navigateTo="/about-us"
                  className=" md:w-44 md:h-12 md:mt-8"
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default AboutSummary;
