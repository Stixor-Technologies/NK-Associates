"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LinkButton from "../button/link-button";
import booklet from "../../public/assets/images/booklet.png";
import Image from "next/image";

const Booklet = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "services-overview-trigger",
        trigger: ref.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    tl.from(".text", {
      opacity: 0,
      y: 100,
      duration: 0.5,
    });

    tl.from(".btn", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "linear",
    });

    return () => {
      ScrollTrigger.getById("services-overview-trigger")?.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative mt-4 bg-[url('/assets/images/detail-service-bg.svg')] bg-cover bg-right-top bg-no-repeat py-9 text-center text-nk-white md:mt-0 md:py-20 md:text-left"
    >
      <div className="container relative z-20 mx-auto">
        <div className="flex gap-10">
          <div className="w-1/2">
            <h3 className="text font-metropolis-semibold text-[1.625rem] md:text-4xl">
              NK Associates and Services
            </h3>
            <div className="text py-5 text-base md:font-metropolis-extralight md:text-lg">
              <p className="py-2.5">
                At NK Associates and Services, we excel in the art of real
                estate. Our core expertise lies in the meticulous design,
                precise construction, and strategic enhancement of existing real
                estate properties. We take pride in our remarkable proficiency
                in developing distinctive, ground-up projects that epitomize our
                innovative vision and unwavering commitment to excellence.
              </p>
              <p className="py-2.5">
                With a legacy of integrity and quality, we provide specialized
                services and an integrated approach that ensures unparalleled
                service and exceptional value for our esteemed clients. Our
                dedication to excellence defines us, and our track record speaks
                volumes.
              </p>
              <p className="py-2.5">
                Discover our Corporate Profile 2023 for a detailed insight into
                our journey and vision. Download it here.
              </p>
            </div>
            {/* <p className="text py-5 text-base md:font-metropolis-extralight md:text-lg">
            At NK Associates and Services, we excel in the art of real estate.
            Our core expertise lies in the meticulous design, precise
            construction, and strategic enhancement of existing real estate
            properties. We take pride in our remarkable proficiency in
            developing distinctive, ground-up projects that epitomize our
            innovative vision and unwavering commitment to excellence.
          </p>
          <p className="text py-5 text-base md:font-metropolis-extralight md:text-lg">
            With a legacy of integrity and quality, we provide specialized
            services and an integrated approach that ensures unparalleled
            service and exceptional value for our esteemed clients. Our
            dedication to excellence defines us, and our track record speaks
            volumes.
          </p>
          <p className="text py-5 text-base md:font-metropolis-extralight md:text-lg">
            Discover our Corporate Profile 2023 for a detailed insight into our
            journey and vision. Download it here.
          </p> */}
            <div className="btn">
              <LinkButton
                text="Download Corporate Profile 2023"
                type="inverted"
                navigateTo="/flip-book"
                className="mx-auto mt-3 w-64 h-11 border py-2.5 text-lg hover:border-nk-red hover:shadow-md md:mx-0 md:w-[25rem] md:h-[3.125rem]"
              />
            </div>
          </div>
          <div className="w-1/2">
            <Image
              src={booklet}
              width={870}
              height={670}
              alt="floating-mobile"
              priority={true}
              className="bookl mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-nk-gradient-red-sharp-one to-nk-gradient-red-sharp-two opacity-80" />
    </div>
  );
};

export default Booklet;
