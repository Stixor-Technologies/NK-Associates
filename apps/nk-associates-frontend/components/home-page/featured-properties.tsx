"use client";
import React, { FC, useState, useEffect, useRef, useLayoutEffect } from "react";
import Spinner from "../spinner";
import PropertyCard from "../properties/property-card";
import { Property } from "../../utils/types/types";
import { getFeaturedProperties } from "../../utils/api-calls";
import LinkButton from "../button/link-button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedPropertyProps {
  featuredProperties: Property[];
}

const FeaturedProperties: FC<FeaturedPropertyProps> = ({
  featuredProperties,
}) => {
  const featuredPropertiesSection = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (featuredProperties?.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featuredPropertiesSection.current,
          start: "top center",
          toggleActions: "play none none none",
        },
      });
      tl.from(".property-card", {
        y: 80,
        duration: 0.7,
        stagger: 0.2,
      });
    }
  }, [featuredProperties]);

  return (
    <>
      {featuredProperties?.length > 0 && (
        <div
          ref={featuredPropertiesSection}
          className="xl:container py-10 md:py-16"
        >
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold mb-7 md:mb-9 md:text-4xl xl:px-0">
            Featured Properties
          </h6>

          <div className="flex flex-col">
            <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 gap-6 md:px-8 xl:px-0">
              {featuredProperties?.map((property: Property, index: number) => (
                <PropertyCard key={index} property={property} actFeatured />
              ))}
            </div>

            <LinkButton
              text="Explore all"
              type="gradient"
              navigateTo="/properties"
              className="self-center w-64 h-11 text-lg mt-12 md:mx-0 md:w-[25rem] md:h-[3.125rem]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProperties;
