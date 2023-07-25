import React from "react";
import Logo from "../../../nk-associates-frontend/app/assets/images/nk-logo.svg";
import SearchIcon from "../../../nk-associates-frontend/app/assets/images/search-icon.svg";
import GetInTouchIcon from "../../../nk-associates-frontend/app/assets/images/get-in-touch-button.svg";
import SidebarIcon from "../../../nk-associates-frontend/app/assets/images/sidebar-icon.svg";
import Link from "next/link";
import Image from "next/image";

const navbar = () => {
  return (
    <div className="fixed top-0 flex w-full flex-row items-center justify-between bg-nk-white px-5 pb-8 pt-5">
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
