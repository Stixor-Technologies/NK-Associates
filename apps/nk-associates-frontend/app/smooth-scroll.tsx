"use client";
import React, { useEffect, useLayoutEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const SmoothScrollContainer = ({ children }: { children: ReactNode }) => {
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  }, []);

  useEffect(() => {
    ScrollSmoother.create({
      smooth: 2,
      normalizeScroll: true,
      effects: true,
    });
  }, []);

  return <div className="pt-[5.5rem]">{children}</div>;
};

export default SmoothScrollContainer;
