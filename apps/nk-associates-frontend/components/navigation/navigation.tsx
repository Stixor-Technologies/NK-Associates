"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/icons/nk-logo.svg";
import SearchIcon from "../../public/assets/icons/search-icon.svg";
import LinkButton from "../button/link-button";

const Navigation = () => {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const sideBarMenu = useRef<HTMLDivElement | null>(null);
  const getInTouch = useRef<HTMLAnchorElement | null>(null);
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
    [isMenuOpen],
  );

  useEffect(() => {
    window.addEventListener("resize", () => setIsMenuOpen(false));
    return () => {
      window.removeEventListener("resize", () => setIsMenuOpen(false));
    };
  }, []);

  // Trigger animations for menu open state
  useEffect(() => {
    let body = document.body;
    if (isMenuOpen) {
      body.classList.add("overflow-hidden");
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: -sideBarMenu?.current?.clientWidth,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(getInTouch.current, {
          color: "#FFFFFF",
          borderColor: "#FFFFFF",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    } else {
      body.classList.remove("overflow-hidden");
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(getInTouch.current, {
          color: "#E4404A",
          borderColor: "#E4404A",
          duration: 0.5,
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
      <div className="fixed top-0 z-40 w-full flex-col bg-nk-white-dark">
        <div className="mx-auto my-auto flex w-[95%] items-center justify-between px-3 py-3">
          <div>
            {/* Will be changed to point to home page once it is developed */}
            <Link href="/">
              <Image width={40} height={40} src={Logo} alt="NK logo" />
            </Link>
          </div>
          <div className="flex justify-between">
            {/* <button className="hidden pr-8 md:flex md:items-center">
              <Image src={SearchIcon} alt="Search" />
            </button>
            commented out for now, will be implemented later */}

            <Link
              ref={getInTouch}
              href="/contact"
              className="mr-2 mt-4 hidden h-10 cursor-pointer flex-row items-center rounded-full border border-nk-red bg-transparent px-6 text-center font-metropolis capitalize text-nk-red hover:!text-nk-white hover:bg-nk-red md:z-50 md:flex"
            >
              Get in touch
            </Link>
            <Hamburger
              ref={menuButtonRef}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
        <div>
          <Sidebar
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            ref={sideBarMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
