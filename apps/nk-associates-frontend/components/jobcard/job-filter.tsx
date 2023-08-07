import React, { FC } from "react";

interface FilterProps {
	selectedValue: string;
	options: string[];
	handleSelect: (value: string) => void;
	placeholder: string
}

const JobFilter: FC<FilterProps> = ({
	selectedValue,
	options,
	handleSelect,
	placeholder,
}) => {
	return (
		<div className="relative m-2">
			<select
				className="w-full appearance-none rounded-full border border-nk-gray px-4 py-3.5 pr-8 text-nk-gray focus:border-nk-red focus:outline-none"
				value={selectedValue || ""}
				onChange={e => handleSelect(e.target.value || null)}>
				<option value="">{placeholder}</option>
				{options?.map(opt => (
					<option key={opt} value={opt}>
						{opt}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<svg
					className="h-6 w-6 text-nk-gray"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"></path>
				</svg>
			</div>
		</div>
	);
};

export default JobFilter;
