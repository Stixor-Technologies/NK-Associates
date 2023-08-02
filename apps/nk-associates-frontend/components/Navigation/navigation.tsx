"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";
import { gsap } from "gsap";

const Navigation = () => {
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
    console.log("Menu current state is " + isMenuOpen);
    if (isMenuOpen) {
      if (sideBarMenu.current) {
        gsap.to(sideBarMenu.current, {
          x: -sideBarMenu?.current?.clientWidth,
          duration: 1,
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
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <Navbar />
          <div className="fixed right-2 top-3 z-50 mx-2 ">
            <Hamburger
              ref={menuButtonRef}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
        {/* <div className={`${isMenuOpen ? "mr-0" : "-mr-[100vw]"}`}> */}

        <Sidebar isOpen={isMenuOpen} ref={sideBarMenu} />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Navigation;
