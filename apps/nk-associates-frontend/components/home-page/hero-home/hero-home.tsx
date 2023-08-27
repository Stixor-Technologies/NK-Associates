"use client";
import React, { useState, useEffect } from "react";
import { getHeroInfo } from "../../../utils/api-calls";
import HomeBanner from "./hero-banner/hero-banner";
import CustomSlider from "./hero-banner/custom-slider";
import AboutSummary from "./about-summary";
import Spinner from "../../spinner";
import { MediaAttributes } from "../../../utils/types/types";
import { AboutOverview } from "../../../utils/types/types";

const HeroSection = () => {
  const [aboutOverview, setAboutOverview] = useState<AboutOverview>(null);
  const [bannerImages, setBannerImages] = useState<MediaAttributes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchHeroInfo = async () => {
    setIsLoading(true);
    const resp = await getHeroInfo();
    if (resp?.data) {
      setBannerImages(resp?.data?.attributes?.banner_images?.data);
      const { about_summary, summary_image1, summary_image2 } =
        resp?.data?.attributes;

      setAboutOverview({
        about_summary,
        summary_image1,
        summary_image2,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHeroInfo();
  }, []);

  return (
    <div className="min-h-[78.188rem] h-full">
      {isLoading && bannerImages.length === 0 && !aboutOverview ? (
        <div className="min-h-[50vh] flex flex-1">
          <Spinner />
        </div>
      ) : !isLoading && bannerImages.length > 0 && aboutOverview ? (
        <>
          <HomeBanner>
            <CustomSlider banner_images={bannerImages} />
          </HomeBanner>
          <AboutSummary aboutOverview={aboutOverview} />
        </>
      ) : null}
    </div>
  );
};

export default HeroSection;
