"use client";
import React from "react";
import LinkButton from "../../../button/link-button";

const HomeBanner = ({ children }) => {
  return (
    <div className="container flex flex-col gap-6 py-6 md:gap-10 md:py-14 lg:flex-row">
      <div className="flex-none lg:max-w-[28.125rem]">
        <h3 className="text-[2.875rem] text-center font-metropolis-bold hidden leading-tight md:flex md:flex-col mb-6 lg:text-left lg:mb-0">
          <span>A Proptech Company with A</span>
          <span className=" text-nk-red"> Real Estate License</span>
        </h3>
        <h3 className="text-[2.375rem] text-center font-metropolis-bold text-nk-black leading-tight mb-3 md:hidden">
          Discover a place you’ll love to live
        </h3>
        <p className="text-sm text-center font-metropolis-thin text-nk-black md:text-left md:text-base">
          As a trusted partner, we excel in identifying opportunities that
          amplify value and assure long-term triumph. Our industry acumen is
          extensive, matched only by our unwavering commitment to excellence. We
          traverse the dynamic real estate terrain, delivering unmatched
          outcomes. Whether you&apos;re an investor, developer, lender,
          operator, or owner, our dedicated team is equipped to guide you
          through every phase, converting opportunities into sustainable,
          lucrative ventures. Experience the unique difference of partnering
          with us to build enduring value.
        </p>
      </div>

      <div className="flex-grow -mr-[10px] flex flex-col justify-center">
        <div className="overflow-hidden">{children}</div>
      </div>

      <div className="flex gap-4 justify-center mt-5 md:hidden">
        <LinkButton
          type="solid"
          text="search"
          clickEvent={() => {
            console.log("clicked");
          }}
          className="flex-1 py-2.5"
        />

        <LinkButton
          type="transparentRed"
          text="get in touch"
          navigateTo="/contact"
          className="flex-1 py-2.5"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
