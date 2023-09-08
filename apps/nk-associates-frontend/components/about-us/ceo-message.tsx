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
        start: "top 75%",
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
      className="overflow-x-clip grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_250px_1fr_1fr] lg:grid-rows-[300px_300px_1fr] 2xl:grid-rows-[1fr_550px_1fr]"
    >
      <div
        className="w-full lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-end-3 pb-[1.313rem]"
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
        className="text-center lg:col-start-3 lg:col-span-3 lg:row-start-2 lg:row-end-4 lg:my-auto lg:text-left bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two text-nk-white rounded-[1.563rem] 
      px-3 py-[1.063rem] lg:px-10 lg:py-6"
        ref={textRef}
      >
        <div className="font-metropolis-bold text-[2rem] pb-[0.625rem] lg:text-[2.955rem]">
          CEO&apos;s Message
        </div>
        <div className="text-[0.813rem] font-metropolis-thin pb-[0.625rem] lg:text-[1.375rem]">
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
