"use client";
import React, { FC, useRef, useEffect } from "react";
import PropertyCard from "../properties/property-card";
import { Property } from "../../utils/types/types";
import LinkButton from "../button/link-button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface FeaturedPropertyProps {
  featuredProperties: Property[];
}

const FeaturedProperties: FC<FeaturedPropertyProps> = ({
  featuredProperties,
}) => {
  const featuredPropertiesSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (featuredProperties?.length > 0) {
      gsap.set(".property-image", { scale: 1 });
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "featured-properties-trigger",
          trigger: featuredPropertiesSection.current,
          start: "top 80%",
        },
      });
      tl.from(".property-image", {
        scale: 2.5,
        duration: 0.7,
        stagger: 0.3,
      });
    }
    return () => {
      ScrollTrigger.getById("featured-properties-trigger")?.kill();
    };
  }, [featuredProperties]);

  return (
    <>
      {featuredProperties?.length > 0 && (
        <div
          ref={featuredPropertiesSection}
          className="md:container py-10 md:py-16"
        >
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold mb-7 md:mb-9 md:text-4xl xl:px-0">
            Featured Properties
          </h6>

          <div className="flex flex-col overflow-y-hidden">
            <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:px-0 xl:px-0">
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
