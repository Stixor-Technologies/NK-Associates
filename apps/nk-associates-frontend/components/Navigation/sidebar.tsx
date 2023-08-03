import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.ForwardRefRenderFunction<HTMLDivElement, SidebarProps> = (
  { isOpen, setIsOpen },
  ref
) => {
  const handleLinkClick = () => {
    setIsOpen(!isOpen); // Toggle isOpen state to its opposite value
  };

  return (
    <div
      ref={ref}
      className={` fixed right-0 top-0 z-40 -mr-[100%]
       h-full w-full overflow-y-auto will-change-auto  xs:-mr-[100%] xs:h-full xs:w-full sm:-mr-[100%] sm:h-full sm:w-full md:-mr-[100%] md:h-full md:w-full lg:-mr-[35vw] lg:h-full lg:w-[35vw] 
      `}
    >
      <div className="absolute -z-10 h-full w-full bg-nk-red"></div>
      <div
        className=" mx-auto flex h-full w-full flex-col items-center justify-center overflow-y-auto px-2 pt-20  
		min-aspect:h-full  min-aspect:w-full "
      >
        <ul className="my-8 space-y-8 text-right font-metropolis-bold text-5xl">
          <li
            onClick={handleLinkClick}
            className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray"
          >
            <Link href="#">Home</Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray"
          >
            <Link href="#">About Us</Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray"
          >
            <Link href="/properties">Property</Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray"
          >
            <Link href="/projects">Projects</Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray"
          >
            <Link href="#">Services</Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray"
          >
            <Link href="#">Career</Link>
          </li>
          <li
            onClick={handleLinkClick}
            className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray"
          >
            <Link href="/events">Event</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default React.forwardRef(Sidebar);
