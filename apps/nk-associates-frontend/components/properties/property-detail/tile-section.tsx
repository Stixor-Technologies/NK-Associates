"use client";
import React, { FC, useEffect, useRef } from "react";
import Tile from "../../shared/tile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface TileSectionProps {
  category: string;
  area: number;
  area_type: string;
  type: string;
  price: number;
  city: string;
}

const TileSection: FC<TileSectionProps> = ({
  category,
  area,
  area_type,
  type,
  price,
  city,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const divElement = ref.current;
    if (divElement) {
      gsap.from(divElement, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "powe2.out",
        scrollTrigger: {
          id: "property-tile-trigger",
          trigger: divElement,
          start: "top 75%",
        },
      });
    }
    return () => {
      ScrollTrigger.getById("property-tile-trigger")?.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-3 py-8 md:py-10 lg:flex-row lg:gap-1"
    >
      <div className="flex flex-grow gap-1 rounded-xl shadow-3xl lg:rounded-none">
        <Tile
          label="Category"
          value={category}
          className="flex-grow rounded-l-xl"
        />
        <Tile
          label="Coverd Area / Area"
          value={`${area} ${area_type}`}
          className="flex-grow"
        />
        <Tile
          label="Types"
          value={type}
          className="flex-grow rounded-r-xl lg:rounded-r-none"
        />
      </div>
      <div className="mx-auto flex rounded-r-xl w-full max-w-[300px] justify-center gap-1 shadow-3xl sm:max-w-sm md:max-w-md lg:flex-grow">
        <Tile
          label="Price"
          value={`PKR: ${price?.toString()}`}
          className="flex-grow rounded-l-xl lg:rounded-l-none"
        />
        <Tile label="City" value={city} className="flex-grow rounded-r-xl" />
      </div>
    </div>
  );
};

export default TileSection;
