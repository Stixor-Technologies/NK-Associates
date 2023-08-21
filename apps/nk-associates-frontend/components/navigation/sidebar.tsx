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
    { pathName: "#", label: "Services" },
    { pathName: "careers", label: "Career" },
    { pathName: "events", label: "Event" },
    { pathName: "contact", label: "Contact" },
  ];

  const menuList = menuItems.map((menuItem, index) => (
    <div
      key={`${index}-${menuItem.pathName}`}
      onClick={handleLinkClick}
      className={`transition-colors duration-500 ease-in-out ${
        pathName == menuItem.pathName ? "text-nk-dark-gray" : "text-nk-white "
      } hover:text-nk-dark-gray `}
    >
      <Link href={`/${menuItem.pathName}`}>{menuItem.label}</Link>
    </div>
  ));

  return (
    <div
      ref={ref}
      className={`fixed right-0 top-0 -mr-[100%] h-full
       w-full overflow-y-auto bg-nk-red will-change-auto sm:-mr-[65vw] sm:w-[65vw] md:-mr-[50vw] md:w-[50vw]  lg:-mr-[35vw] lg:w-[35vw] 
       
      `}
    >
      <div className="2xl:text-[3.85rem] flex h-full flex-col items-center justify-center px-[2.125rem] py-[5.75rem] text-center font-metropolis-bold text-[3rem] md:px-[2.375rem] md:text-[3rem] lg:px-[2.625rem] lg:text-[3rem] xl:px-[2.75rem] xl:text-[3.2rem] 2xl:px-[3rem]">
        {menuList}
      </div>
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default React.forwardRef(Sidebar);
