"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/icons/nk-logo.svg";
import SearchIcon from "../../public/assets/icons/search-icon.svg";

const Navigation = () => {
  return (
    <div>
      <div className="absolute top-0 z-40 w-full flex-col ">
        <div className="mx-auto my-auto flex w-[95%] items-center justify-between px-3 py-3">
          <div>
            <Link href="#">
              <Image width={40} height={40} src={Logo} alt="NK logo" />
            </Link>
          </div>
          <div className="flex justify-between">
            <button className="hidden pr-8 md:flex md:items-center mt-4">
              <Image src={SearchIcon} alt="Search" width={39} height={39} />
            </button>
            <Link
              href="https://develop.d2vr74cwsk1kb.amplifyapp.com/contact"
              className=" mr-2 mt-4 h-10 cursor-pointer flex flex-row items-center rounded-full border border-nk-red bg-transparent px-6 text-center font-metropolis capitalize text-nk-red md:z-50"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
