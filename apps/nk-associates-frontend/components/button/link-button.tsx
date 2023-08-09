"use client";
import React, { FC, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

interface BaseProps {
  text: string;
  type?: "transparent" | "inverted" | "solid" | "gradient";
  className?: string;
  buttonType?: "submit" | "button";
}

interface LinkProps extends BaseProps {
  navigateTo: string;
}

interface ButtonProps extends BaseProps {
  clickEvent: () => void;
}

type Props = LinkProps | ButtonProps;

const LinkButton: FC<Props> = (props) => {
  const { text, type, buttonType, className } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const tl = gsap.timeline();
  const activeRef = "clickEvent" in props ? buttonRef : anchorRef;

  gsap.registerPlugin(CustomEase);

  CustomEase.create(
    "hop",
    `M0,0 C0.17,0 0.286,0.085 0.32,0.115 0.394,0.18 0.498,0.3 0.5,0.5 0.502,0.706 0.58,0.872 0.618,0.908 0.652,0.94 0.794,1 1,1`
  );
  const handleMouseEnter = () => {
    tl.clear();
    tl.to(activeRef.current.querySelector(".text-original"), {
      y: "200%",
      rotateX: 180,
      duration: 0.3,
      ease: "hop",
    });

    tl.to(
      activeRef.current.querySelector(".bg-overlay"),
      {
        scaleY: 1,
        transformOrigin: "50% 100%",
        duration: 0.5,
        ease: "hop",
      },
      0
    );

    tl.fromTo(
      activeRef.current.querySelector(".text-copy"),
      {
        rotateX: 180,
      },
      {
        y: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "hop",
      },
      0
    );
  };

  const handleMouseLeave = () => {
    tl.clear();

    tl.to(activeRef.current.querySelector(".text-original"), {
      y: 0,
      duration: 0.5,
      rotateX: 0,
      ease: "hop",
    });

    tl.to(
      activeRef.current.querySelector(".text-copy"),
      {
        y: "-200%",
        rotateX: 180,
        duration: 0.5,
        ease: "hop",
      },
      0
    );

    tl.to(
      activeRef.current.querySelector(".bg-overlay"),
      {
        scaleY: 0,
        duration: 0.5,
        ease: "hop",
      },
      0
    );
  };

  const typeStyles = {
    transparent: "bg-transparent text-nk-gray border border-nk-red",
    inverted: "bg-nk-white text-nk-red",
    solid: "bg-nk-red text-nk-white",
    gradient:
      "bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two text-nk-white",
  };

  const typeOverlayStyles = {
    transparent: "bg-nk-red",
    inverted: "bg-nk-background",
    solid: "bg-nk-white",
    gradient: "bg-nk-white",
  };

  const typeOriginalStyles = {
    transparent: "text-nk-gray",
    inverted: "text-nk-red",
    solid: "text-nk-white",
    gradient: "text-nk-white",
  };

  const typeCopyStyles = {
    transparent: "text-nk-white",
    inverted: "text-nk-red",
    solid: "text-nk-red",
    gradient: "text-nk-red",
  };

  const classes = `rounded-full relative text-center relative inline-flex h-12 w-48 items-center justify-center capitalize font-metropolis shadow-3xl
  ${typeStyles[type || "gradient"]}  block ${className || ""}`;

  if ("clickEvent" in props) {
    return (
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes}
        onClick={props.clickEvent}
        type={buttonType || "button"}
      >
        <span className="absolute -left-[1px] bottom-0 right-0 top-0 h-full w-[calc(100%+2px)] overflow-hidden rounded-full">
          <span
            className={`bg-overlay absolute bottom-0 left-0 z-10 h-full w-full scale-y-0 ${
              typeOverlayStyles[type || "gradient"]
            }`}
          ></span>
        </span>

        <span className="relative inline-flex h-full w-full items-center overflow-hidden">
          <span
            className={`text-original relative w-full text-center ${
              typeOriginalStyles[type || "gradient"]
            }`}
          >
            {text}
          </span>

          <span
            className={`text-copy rotate-x-180 absolute z-20 w-full -translate-y-[200%] text-center ${
              typeCopyStyles[type || "gradient"]
            }`}
          >
            {text}
          </span>
        </span>
      </button>
    );
  }

  if ("navigateTo" in props) {
    return (
      <Link
        ref={anchorRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes}
        href={props.navigateTo}
      >
        <span className="absolute -left-[1px] bottom-0 right-0 top-0 h-full w-[calc(100%+2px)] overflow-hidden rounded-full">
          <span
            className={`bg-overlay absolute bottom-0 left-0 z-10 h-full w-full scale-y-0 ${
              typeOverlayStyles[type || "gradient"]
            }`}
          ></span>
        </span>

        <span className="relative inline-flex h-full w-full items-center overflow-hidden">
          <span
            className={`text-original relative w-full text-center ${
              typeOriginalStyles[type || "gradient"]
            }`}
          >
            {text}
          </span>

          <span
            className={`text-copy rotate-x-180 absolute z-20 w-full -translate-y-[200%] text-center ${
              typeCopyStyles[type || "gradient"]
            }`}
          >
            {text}
          </span>
        </span>
      </Link>
    );
  }
};

export default LinkButton;
