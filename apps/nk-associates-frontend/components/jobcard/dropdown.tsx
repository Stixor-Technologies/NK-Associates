// Job.tsx
"use client";
import { BASE_URL } from "../../utils/constants";
// Job.tsx
import React, { useEffect, useState } from "react";

// TypeScript interfaces
interface job {
	id: number;
	title: string;
	department: {
		id: number, 
		name: string
	}
}

const Job: React.FC = () => {
	const [jobs, setjobs] = useState<job[]>([]);
	const [selectedjobId, setSelectedjobId] = useState<
		number | null
	>(null);

	useEffect(() => {
		// Fetch jobs from the server or API
		const fetchjobs = async () => {
			try {
				const response = await fetch(
					"http://localhost:1337/api/jobs?populate=*"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch jobs");
				}
				const data = await response.json();
				if (!data.data || !Array.isArray(data.data)) {
					throw new Error("Invalid jobs data format");
				}
				// Update the state with the correct array of jobs
				const jobsData: job[] = data.data.map(
					(job: any) => job.attributes
				);
				setjobs(jobsData);
			} catch (error) {
				console.error("Error fetching jobs:", error);
			}
		};
		fetchjobs();
	}, []);

	const handlejobChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedjobId(Number(event.target.value));
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="mb-4 text-3xl font-bold">Job Listings</h1>
			<div className="mb-4">
				<label htmlFor="jobSelect" className="mr-2">
					Select job:
				</label>
				<select
					id="jobSelect"
					className="border border-gray-400 px-2 py-1"
					onChange={handlejobChange}>
					<option value={null}>Departments</option>
					{jobs.map(job => (
						<option key={job.id} value={job.id}>
							{job.department.name}
						</option>
					))}
				</select>
			</div>
			{/* You can add code to display job listings based on the selected job here */}
		</div>
	);
};

export default Job;
