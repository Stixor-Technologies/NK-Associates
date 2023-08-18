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
    { pathName: "contact", label: "Contact Us" },
  ];

  const menuList = menuItems.map((menuItem, index) => (
    <li
      key={`${index}-${menuItem.pathName}`}
      onClick={handleLinkClick}
      className={`my-3 lg:my-5 xl:my-8 transition-colors duration-500 ease-in-out ${
        pathName == menuItem.pathName ? "text-nk-dark-gray" : "text-nk-white "
      } hover:text-nk-dark-gray `}
    >
      <Link href={`/${menuItem.pathName}`}>{menuItem.label}</Link>
    </li>
  ));

  return (
    <div
      ref={ref}
      className={`fixed right-0 top-0 -mr-[100%] bg-nk-red
       h-full w-full overflow-y-auto will-change-auto md:-mr-[50vw] md:w-[50vw]  lg:-mr-[35vw] lg:w-[35vw] 
      `}
    >
      <ul className="h-full py-[5.75rem] px-[2.125rem] md:px-[2.375rem] lg:px-[2.625rem] xl:px-[2.75rem] 2xl:px-[3rem] text-right font-metropolis-bold text-[2.75rem] md:text-[2.5rem]">
        {menuList}
      </ul>
    </div>
  );
};

Sidebar.displayName = "Sidebar";

export default React.forwardRef(Sidebar);
