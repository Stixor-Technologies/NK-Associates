"use client";

import React from "react";
import Logo from "../../public/assets/icons/nk-logo.svg";
import SearchIcon from "../../public/assets/icons/search-icon.svg";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div className="fixed top-0 z-20 flex w-full items-center justify-between bg-nk-white-dark px-5 pb-8 pt-5">
        <Link href="#">
          <Image width={50} height={50} src={Logo} alt="NK logo" />
        </Link>
        <div className="flex">
          <div className="hidden md:mr-44 md:flex">
            <button className="mr-10 pr-8">
              <Image src={SearchIcon} alt="Search" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
