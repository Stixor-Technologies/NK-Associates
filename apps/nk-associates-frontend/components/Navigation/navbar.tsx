"use client";

import React from "react";
import Logo from "../../../nk-associates-frontend/app/assets/images/nk-logo.svg";
import SearchIcon from "../../../nk-associates-frontend/app/assets/images/search-icon.svg";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div className="fixed top-0 z-20 flex w-full flex-row items-center justify-between bg-nk-white-dark px-5 pb-8 pt-5">
        <Link href="#">
          <Image width={50} height={50} src={Logo} alt="NK logo" className="" />
        </Link>
        <div className="flex flex-row">
          <div className="hidden flex-row md:mr-44 md:flex">
            <button className="mr-10 pr-8">
              <Image src={SearchIcon} alt="Search" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
