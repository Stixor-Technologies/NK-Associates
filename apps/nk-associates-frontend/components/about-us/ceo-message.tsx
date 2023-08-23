import React, { useEffect, useState } from "react";
import Image from "next/image";
import ceoImage from "./ceoImage.jpeg";
import { About } from "../../utils/types/types";
import { getAbout } from "../../utils/api-calls";
import { BASE_URL } from "../../utils/constants";

const CeoMessage = async () => {
  const aboutInfo: About = await getAbout();

  return (
    <div className="flex flex-col items-center justify-center pt-[5.063rem] md:pt-[11.254rem]">
      <div className="w-full max-w-[25rem] md:px-4 pb-[1.313rem] md:max-w-[39.6rem]">
        <div className="relative aspect-square h-[100%] w-[100%]">
          <Image
            src={`${BASE_URL}${aboutInfo?.data?.attributes?.ceo_image?.data?.attributes?.url}`}
            alt="Ceo Image"
            fill
            className="rounded-[1.563rem]"
          />
        </div>
      </div>
      <div
        className="bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two text-nk-white text-center rounded-[1.563rem] 
        px-[1.188rem] py-[1.063rem] max-w-[25rem] md:max-w-[40.4rem] md:h-[37.9rem] md:mb-[3.6rem]"
      >
        <div className="font-metropolis-bold text-[2rem] pb-[0.625rem] md:text-[2.955rem]">
          CEO&apos;s Message
        </div>
        <div className="text-[0.813rem] pb-[0.625rem] md:text-[1.375rem]">
          {aboutInfo.data.attributes.message}
        </div>
        <div className="uppercase text-[1.375rem] font-metropolis-semibold md:hidden">
          nazim khadim
        </div>
      </div>
    </div>
  );
};

export default CeoMessage;
