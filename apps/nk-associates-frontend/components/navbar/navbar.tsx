"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Logo from "../../../nk-associates-frontend/app/assets/images/nk-logo.svg";
import SearchIcon from "../../../nk-associates-frontend/app/assets/images/search-icon.svg";
import GetInTouchIcon from "../../../nk-associates-frontend/app/assets/images/get-in-touch-button.svg";
import { gsap } from "gsap";
import Hamburger from "./hamburger";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./sidebar";

const Navbar = () => {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const sideBarMenu = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (
        sideBarMenu.current &&
        menuButtonRef.current &&
        !sideBarMenu.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    },
    [isMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("resize", () => setIsMenuOpen(false));
    return () => {
      window.removeEventListener("resize", () => setIsMenuOpen(false));
    };
  }, []);

  // Trigger animations for menu open state
  useEffect(() => {
    if (isMenuOpen) {
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: sideBarMenu?.current?.clientWidth,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    } else {
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div>
      <div className="fixed top-0 z-50 flex w-full flex-row items-center justify-between bg-nk-white-dark bg-yellow-400 px-5 pb-8 pt-5">
        <Link href="#">
          <Image width={50} height={50} src={Logo} alt="NK logo" className="" />
        </Link>
        <div className="flex flex-row">
          <div className="hidden flex-row md:flex">
            <button className="pr-4">
              <Image src={SearchIcon} alt="Search" />{" "}
            </button>
            <button className="pr-4">
              <Image src={GetInTouchIcon} alt="Get in touch" />
            </button>
          </div>
          <Hamburger
            ref={menuButtonRef}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>
      <Sidebar ref={sideBarMenu} />
    </div>
  );
};

export default Navbar;
