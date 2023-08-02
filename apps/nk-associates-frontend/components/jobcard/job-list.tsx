"use client";
import React, { useState, useEffect } from "react";
import JobCard from "./job-card";
import { Job } from "../../utils/types/types";
import Spinner from "../spinner";
import { getJobs, getLocations, getDepartments } from "../../utils/api-calls"; // Import the getLocations function
import FilterIcon from "../../public/assets/images/filter.svg";
import Image from "next/image";

const JobList = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [total, setTotal] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filteredDepartment, setFilteredDepartments] = useState<string | null>(null);
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
			fetchDepartments(); // Fetch departments when the component mounts
		}, [filteredDepartment, filteredLocation]);

	const fetchLocations = async () => {
		const locationList = (await getLocations()) as string[]; // Cast the response to string[]
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

	return (
		<div className="rounded-lg bg-white shadow">
			<div>
				<div className="my-8 flex flex-row justify-between">
					<div className="w:2/3 m-2 rounded-full">
						<input
							placeholder="Search here"
							className="text-"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="w:1/3 m-2 flex gap-2 rounded-full border-nk-gray px-2 py-1 text-nk-gray shadow">
						<p>Filters</p>
						<Image src={FilterIcon} alt="filters" />
					</div>
				</div>
				{/* Department filter */}
                 <div className="m-2">
                        <select
                            className="rounded-full border-2 border-nk-gray px-2 py-1 text-nk-gray "
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
				<div className="m-2">
					<select
						className="rounded-full border-2 border-nk-gray px-2 py-1 text-nk-gray "
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
