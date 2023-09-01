import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/icons/nk-logo.svg";
import GooglePlayIcon from "../../public/assets/icons/google-play.svg";
import AppStoreIcon from "../../public/assets/icons/app-store.svg";
import AppGalleryIcon from "../../public/assets/icons/app-gallery.svg";
import layer_2 from "../../public/assets/icons/Layer_2.svg";
import FbIcon from "../../public/assets/icons/facebook-icon.svg";
import TwitterIcon from "../../public/assets/icons/twitter-icon.svg";
import InstagramIcon from "../../public/assets/icons/instagram-icon.svg";
import LinkedinIcon from "../../public/assets/icons/linkedIn-icon.svg";
import SnapIcon from "../../public/assets/icons/snapchat-icon.svg";
import YtIcon from "../../public/assets/icons/youtube-icon.svg";

const footerSocialLinks = [
  { pathName: "Add link here", image: FbIcon },
  { pathName: "Add link here", image: TwitterIcon },
  { pathName: "Add link here", image: InstagramIcon },
  { pathName: "Add link here", image: LinkedinIcon },
  { pathName: "Add link here", image: SnapIcon },
  { pathName: "Add link here", image: YtIcon },
];

const footerSocialList = footerSocialLinks?.map((socialLink, index) => {
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
          <Link href="https://www.apple.com/app-store/">
            <Image
              src={AppStoreIcon}
              alt="App Store"
              className="px-3 py-2 bg-nk-red rounded-lg mx-2 my-1"
            />
          </Link>

          <Link href="https://play.google.com/">
            <Image
              src={GooglePlayIcon}
              alt="Google Play"
              className="px-3 py-2 bg-nk-red rounded-lg mx-2 my-1"
            />
          </Link>

          <Link
            href="https://appgallery.huawei.com/"
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
      <hr className="w-full border flex flex-row bg-white" />
      <div className="flex flex-row flex-wrap w-full justify-around font-metropolis-extralight text-center text-nk-white text-[0.813rem]">
        <div className="w-full md:w-fit">
          Copyright © 2023. All Rights Reserved on nkaccosiate
        </div>
        <div>Terms of Use</div>
        <div>Privacy Policy</div>
        <div>Site Map</div>
      </div>
    </footer>
  );
}

export default Footer;
