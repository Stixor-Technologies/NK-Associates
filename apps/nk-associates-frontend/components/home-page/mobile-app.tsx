"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getSocials } from "../../utils/api-calls";
import FloatingMobile from "../../public/assets/images/floating-mobile.png";
import GooglePlayIcon from "../../public/assets/icons/play-store-home.svg";
import AppStoreIcon from "../../public/assets/icons/app-store-home.svg";
import AppGalleryIcon from "../../public/assets/icons/app-gallery-home.svg";
import Link from "next/link";

type StoreLinks = {
  playstore: string;
  appstore: string;
  appgallery: string;
};

const NkApp = () => {
  const [storeLinks, setStoreLinks] = useState<StoreLinks>(null);

  const fetchSocials = async () => {
    const resp = await getSocials();
    if (resp?.data) {
      const { playstore, appstore, appgallery } = resp?.data?.attributes;

      setStoreLinks({
        playstore,
        appstore,
        appgallery,
      });
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  return (
    <div className="container my-20">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-0">
        <div className="sm:w-1/2 ">
          <Image
            src={FloatingMobile}
            width={470}
            height={470}
            alt="floating-mobile"
            className="mx-auto"
          />
        </div>
        <div className="sm:w-1/2 flex flex-col justify-center sm:items-start lg:px-14">
          <div className="order-1 mt-5 flex flex-col items-center gap-3 sm:mt-0 sm:order-none">
            <Link
              href={storeLinks?.playstore || "#"}
              target={storeLinks?.playstore ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="relative bg-black rounded-xl inline-flex items-center justify-center w-full h-[88px] sm:w-[300px] md:w-[350px] lg:w-[394px] transition-all duration-100 hover:scale-[1.01]"
            >
              <Image src={GooglePlayIcon} fill alt="play-store-link" />
            </Link>

            <Link
              href={storeLinks?.appstore || "#"}
              target={storeLinks?.appstore ? "_blank" : "_self"}
              className="relative bg-black rounded-xl inline-flex items-center justify-center w-full h-[88px] sm:w-[300px] md:w-[350px] lg:w-[394px] transition-all duration-100 hover:scale-[1.01]"
            >
              <Image src={AppStoreIcon} fill alt="app-store-link" />
            </Link>

            <Link
              href={storeLinks?.appgallery || "#"}
              target={storeLinks?.appgallery ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="relative bg-black rounded-xl inline-flex items-center justify-center w-full h-[88px] sm:w-[300px] md:w-[350px] lg:w-[394px] transition-all duration-100 hover:scale-[1.01]"
            >
              <Image src={AppGalleryIcon} fill alt="app-gallery-link" />
            </Link>
          </div>

          <div className="order-0 sm:order-none sm:max-w-[450px]">
            <p className="text-center text-2xl font-metropolis-semibold leading-tight text-nk-black sm:font-metropolis sm:text-left lg:text-4xl sm:mt-10">
              Download
              <span className="font-metropolis-bold"> NK Associates </span>
              App Today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NkApp;
