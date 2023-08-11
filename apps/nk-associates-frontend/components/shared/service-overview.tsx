"use client";
import React, { useEffect, useRef } from "react";
import LinkButton from "../button/link-button";
import { gsap } from "gsap";

const ServicesOverview = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      tl.from(".text", {
        opacity: 0,
        x: -200,
        y: 200,
        scale: 0,
        duration: 0.5
      }),
        tl.from(".btn", {
          opacity: 0,
          xPercent: -60,
          scale: 0,
          stagger: 0.2,
          ease: "circ.out"
        });
    }, ref);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative mt-4 bg-[url('/assets/images/detail-service-bg.svg')] bg-cover bg-right-top bg-no-repeat py-9 text-center text-nk-white md:mt-0 md:py-20 md:text-left"
    >
      <div className="container relative z-20 mx-auto">
        <div className="max-w-4xl">
          <h3 className="text font-metropolis-semibold text-[1.625rem] md:text-4xl">
            NK Associates Services
          </h3>
          <p className="text py-5 text-base md:font-metropolis-extralight md:text-lg">
            Our core expertise lies in the meticulous design, precise
            construction, and strategic enhancement of existing real estate
            properties. We possess a remarkable proficiency in developing
            unique, ground-up projects that showcase our innovative vision and
            unwavering dedication to quality. We are committed to excellence
            driving our specialized services and integrated approach, resulting
            in unparalleled service and exceptional value for our esteemed
            clients.
          </p>
          <div className="btn">
            <LinkButton
              text="Explore all"
              type="inverted"
              navigateTo="#"
              className="mx-auto mt-3 w-64 h-11 border py-2.5 text-lg hover:border-nk-red hover:shadow-md md:mx-0 md:w-[25rem] md:h-[3.125rem]"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-nk-gradient-red-sharp-one to-nk-gradient-red-sharp-two opacity-80" />
    </div>
  );
};

export default ServicesOverview;
