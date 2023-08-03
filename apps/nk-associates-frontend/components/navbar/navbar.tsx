import React from "react";
import Logo from "../../public/assets/icons/nk-logo.svg";
import SearchIcon from "../../public/assets/icons/search-icon.svg";
import GetInTouchIcon from "../../public/assets/icons/get-in-touch-button.svg";
import SidebarIcon from "../../public/assets/icons/sidebar-icon.svg";
import Link from "next/link";
import Image from "next/image";

const navbar = () => {
  return (
    <div className="fixed top-0 z-20 flex w-full flex-row items-center justify-between bg-nk-white-dark px-5 pb-8 pt-5">
      <Link href="#">
        <Image width={50} height={50} src={Logo} alt="NK logo" className="" />
      </Link>
      <div className=" flex flex-row">
        <div className="hidden flex-row md:flex">
          <button className="pr-4">
            <Image src={SearchIcon} alt="Search" />{" "}
          </button>
          <button className="pr-4">
            <Image src={GetInTouchIcon} alt="Get in touch" />
          </button>
        </div>

        <Image src={SidebarIcon} alt="SidebarIcon" />
      </div>
    </div>
  );
};

export default navbar;
