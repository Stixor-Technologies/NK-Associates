import React, { FC, useState, useEffect } from "react";
import { AboutOverview } from "../../../utils/types/types";
import Image from "next/image";
import { BASE_URL } from "../../../utils/constants";
import LinkButton from "../../button/link-button";

interface AboutSummaryProp {
  aboutOverview: AboutOverview;
}

const AboutSummary: FC<AboutSummaryProp> = ({ aboutOverview }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const totalLength = aboutOverview?.about_summary?.length;
  const halfLength = Math.ceil(totalLength / 2);

  const firstHalf = aboutOverview?.about_summary.slice(0, halfLength);
  const secondHalf = aboutOverview?.about_summary.slice(halfLength);

  const breakPoint = 768;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="container py-7 md:pt-12 md:pb-0">
      <div className="flex gap-14">
        <div className="text-center flex gap-14 flex-col md:block md:py-14 md:text-left">
          <div className="order-1 md:order-none">
            <h2 className="text-3xl text-nk-black font-metropolis-semibold md:text-5xl">
              About US
            </h2>
            <p className="text-base text-nk-black font-metropolis-thin leading-tight my-5 md:my-3 md:text-lg">
              {windowSize > breakPoint
                ? firstHalf
                : aboutOverview?.about_summary}
            </p>
            <LinkButton
              text="About Us"
              type="solid"
              navigateTo="#"
              className="w-[14.063rem] h-11 md:hidden"
            />
          </div>
          <Image
            src={`${BASE_URL}${
              aboutOverview?.summary_image1?.data?.attributes?.url || "/"
            }`}
            width={600}
            height={400}
            alt={`${aboutOverview?.summary_image1?.data?.attributes?.name}`}
            className="rounded-2xl mt-10 h-[23.938rem] order-0 md:order-none"
          />
        </div>

        <div className="hidden md:block">
          <Image
            src={`${BASE_URL}${
              aboutOverview?.summary_image2?.data?.attributes?.url || "/"
            }`}
            width={600}
            height={400}
            alt={`${aboutOverview?.summary_image2?.data?.attributes?.name}`}
            className="rounded-2xl md:mb-10 md:h-[23.938rem]"
          />
          <p className="text-base text-nk-black font-metropolis-thin leading-tight md:text-lg">
            {secondHalf}
          </p>

          <LinkButton
            text="About Us"
            type="solid"
            navigateTo="#"
            className=" md:w-44 md:h-12 md:mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSummary;
