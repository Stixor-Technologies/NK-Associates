import React from "react";
import Logo from "../../../nk-associates-frontend/app/assets/images/nk-logo.svg";
import SearchIcon from "../../../nk-associates-frontend/app/assets/images/search-icon.svg";
import GetInTouchIcon from "../../../nk-associates-frontend/app/assets/images/get-in-touch-button.svg";
import SidebarIcon from "../../../nk-associates-frontend/app/assets/images/sidebar-icon.svg";
import Link from "next/link";
import classNames from "classnames";
import SidebarButton from "./sidebar"; // Import the SidebarButton component

import Image from "next/image";

const navbar = () => {
	return (
		<div className="bg-nk-white">
			<div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between  p-4">
				<div className="w-16">
					<Link href="#">
						<Image src={Logo} alt="NK logo"></Image>
					</Link>
				</div>
				<div className="flex flex-wrap gap-8">
					<button>
						<Image src={SearchIcon} alt="Search" />{" "}
					</button>
					<button>
						<Image src={GetInTouchIcon} alt="Get in touch" />
					</button>

					<div>
						<Image src={SidebarIcon} alt="SidebarIcon" />
						
					</div>
				</div>
			</div>
		</div>
	);
};

export default navbar;
