import React from "react";
import Image from "next/image";
import Link from "next/link";
import GooglePlayIcon from "../../public/assets/icons/google-play.svg";
import AppStoreIcon from "../../public/assets/icons/app-store.svg";
import AppGalleryIcon from "../../public/assets/icons/app-gallery.svg";
import layer_2 from "../../public/assets/icons/nk-logo-footer.svg";
import FbIcon from "../../public/assets/icons/facebook-icon.svg";
import TwitterIcon from "../../public/assets/icons/twitter-icon.svg";
import InstagramIcon from "../../public/assets/icons/instagram-icon.svg";
import LinkedinIcon from "../../public/assets/icons/linkedIn-icon.svg";
import SnapIcon from "../../public/assets/icons/snapchat-icon.svg";
import YtIcon from "../../public/assets/icons/youtube-icon.svg";

const footerSocialLinks = [
  { pathName: "https://www.facebook.com/NKAssociatesOfficial/", image: FbIcon },
  { pathName: "https://twitter.com/NKAssociates6", image: TwitterIcon },
  {
    pathName: "https://www.instagram.com/nkassociatesofficial/",
    image: InstagramIcon,
  },
  {
    pathName:
      "https://www.linkedin.com/company/nk-associates-builders-pvt-ltd/",
    image: LinkedinIcon,
  },
  {
    pathName:
      "https://www.snapchat.com/add/nkassociates23?share_id=IHFwtGuwCm0&locale=en-US",
    image: SnapIcon,
  },
  {
    pathName: "https://www.youtube.com/channel/UCUdSaD4ZjxDYxXiQXZIM7tw",
    image: YtIcon,
  },
];

const footerSocialList = footerSocialLinks?.map((socialLink, index) => {
  return (
    socialLink?.pathName && (
      <div
        key={index}
        className="my-2 mr-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-nk-red transition-all duration-300 hover:bg-opacity-75"
      >
        <Link
          href={socialLink?.pathName || "#"}
          target={socialLink?.pathName ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          <Image
            src={socialLink?.image}
            width={20}
            height={30}
            alt="Facebook"
          />
        </Link>
      </div>
    )
  );
});

async function Footer() {
  const appStoreLink = "#";
  const playStoreLink = "#";
  const appGalleryLink = "#";
  return (
    <footer className="z-50 flex flex-col justify-center items-center min-h-fit bg-nk-dark-gray font-metropolis text-nk-white w-full">
      <div className="flex flex-col justify-center items-center w-fit">
        <div className="flex flex-row pt-[2.731rem] md:pt-[4rem]">
          <Image src={layer_2} alt="logo" width={318} height={79} />
        </div>
        <div className="flex flex-row md:hidden pt-[1.556rem] pb-[1rem]">
          {footerSocialList}
        </div>
        <div className="flex flex-row md:hidden text-[1.029rem] uppercase">
          D o w n l o a d
        </div>
        <div className="flex flex-row flex-wrap pt-[1.278rem] pb-[1.3rem] w-full justify-center">
          <Link
            href={appStoreLink || "#"}
            target={appStoreLink ? "_blank" : "_self"}
          >
            <Image
              src={AppStoreIcon}
              alt="App Store"
              className="px-3 py-2 bg-nk-red rounded-lg mx-2 my-1"
            />
          </Link>

          <Link
            href={playStoreLink || "#"}
            target={playStoreLink ? "_blank" : "_self"}
          >
            <Image
              src={GooglePlayIcon}
              alt="Google Play"
              className="px-3 py-2 bg-nk-red rounded-lg mx-2 my-1"
            />
          </Link>

          <Link
            href={appGalleryLink || "#"}
            target={appGalleryLink ? "_blank" : "_self"}
            className="justify-center items-center"
          >
            <Image
              src={AppGalleryIcon}
              alt="App Gallery"
              className="px-3 py-2 bg-nk-red rounded-lg mx-2 my-1"
            />
          </Link>
        </div>
      </div>

      <hr className="border-nk-white sm:mx-auto w-full " />
      <div className="container font-metropolis-thin">
        <div className="flex flex-col justify-center gap-2 md:gap-10 p-2 text-xs md:flex-row md:items-center md:justify-between lg:mx-14 lg:text-lg xl:mx-24">
          <span className="text-center text-xs md:text-base lg:text-lg">
            Copyright © 2023. All Rights Reserved on nkaccosiate.
          </span>
          <div className="mx-auto items-center flex justify-center gap-6 py-2 pb-2 text-xs sm:mt-0 md:text-base lg:text-lg">
            <Link
              href="https://develop.d2vr74cwsk1kb.amplifyapp.com/terms-and-conditions"
              className="bg-gradient-to-r from-nk-white to-nk-white bg-[length:0%_8%] bg-left-bottom bg-no-repeat font-metropolis-thin transition-all duration-500 ease-out hover:bg-[length:100%_8%]"
            >
              Terms of Use
            </Link>
            <Link
              href="https://develop.d2vr74cwsk1kb.amplifyapp.com/privacy-policy"
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
