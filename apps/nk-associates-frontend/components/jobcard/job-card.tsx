"use client";
import React from "react";
import Image from "next/image";
import LinkButton from "../../components/button/link-button";
import LocationIcon from "../../../nk-associates-frontend/app/assets/images/location.svg";
import { Job } from "../../utils/types/types";

interface JobProp {
	job: Job;
}

const JobCard: React.FC<JobProp> = ({ job }) => {
	const { id } = job;
	const { title, description, city, department } = job?.attributes;
	const departmentName = department?.data?.attributes?.name;
	return (
		<div className="mx-1 my-3 rounded-2xl bg-nk-light-gray p-3 lg:mx-3 lg:my-4 lg:flex lg:flex-row lg:gap-4 lg:p-7 xl:gap-8">
			<div className="lg:w-11/12">
				<div className="flex flex-row gap-2 font-metropolis text-base">
					<h3 className="block:inline text-nk-red lg:text-2xl">
						{departmentName}
					</h3>
					<h3 className="block:inline text-base text-nk-dark-gray lg:text-2xl">
						( {title} )
					</h3>
				</div>
				<p className="my-2 font-metropolis-extralight text-xs lg:font-metropolis lg:text-base">
					{description}
				</p>
			</div>
			<div className="flex shrink-0 flex-row gap-2 lg:flex-col lg:justify-between">
				<div className="flex flex-row lg:order-2 lg:ml-auto lg:justify-end">
					<LinkButton
						text="view more"
						navigateTo={`careers/${id}`}
						type="inverted"
						className="h-10 w-32 border border-nk-red bg-transparent text-nk-red lg:w-40"
					/>
				</div>
				<div className="flex flex-row items-center justify-center gap-0.5 lg:order-1 lg:justify-end">
					<Image src={LocationIcon} alt="location icon" />
					<p className="text-clip text-base lg:text-right lg:text-xl">{city}</p>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
