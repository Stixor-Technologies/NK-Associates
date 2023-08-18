import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/icons/nk-logo.svg";
import GooglePlayIcon from "../../public/assets/icons/google-play.svg";
import AppStoreIcon from "../../public/assets/icons/app-store.svg";
import FbIcon from "../../public/assets/icons/facebook-icon.svg";
import TwitterIcon from "../../public/assets/icons/twitter-icon.svg";
import InstagramIcon from "../../public/assets/icons/instagram-icon.svg";
import LinkedinIcon from "../../public/assets/icons/linkedIn-icon.svg";
import SnapIcon from "../../public/assets/icons/snapchat-icon.svg";
import YtIcon from "../../public/assets/icons/youtube-icon.svg";
import AppGalleryIcon from "../../public/assets/icons/app-gallery.svg";
import { getSocials } from "../../utils/api-calls";
import { socials } from "../../utils/types/types";

async function fetchSocialLinks() {
  try {
    const response = await getSocials();
    return response?.data;
  } catch (error) {
    console.error("Error fetching social links:", error);
    throw error;
  }
}

async function Footer() {
  const data: socials = await fetchSocialLinks();
  let twitter,
    facebook,
    youtube,
    linkedin,
    snapchat,
    instagram,
    playstore,
    appstore,
    appgallery;

  if (data && data[0].attributes) {
    ({
      twitter,
      facebook,
      youtube,
      linkedin,
      snapchat,
      instagram,
      playstore,
      appstore,
      appgallery,
    } = data[0].attributes);
  }
  interface footerSocialLink {
    pathName: string;
    image;
  }
  interface footerPageLink {
    pathName: string;
    label: string;
  }

  const footerPageLinks: footerPageLink[] = [
    { pathName: "#", label: "Home" },
    { pathName: "#", label: "About" },
    { pathName: "/properties", label: "Property" },
    { pathName: "/projects", label: "Projects" },
    { pathName: "/contact", label: "Contact Us" },
    { pathName: "/careers", label: "Career" },
    { pathName: "/events", label: "Events" },
    { pathName: "/services", label: "Services" },
  ];

  const footerSocialLinks: footerSocialLink[] = [
    { pathName: facebook, image: FbIcon },
    { pathName: twitter, image: TwitterIcon },
    { pathName: instagram, image: InstagramIcon },
    { pathName: linkedin, image: LinkedinIcon },
    { pathName: snapchat, image: SnapIcon },
    { pathName: youtube, image: YtIcon },
  ];

  const generateFooterPageList = (links, startIndex = 0, endIndex = 8) => {
    const slicedLinks =
      endIndex !== undefined
        ? links.slice(startIndex, endIndex)
        : links.slice(startIndex);

    const footerPageList = slicedLinks.map((pageLink, index) => (
      <li
        key={`${index}-${pageLink.pathName}`}
        className="md:mb-2 md:mt-0 mt-6 mb-1"
      >
        <Link
          href={`${pageLink.pathName}`}
          className="inline-block bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]"
        >
          {pageLink.label}
        </Link>
      </li>
    ));
    return footerPageList;
  };

  const PageColumnA = generateFooterPageList(footerPageLinks, 0, 5);
  const PageColumnB = generateFooterPageList(footerPageLinks, 5);
  const footerSocialList = footerSocialLinks.map((socialLink, index) => {
    return (
      socialLink?.pathName && (
        <div
          key={index}
          className="my-2 mr-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75"
        >
          <Link
            href={`${socialLink?.pathName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={socialLink.image}
              width={20}
              height={30}
              alt="Facebook"
            />
          </Link>
        </div>
      )
    );
  });

  return (
    <footer className="z-10 relative min-h-fit bg-nk-dark-gray font-metropolis text-nk-white">
      <div className="mx-auto py-6 pb-2 md:py-4 md:pt-12">
        <div className="mx-5 sm:mx-10 md:mx-auto">
          <div className="md:flex md:justify-between">
            <div className="mb-2 md:mb-0 md:flex md:items-start md:justify-center md:px-12 lg:px-20 xl:px-24">
              <Link href="#" className="flex w-24 pb-4 md:w-32 lg:m-1">
                <Image src={Logo} alt="logo" />
              </Link>
            </div>
            <div className="grid w-full grid-cols-2 sm:m-1 sm:gap-8 md:flex md:gap-6 lg:gap-12 lg:px-12 xl:px-28 2xl:px-36">
              <div className="w-[15] text-lg">
                <h2 className="mb-2 w-1/6 font-metropolis-bold text-base uppercase tracking-[0.2rem] text-nk-white md:font-metropolis-medium">
                  company
                </h2>
                <ul>{PageColumnA}</ul>
              </div>
              <div className="sm:pt-0 md:w-1/4">
                <h2 className="mb-2 font-metropolis-bold text-base uppercase tracking-[0.2rem] text-nk-white md:font-metropolis-medium">
                  ‎
                </h2>
                <ul className="text-lg">{PageColumnB}</ul>
                <div className="md:hidden">
                  <div className="flex flex-wrap">{footerSocialList}</div>
                </div>
              </div>
              <div className="hidden font-metropolis-medium text-base md:block md:w-1/5">
                <h2 className="mb-3 text-base uppercase tracking-[0.2rem] text-nk-white">
                  download
                </h2>
                <div>
                  <ul>
                    <li className="mb-5">
                      <div className="flex  h-10 items-center justify-center rounded-md bg-nk-red transition-all duration-300 hover:bg-opacity-75 lg:w-[90] lg:max-h-12 max-w-[11rem]">
                        <Link href={playstore || "#"}>
                          <Image
                            src={GooglePlayIcon}
                            alt="Google Play"
                            className="p-3"
                          />
                        </Link>
                      </div>
                    </li>
                    <li className="mb-3">
                      <div className="flex h-10 items-center justify-center rounded-md bg-nk-red transition-all duration-300 hover:bg-opacity-75 lg:w-[90] lg:max-h-12 max-w-[11rem]">
                        <Link href={appstore || "#"}>
                          <Image
                            src={AppStoreIcon}
                            alt="App Store"
                            className="p-3"
                          />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hidden w-1/4 md:block">
                {data && data[0].attributes ? (
                  <h2 className="mb-1 text-base uppercase tracking-[0.2rem] text-nk-white md:font-metropolis-medium">
                    social
                  </h2>
                ) : (
                  <div></div>
                )}
                <div className="flex flex-wrap">{footerSocialList}</div>
              </div>
            </div>
            {/* Responsive mobile view elements here */}
            <div className="md:hidden">
              <div className="text-base">
                <h2 className="m-4 flex justify-center font-metropolis-medium text-sm uppercase tracking-[0.2rem] text-nk-white	">
                  download
                </h2>
                <div className="flex justify-center">
                  <div className="mx-2 flex h-12 w-40 items-center justify-center rounded-md bg-nk-red object-cover p-2 transition-all duration-500 hover:opacity-80 lg:w-44">
                    <Link href={playstore || "#"}>
                      <Image src={GooglePlayIcon} alt="Google Play" />
                    </Link>
                  </div>
                  <div className="mx-2 flex h-12 w-40 items-center justify-center rounded-md bg-nk-red object-cover p-2 transition-all duration-300 hover:bg-opacity-75 lg:w-44">
                    <Link href={appstore || "#"} className="mx-2">
                      <Image src={AppStoreIcon} alt="App Store" />
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="m-4 flex h-12 w-40 items-center justify-center rounded-md bg-nk-red object-cover p-2 transition-all duration-300 hover:bg-opacity-75 lg:w-44">
                    <Link href={appgallery || "#"}>
                      <Image src={AppGalleryIcon} alt="App Gallery" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-nk-white sm:mx-auto " />
      <div className="container font-metropolis-thin">
        <div className="flex flex-col justify-center gap-2 md:gap-10 p-2 text-xs md:flex-row md:items-center md:justify-between lg:mx-14 lg:text-lg xl:mx-24">
          <span className="text-center text-xs md:text-base lg:text-lg">
            Copyright © 2023. All Rights Reserved on nkaccosiate.
          </span>
          <div className="mx-auto items-center flex justify-center gap-6 py-2 pb-2 text-xs sm:mt-0 md:text-base lg:text-lg">
            <Link
              href="#"
              className="bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]"
            >
              Terms of Use
            </Link>
            <Link
              href="#"
              className="bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]"
            >
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
