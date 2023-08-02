// "use client";
import React from "react";
import Image from "next/image";
import LinkButton from "../../components/button/link-button";
import LocationIcon from "../../../nk-associates-frontend/app/assets/images/location.svg";
import { Job } from "../../utils/types/types";

interface JobProp {
	job: Job;
}

const JobCard: React.FC<JobProp> = ({ job }) => {
	const { title, description, location } = job?.attributes;
	return (
		<div className="m-2 rounded-2xl bg-nk-light-gray p-3 lg:m-4 lg:flex lg:flex-row lg:p-5">
			<div className="lg:w-11/12">
				<div className="flex flex-row gap-2 font-metropolis text-base">
                    <h3 className="block:inline text-nk-red lg:text-2xl">placeholder</h3>
					<h3 className="block:inline text-nk-dark-gray lg:text-xl">
						{" "}
						( {title} )
					</h3>
				</div>
				<p className="my-3 font-metropolis-extralight text-xs">{description}</p>
			</div>
			<div className="flex flex-row gap-2 lg:flex-col lg:justify-end">
				<LinkButton
					text="apply now"
					navigateTo="/"
					type="inverted"
					className="h-10 w-32 border-2 border-nk-red lg:order-2"
				/>
				<div className="flex flex-row items-center justify-center gap-0.5 lg:order-1 ">
					<Image src={LocationIcon} alt="location icon" />
					<p className="lg:text-right lg:text-xl">{location}</p>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
