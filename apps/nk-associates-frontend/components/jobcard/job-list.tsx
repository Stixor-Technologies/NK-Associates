"use client";
import React, { useState, useEffect } from "react";
import JobCard from "./job-card";
import { Job } from "../../utils/types/types";
import Spinner from "../spinner";
import { getJobs, getLocations, getDepartments } from "../../utils/api-calls";
import FilterIcon from "../../public/assets/images/filter.svg";
import FilterAlt from "../../public/assets/images/filter-alt.svg";
import Image from "next/image";

const JobList = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [total, setTotal] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filteredDepartment, setFilteredDepartments] = useState<string | null>(
		null
	);
	const [filteredLocation, setFilteredLocation] = useState<string | null>(null);
	const [departments, setDepartments] = useState<string[]>([]);
	const [locations, setLocations] = useState<string[]>([]);

	const fetchData = async () => {
		setIsLoading(true);
		const resp = await getJobs(filteredDepartment, filteredLocation);
		if (resp?.data) {
			setJobs(resp.data);
			setTotal(resp.meta.pagination.total);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
		fetchLocations();
		fetchDepartments();
	}, [filteredDepartment, filteredLocation]);

	const fetchLocations = async () => {
		const locationList = (await getLocations()) as string[];
		setLocations(locationList);
	};

	const fetchDepartments = async () => {
		const departmentList = await getDepartments();
		setDepartments(departmentList as string[]);
	};

	const handleFilterByDepartment = (department: string | null) => {
		setFilteredDepartments(department);
	};

	const handleFilterByLocation = (location: string | null) => {
		setFilteredLocation(location);
	};

	const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleFilterByLocation(e.target.value || null);
	};

	const filteredJobs = jobs.filter(job =>
		job.attributes.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const [isClicked, setIsClicked] = useState(false);
	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	return (
		<div className="rounded-xl bg-white pb-4 shadow-xl ">
			<div className="hidden md:block">
				<div className="m-4 mt-8 flex w-3/5">
					{/* Department filter */}
					<div className="m-2 w-1/2">
						<select
							className="w-full rounded-full border-2 border-nk-gray px-2 py-3.5 text-nk-gray"
							value={filteredDepartment || ""}
							onChange={e => handleFilterByDepartment(e.target.value || null)}>
							<option value="">All Departments</option>
							{departments.map(department => (
								<option key={department} value={department}>
									{department}
								</option>
							))}
						</select>
					</div>
					{/* Location filter */}
					<div className="m-2 w-1/2">
						<select
							className="w-full rounded-full border-2 border-nk-gray px-2 py-3.5 text-nk-gray"
							value={filteredLocation || ""}
							onChange={handleLocationChange}>
							<option value="">All Locations</option>
							{locations.map(location => (
								<option key={location} value={location}>
									{location}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className="relative">
				<div
					className={`absolute right-0 z-10 mt-10 flex w-3/4 justify-end transition-opacity duration-500 ease-in-out ${
						isClicked ? "opacity-100" : "opacity-0"
					}`}>
					{isClicked && (
						<div
							className={` m-2 flex w-full flex-col rounded-lg bg-nk-light-gray p-2 shadow-2xl `}>
							{/* Department filter */}
							<div className="m-2">
								<select
									className="w-full rounded-full border border-nk-gray px-2 py-3 text-nk-gray"
									value={filteredDepartment || ""}
									onChange={e =>
										handleFilterByDepartment(e.target.value || null)
									}>
									<option value="">All Departments</option>
									{departments.map(department => (
										<option key={department} value={department}>
											{department}
										</option>
									))}
								</select>
							</div>
							{/* Location filter */}
							<div className="m-2">
								<select
									className="w-full rounded-full border border-nk-gray px-2 py-3 text-nk-gray"
									value={filteredLocation || ""}
									onChange={handleLocationChange}>
									<option value="">All Locations</option>
									{locations.map(location => (
										<option key={location} value={location}>
											{location}
										</option>
									))}
								</select>
							</div>
						</div>
					)}
				</div>
				<div className="relative my-4 flex justify-between">
					<div className="m-2 w-2/3 rounded-full md:hidden">
						<input
							placeholder="Search here"
							className="z-0 text-nk-dark-gray"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</div>
					<div
						className={`z=0 m-2 flex w-1/3 gap-2 rounded-full px-2 py-1 text-nk-gray shadow md:hidden ${
							isClicked ? "bg-nk-red text-nk-white" : " border-nk-gray "
						}`}
						onClick={() => {
							handleClick;
							setIsClicked(!isClicked);
						}}>
						<p>Filters</p>
						{!isClicked && <Image src={FilterIcon} alt="Filter Icon" />}
						{isClicked && <Image src={FilterAlt} alt="Filter Alt" />}
					</div>
				</div>
				{isLoading && jobs.length === 0 ? (
					<div className="my-4 flex flex-1">
						<Spinner />
					</div>
				) : filteredJobs && filteredJobs.length > 0 ? (
					<div>
						{filteredJobs.map((job, index) => (
							<JobCard key={index} job={job} />
						))}
					</div>
				) : (
					<div className="flex flex-1 items-center justify-center text-nk-black">
						<p className="text-center">No Jobs Available</p>
					</div>
				)}{" "}
			</div>
		</div>
	);
};

export default JobList;
