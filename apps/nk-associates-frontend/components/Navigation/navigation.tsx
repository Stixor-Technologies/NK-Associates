"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/icons/nk-logo.svg";
import SearchIcon from "../../public/assets/icons/search-icon.svg";

const Navigation = () => {
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const sideBarMenu = useRef<HTMLDivElement | null>(null);
  const searchIcon = useRef<HTMLButtonElement | null>(null);

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
          x: -sideBarMenu?.current?.clientWidth,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(searchIcon.current, {
          color: "#FFFFFF",
          borderColor: "#FFFFFF",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    } else {
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(searchIcon.current, {
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
      <div className="fixed top-0 w-full flex-col bg-nk-white-dark">
        <div className="mx-auto flex w-[90%] items-center justify-between pb-6 pt-6">
          <div>
            <Link href="#">
              <Image width={50} height={50} src={Logo} alt="NK logo" />
            </Link>
          </div>
          <div className="flex justify-between">
            <div className="hidden md:flex">
              <button className="pr-8">
                <Image src={SearchIcon} alt="Search" />
              </button>
            </div>
            <div className="hidden flex-row md:flex">
              <button
                ref={searchIcon}
                className=" mr-2 mt-2 block h-12 rounded-full border border-nk-red bg-transparent px-8 text-center font-metropolis capitalize  text-nk-red"
              >
                Get in touch
              </button>
            </div>
            <div>
              <Hamburger
                ref={menuButtonRef}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          </div>
        </div>

        <Sidebar
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          ref={sideBarMenu}
        />
      </div>
    </div>
  );
};

export default Navigation;
