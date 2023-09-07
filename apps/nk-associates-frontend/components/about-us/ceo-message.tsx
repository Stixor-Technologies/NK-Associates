"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface CeoMessageProps {
  ceoMessage: string;
  ceoImage: string;
  ceoName: string;
}

const CeoMessage: React.FC<CeoMessageProps> = ({
  ceoMessage,
  ceoImage,
  ceoName,
}) => {
  const ceoRef = useRef(null);
  const textRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const el1 = ceoRef.current;
    const el2 = textRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "ceo-message-trigger",
        trigger: startRef.current,
        start: "50% 90%",
        end: "center 50%",
      },
    });
    tl.from(el2, {
      x: 1000,
      duration: 0.8,
    }).from(el1, { x: -1000, duration: 0.8 }, "<");

    return () => {
      ScrollTrigger.getById("ceo-message-trigger")?.kill();
    };
  }, []);

  return (
    <div
      ref={startRef}
      className="overflow-x-clip flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:relative lg:mb-[16.75rem] md:mb-[3.75rem]"
    >
      <div
        className="w-full max-w-[25rem] lg:px-4 pb-[1.313rem] lg:max-w-[39.6rem] 2xl:max-w-[49rem]"
        ref={ceoRef}
      >
        <div className="relative aspect-square h-[100%] w-[100%]">
          <Image
            src={ceoImage}
            alt="Ceo Image"
            fill
            className="rounded-[1.563rem] object-cover"
          />
        </div>
      </div>
      <div
        className="lg:text-left bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two text-nk-white rounded-[1.563rem] 
        px-[2rem] py-[1.063rem] max-w-[25rem] lg:max-w-[39.6rem] 2xl:max-w-[49rem] lg:mb-[3.6rem] lg:absolute lg:right-[47px] lg:bottom-[-270px] 2xl:bottom-[-190px]"
        ref={textRef}
      >
        <div className="font-metropolis-bold text-[2rem] pb-[0.625rem] lg:text-[2.955rem]">
          CEO&apos;s Message
        </div>
        <div className="text-[0.813rem] pb-[0.625rem] lg:text-[1.375rem]">
          {ceoMessage}
        </div>
        <div className="uppercase text-[1.375rem] font-metropolis-semibold lg:hidden">
          {ceoName}
        </div>
      </div>
    </div>
  );
};

export default CeoMessage;
