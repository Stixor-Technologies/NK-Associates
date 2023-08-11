"use client";
import React, { useState, useEffect } from "react";
import JobCard from "./job-card";
import { Job } from "../../utils/types/types";
import Spinner from "../spinner";
import { getJobs, getCities, getDepartments } from "../../utils/api-calls";
import FilterIcon from "../../public/assets/images/filter.svg";
import FilterAlt from "../../public/assets/images/filter-alt.svg";
import Image from "next/image";
import JobFilter from "./job-filter";
import SearchIcon from "../../public/assets/icons/search.svg";

const JobList = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [total, setTotal] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filteredDepartment, setFilteredDepartments] = useState<string | null>(
		null
	);
	const [filteredCity, setFilteredCity] = useState<string | null>(null);
	const [departments, setDepartments] = useState<string[]>([]);
	const [cities, setCities] = useState<string[]>([]);
	const fetchData = async () => {
		const resp = await getJobs(filteredDepartment, filteredCity);
		const departmentList = await getDepartments();

		if (resp?.data) {
			setJobs(resp.data);
			setTotal(resp.meta.pagination.total);
		}
		if (departmentList) {
			setDepartments(departmentList as string[]);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchData();
		fetchCities();
	}, [filteredDepartment, filteredCity]);

	const fetchCities = async () => {
		const cityList = (await getCities()) as string[];
		setCities(cityList);
	};

	const handleFilterByDepartment = (department: string | null) => {
		setFilteredDepartments(department);
	};

	const handleFilterByCity = (city: string | null) => {
		setFilteredCity(city);
	};

	const filteredJobs = jobs.filter(job =>
		job.attributes.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const [isClicked, setIsClicked] = useState(false);

	return (
		<>
			<div className="rounded-xl bg-nk-white p-2 pb-4 shadow-xl">
				<div className="flex justify-between gap-3 p-2">
					<div className="relative h-1 w-4/6 pt-4 md:w-1/2">
						<div className="relative">
							<input
								placeholder="Search here"
								className="z-0 w-full rounded-full border border-nk-gray px-4 py-2 text-nk-dark-gray focus:border-nk-red focus:outline-none md:mt-6 md:py-3.5"
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 md:mt-6 md:py-3.5">
								<Image
									src={SearchIcon}
									alt="search icon"
									className="w-7 md:w-8"
								/>
							</div>
						</div>
					</div>
					<div className="hidden w-4/6 md:block md:flex">
						<div className="mt-8 w-1/2">
							<JobFilter
								selectedValue={filteredDepartment}
								options={departments}
								handleSelect={handleFilterByDepartment}
								placeholder="All Departments"
							/>
						</div>
						<div className="mt-8 w-1/2">
							<JobFilter
								selectedValue={filteredCity}
								options={cities}
								handleSelect={handleFilterByCity}
								placeholder="All Cities"
							/>
						</div>
					</div>
					<div className="relative flex w-2/6 pt-4 md:hidden">
						<div
							className={`z-0 flex h-10 w-full items-center justify-center gap-2 rounded-full text-nk-gray shadow ${
								isClicked ? "bg-nk-red text-nk-white" : " border-nk-gray "
							}`}
							onClick={() => {
								setIsClicked(!isClicked);
							}}>
							<p>Filters</p>
							{!isClicked && <Image src={FilterIcon} alt="Filter Icon" />}
							{isClicked && <Image src={FilterAlt} alt="Filter Alt" />}
						</div>
						<div
							className={`absolute right-0 z-10 mt-11 flex w-80 flex-col rounded-lg bg-nk-light-gray p-2 shadow-xl transition-opacity duration-500 ease-in-out ${
								isClicked ? "opacity-100" : "opacity-0"
							}`}>
							{isClicked && (
								<JobFilter
									selectedValue={filteredDepartment}
									options={departments}
									handleSelect={handleFilterByDepartment}
									placeholder="All Departments"
								/>
							)}
							{isClicked && (
								<JobFilter
									selectedValue={filteredCity}
									options={cities}
									handleSelect={handleFilterByCity}
									placeholder="All Cities"
								/>
							)}
						</div>
					</div>
				</div>
				{isLoading && departments.length === 0 && jobs.length === 0 ? (
					<div className="my-4 flex flex-1">
						<Spinner />
					</div>
				) : departments && departments.length > 0 && jobs.length > 0 ? (
					<div>
						{filteredJobs.map((job, index) => (
							<JobCard key={index} job={job} />
						))}
					</div>
				) : (
					<div>
						<p className="py-10 text-center font-metropolis text-base text-nk-dark-gray">
							No Jobs Available
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default JobList;
