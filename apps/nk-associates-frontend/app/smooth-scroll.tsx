"use client";
import React, { useEffect, useLayoutEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const SmoothScrollContainer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    // will be used later

    // const smootherInstance = ScrollSmoother.create({
    //   smooth: 2,
    //   normalizeScroll: true,
    //   effects: true,
    // });

    const excludedPaths = [
      "/properties",
      /^\/properties\/\d+$/,
      /^\/projects\/\d+$/,
    ];

    if (
      excludedPaths.some((path) =>
        typeof path === "string" ? pathname === path : path.test(pathname),
      )
    ) {
      // smootherInstance.kill();
    }

    return () => {
      // smootherInstance.kill();
    };
  }, [pathname]);

  return (
    <div className="pt-[5.5rem]">
      {children}
      <div className="follower">
        <div className="follower__inner__bottom"></div>
        <div className="follower__inner__top"></div>
        <span className="follower__content"></span>
      </div>
    </div>
  );
};

export default SmoothScrollContainer;
