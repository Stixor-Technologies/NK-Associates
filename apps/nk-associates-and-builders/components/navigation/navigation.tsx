"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/icons/nk-logo.svg";
import SearchIcon from "../../public/assets/icons/search-icon.svg";

const Navigation = () => {
  return (
    <div>
      <div className="fixed top-0 z-40 w-full flex-col bg-nk-white-dark">
        <div className="mx-auto my-auto flex w-[95%] items-center justify-between px-3 py-3">
          <div>
            {/* Will be changed to point to home page once it is developed */}
            <Link href="#">
              <Image width={40} height={40} src={Logo} alt="NK logo" />
            </Link>
          </div>
          <div className="flex justify-between">
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
