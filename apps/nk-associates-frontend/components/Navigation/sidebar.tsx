import React from "react";
import Link from "next/link";
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.ForwardRefRenderFunction<HTMLDivElement, SidebarProps> = (
  { isOpen },
  ref
) => {
  return (
    <div
      ref={ref}
      className={`fixed right-0 top-0 z-40 -mr-[30vw] h-screen w-[300px] min-w-[30vw]
      overflow-y-auto will-change-auto `}
    >
      <div className="absolute -z-10 h-full w-full bg-nk-red"></div>
      <div
        className="min-aspect-9/16:w-3/4 min-aspect:h-3/5 min-aspect:w-full min-aspect:justify-end mx-auto flex h-full w-full flex-col items-center justify-center 
		overflow-y-auto  px-2 py-4"
      >
        <ul className="space-y-8 text-right font-metropolis-bold text-5xl">
          <li className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray">
            <Link href="#">Home</Link>
          </li>
          <li className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray">
            <Link href="#">About Us</Link>
          </li>
          <li className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray">
            <Link href="#">Property</Link>
          </li>
          <li className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray">
            <Link href="#">Projects</Link>
          </li>
          <li className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray">
            <Link href="#">Services</Link>
          </li>
          <li className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray">
            <Link href="#">Career</Link>
          </li>
          <li className="text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray">
            <Link href="#">Event</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default React.forwardRef(Sidebar);
