import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface MenuItem {
  pathName: string;
  label: string;
}

const Sidebar: React.ForwardRefRenderFunction<HTMLDivElement, SidebarProps> = (
  { isOpen, setIsOpen },
  ref,
) => {
  const handleLinkClick = () => {
    setIsOpen(!isOpen); // Toggle isOpen state to its opposite value
  };

  const pathName: string = usePathname().slice(1);

  const menuItems: MenuItem[] = [
    { pathName: "#", label: "Home" },
    { pathName: "#", label: "About Us" },
    { pathName: "properties", label: "Property" },
    { pathName: "projects", label: "Projects" },
    { pathName: "services", label: "Services" },
    { pathName: "careers", label: "Career" },
    { pathName: "events", label: "Event" },
    { pathName: "contact", label: "Contact Us" },
  ];

  const menuList = menuItems.map((menuItem) => (
    <li
      key={menuItem.pathName}
      onClick={handleLinkClick}
      className={`transition-colors duration-500 ease-in-out ${
        pathName == menuItem.pathName ? "text-nk-dark-gray" : "text-nk-white "
      } hover:text-nk-dark-gray `}
    >
      <Link href={`/${menuItem.pathName}`}>{menuItem.label}</Link>
    </li>
  ));

  return (
    <div
      ref={ref}
      className={`fixed right-0 top-0 -mr-[100%]
       h-full w-full overflow-y-auto will-change-auto lg:-mr-[35vw] lg:w-[35vw] 
      `}
    >
      <div className="absolute -z-10 h-full w-full bg-nk-red"></div>
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center overflow-y-auto px-2 md:pt-20 ">
        <ul className=" space-y-8 text-right font-metropolis-bold text-4xl lg:text-4xl">
          {menuList}
        </ul>
      </div>
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default React.forwardRef(Sidebar);
