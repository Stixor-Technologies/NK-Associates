"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ceoImage from "./ceoImage.jpeg";

const CeoMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-[5.063rem] md:pt-[11.254rem]">
      <div className="w-full max-w-[25rem] md:px-4 pb-[1.313rem] md:max-w-[39.6rem]">
        <div className="relative aspect-square h-[100%] w-[100%]">
          <Image
            src={ceoImage}
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
          Nazim Khadim CEO Since 2004, Mr. Nazim Khadim, the strategic visionary
          behind NK Associates and Builders Pvt Ltd, has been instrumental in
          catapulting the firm to a leadership position within Pakistan&apos;s
          real estate sector. Mr. Khadim firmly believes in leveraging real
          estate potential to forge robust relationships, nurture lasting
          partnerships, and foster a corporate ethos steeped in trust,
          transparency, and technological innovation. NK Associates and Services
          Our core proficiency lies in the detail-oriented design, exact
          construction, and strategic enhancement of existing real estate
          properties. Our commitment to excellence drives our specialized
          services and integrated approach, resulting in unparalleled service
          and extraordinary value for our valued clients.
        </div>
        <div className="uppercase text-[1.375rem] font-metropolis-semibold md:hidden">
          nazim khadim
        </div>
      </div>
    </div>
  );
};

export default CeoMessage;
