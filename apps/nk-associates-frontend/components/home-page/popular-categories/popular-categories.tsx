"use client";
import React, { FC, useState, useEffect, useRef, useLayoutEffect } from "react";
import CategoryCard from "./category-card";
import { PopularCategory } from "../../../utils/types/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PopularCategoriesProps {
  popularCategories: PopularCategory[];
}

const PopularCategories: FC<PopularCategoriesProps> = ({
  popularCategories,
}) => {
  const popularSection = useRef<HTMLDivElement | null>(null);
  const [windowSize, setWindowSize] = useState<number>(0);
  const breakPoint = 640;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (popularCategories?.length > 0) {
      ScrollTrigger.getById("webCategoriesTrigger")?.kill();
      const allTriggers = ScrollTrigger.getAll();

      allTriggers.forEach((trigger) => {
        if (trigger.vars.id === "mobileCategoriesTrigger") {
          trigger.kill();
        }
      });

      const categoryCard: HTMLDivElement[] =
        gsap.utils.toArray(".category-card");

      gsap.set(".category-image", { scale: 1 });
      gsap.set(".category-name", { x: 0 });
      if (windowSize >= breakPoint) {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "webCategoriesTrigger",
            trigger: popularSection.current,
            start: "top 25%",
            toggleActions: "play none none none",
          },
        });

        tl.from(".category-image", {
          scale: 1.5,
          duration: 0.7,
          stagger: 0.4,
        });

        tl.from(
          ".category-name",
          {
            x: "100%",
            duration: 1,
            stagger: 0.5,
            ease: "bounce.out",
          },
          "<",
        );
      } else {
        categoryCard.forEach((card, index) => {
          const imageElement = card.querySelector(".category-image");
          const textElement = card.querySelector(".category-name");
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "mobileCategoriesTrigger",
              trigger: card,
              start: "top center",
              end: "bottom",
            },
          });
          tl.from(imageElement, {
            scale: 1.5,
            duration: 0.7,
          }).from(
            textElement,
            {
              x: "100%",
              duration: 1,
              ease: "bounce.out",
            },
            "<0.1",
          );
        });
      }
    }
  }, [popularCategories, windowSize]);

  return (
    <>
      {popularCategories.length > 0 && (
        <div ref={popularSection} className="container py-10 md:py-12">
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold mb-7 md:mb-9 md:text-4xl">
            Popular Categories
          </h6>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-6 lg:grid-cols-3">
            {popularCategories?.map(
              (category: PopularCategory, index: number) => (
                <CategoryCard key={index} category={category} />
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularCategories;
