"use client";
import React, { FC, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

interface BaseProps {
  text: string;
  type?: "transparent" | "inverted" | "solid" | "gradient" | "transparentRed";
  className?: string;
}

interface SubmitButton {
  buttonType: "submit";
}

interface ClickButton {
  buttonType?: "button";
  clickEvent: () => void;
}

interface LinkProps extends BaseProps {
  navigateTo: string;
}

type ButtonProps = BaseProps & (SubmitButton | ClickButton);

type Props = LinkProps | ButtonProps;

const LinkButton: FC<Props> = (props) => {
  const { text, type, className } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const tl = gsap.timeline();

  const activeRef =
    "clickEvent" in props || (props as ButtonProps).buttonType === "submit"
      ? buttonRef
      : anchorRef;

  gsap.registerPlugin(CustomEase);

  CustomEase.create(
    "hop",
    `M0,0 C0.17,0 0.286,0.085 0.32,0.115 0.394,0.18 0.498,0.3 0.5,0.5 0.502,0.706 0.58,0.872 0.618,0.908 0.652,0.94 0.794,1 1,1`,
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
      0,
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
      0,
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
      0,
    );

    tl.to(
      activeRef.current.querySelector(".bg-overlay"),
      {
        scaleY: 0,
        duration: 0.5,
        ease: "hop",
      },
      0,
    );
  };

  const typeStyles = {
    transparentRed: "bg-transparent text-nk-red border border-nk-red",
    transparent: "bg-transparent text-nk-gray border border-nk-red",
    inverted: "bg-nk-white text-nk-red",
    solid: "bg-nk-red text-nk-white",
    gradient:
      "bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two text-nk-white",
  };

  const typeOverlayStyles = {
    transparentRed: "bg-nk-red",
    transparent: "bg-nk-red",
    inverted: "bg-nk-background",
    solid: "bg-nk-white",
    gradient: "bg-nk-white",
  };

  const typeOriginalStyles = {
    transparentRed: "text-nk-red",
    transparent: "text-nk-gray",
    inverted: "text-nk-red",
    solid: "text-nk-white",
    gradient: "text-nk-white",
  };

  const typeCopyStyles = {
    transparentRed: "text-nk-white",
    transparent: "text-nk-white",
    inverted: "text-nk-red",
    solid: "text-nk-red",
    gradient: "text-nk-red",
  };

  const classes = `rounded-full relative text-center inline-flex py-2 px-4 items-center justify-center capitalize font-metropolis shadow-3xl
  ${typeStyles[type || "gradient"]} block ${className || ""}`;

  if ("navigateTo" in props) {
    return (
      <Link
        ref={anchorRef}
        onMouseEnter={() => {
          if (window?.innerWidth >= 768) {
            handleMouseEnter();
          }
        }}
        onMouseLeave={() => {
          if (window?.innerWidth >= 768) {
            handleMouseLeave();
          }
        }}
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

  if (
    "clickEvent" in props ||
    (props.buttonType && props.buttonType === "submit")
  ) {
    const handleClick = "clickEvent" in props ? props.clickEvent : undefined;

    return (
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classes}
        onClick={handleClick}
        type={props.buttonType || "button"}
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
};

export default LinkButton;
