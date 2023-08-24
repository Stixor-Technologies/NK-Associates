"use client";
import React, { useState, useEffect } from "react";
import BannerSlider from "./banner-slider";
import { getBannerImages } from "../../../utils/api-calls";

const HomeBanner = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchImages = async () => {
    setIsLoading(true);
    const resp = await getBannerImages();
    if (resp?.data) {
      console.log(resp);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // fetchImages();
  }, []);

  return (
    <div className="flex">
      <div className="w-[40%]">
        <h3 className="text-[2.875rem] font-metropolis-bold hidden md:block">
          <span>A Proptech Company with A</span>
          <span className=" text-nk-red"> Real Estate License</span>
        </h3>
        <h3 className="text-[2.375rem] text-center font-metropolis-bold text-nk-black md:hidden">
          Discover a place you’ll love to live
        </h3>
        <p className="text-sm text-center font-metropolis-thin text-nk-black md:text-left md:text-base">
          As a trusted partner, we excel in identifying opportunities that
          amplify value and assure long-term triumph. Our industry acumen is
          extensive, matched only by our unwavering commitment to excellence. We
          traverse the dynamic real estate terrain, delivering unmatched
          outcomes. Whether you're an investor, developer, lender, operator, or
          owner, our dedicated team is equipped to guide you through every
          phase, converting opportunities into sustainable, lucrative ventures.
          Experience the unique difference of partnering with us to build
          enduring value.
        </p>
      </div>

      <div className="w-[60%]">
        <BannerSlider />
      </div>
    </div>
  );
};

export default HomeBanner;
