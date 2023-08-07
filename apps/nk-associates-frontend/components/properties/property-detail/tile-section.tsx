"use client";
import React, { FC, useEffect, useRef } from "react";
import Tile from "../../shared/tile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TileSectionProps {
  category: string;
  area: number;
  area_type: string;
  type: string;
  price: string;
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
      // gsap.set(divElement, {opacity: 0,  y: 50 });
      // gsap.to(
      //     divElement,

      //     {
      //       scrollTrigger: {
      //         trigger: divElement,
      //         start: 'top 80%',
      //       },
      //       y: 0,
      //       opacity: 1,
      //       duration: 1,
      //       ease: 'power2.out',
      //     }
      //   );
      gsap.from(divElement, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "powe2.out",
        scrollTrigger: {
          trigger: divElement,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-3 py-8 md:py-10 lg:flex-row lg:gap-1"
    >
      <div className="flex flex-grow gap-1 shadow-3xl">
        <Tile
          label="Category"
          value={category}
          className="flex-grow rounded-l-lg"
        />
        <Tile
          label="Coverd Area / Area"
          value={`${area} ${area_type}`}
          className="flex-grow"
        />
        <Tile
          label="Types"
          value={type}
          className="flex-grow rounded-r-lg lg:rounded-r-none"
        />
      </div>
      <div className="mx-auto flex w-full max-w-[300px] justify-center gap-1 shadow-3xl sm:max-w-sm md:max-w-md lg:flex-grow">
        <Tile
          label="Price"
          value={`PKR: ${price}`}
          className="flex-grow rounded-l-lg lg:rounded-l-none"
        />
        <Tile label="City" value={city} className="flex-grow rounded-r-lg" />
      </div>
    </div>
  );
};

export default TileSection;
