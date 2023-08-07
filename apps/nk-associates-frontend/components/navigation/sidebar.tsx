import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  const pathName: string = usePathname().slice(1);

  const menuItems = [
    { pathName: "", label: "Home" },
    { pathName: "#", label: "About Us" },
    { pathName: "properties", label: "Property" },
    { pathName: "projects", label: "Projects" },
    { pathName: "#", label: "Services" },
    { pathName: "careers", label: "Career" },
    { pathName: "events", label: "Event" },
    { pathName: "#", label: "Contact Us" },
  ];

  const menuList = menuItems.map((menuItem) => (
    <li
      key={menuItem.pathName}
      onClick={handleLinkClick}
      className={`text-nk-white transition-colors duration-500 ease-in-out hover:text-nk-dark-gray ${
        pathName === menuItem.pathName ? "text-nk-dark-gray" : "text-nk-white"
      }`}
    >
      <Link href={`/${menuItem.pathName}`}>{menuItem.label}</Link>
    </li>
  ));

  return (
    <div
      ref={ref}
      className={`fixed right-0 top-0  -mr-[100%]
       h-full w-full overflow-y-auto will-change-auto  xs:-mr-[100%] xs:h-full xs:w-full sm:-mr-[100%] sm:h-full sm:w-full md:-mr-[100%] md:h-full md:w-full lg:-mr-[35vw] lg:h-full lg:w-[35vw] 
      `}
    >
      <div className="absolute -z-10 h-full w-full bg-nk-red"></div>
      <div
        className=" min-aspect:h-full min-aspect:w-full mx-auto flex h-full w-full flex-col items-center justify-center overflow-y-auto  
		px-2  pt-20 "
      >
        <ul className="my-8 space-y-8 text-right font-metropolis-bold text-5xl">
          {menuList}
        </ul>
      </div>
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default React.forwardRef(Sidebar);
