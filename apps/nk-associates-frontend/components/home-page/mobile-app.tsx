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
      console.log(playstore);

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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
        <div className="sm:w-1/2 ">
          <Image
            src={FloatingMobile}
            width={400}
            height={400}
            alt="floating-mobile"
            className="mx-auto"
          />
        </div>
        <div className="sm:w-1/2 flex flex-col justify-center sm:items-start lg:px-14">
          <div className="order-1 mt-5 flex flex-col items-center gap-2.5 sm:mt-0 sm:order-none">
            <Link
              href={storeLinks?.playstore || "#"}
              target={storeLinks?.playstore ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="bg-black rounded-lg inline-flex items-center justify-center w-full h-[70px] sm:w-[300px] md:w-[340px]"
            >
              <Image src={GooglePlayIcon} width={240} height={140} alt="app" />
            </Link>

            <Link
              href={storeLinks?.appstore || "#"}
              target={storeLinks?.appstore ? "_blank" : "_self"}
              className="bg-black rounded-lg inline-flex items-center justify-center w-full h-[70px] sm:w-[300px] md:w-[340px]"
            >
              <Image src={AppStoreIcon} width={240} height={140} alt="app" />
            </Link>

            <Link
              href={storeLinks?.appgallery || "#"}
              target={storeLinks?.appgallery ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="bg-black rounded-lg inline-flex items-center justify-center w-full h-[70px] sm:w-[300px] md:w-[340px]"
            >
              <Image src={AppGalleryIcon} width={240} height={140} alt="app" />
            </Link>
          </div>

          <div className="order-0 sm:order-none sm:max-w-[450px]">
            <p className="text-center text-2xl font-metropolis-semibold leading-tight text-nk-black sm:font-metropolis sm:text-left md:text-4xl sm:mt-7">
              Download NK Associates App Today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NkApp;
