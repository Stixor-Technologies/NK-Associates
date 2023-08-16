"use client";
import { useEffect, useState } from "react";
import LinkButton from "../../../components/button/link-button";
import { getJobDetail } from "../../../utils/api-calls";
import { Job } from "../../../utils/types/types";
import JobModal from "../job-modal";

interface JobDetailProps {
  params: {
    id: string;
  };
}

function JobDetail({ params: { id } }: JobDetailProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const [data, setData] = useState<Job>();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await getJobDetail(id);
    setData(result);
  };
  const {
    title,
    description,
    responsibilities,
    qualification,
    experience,
    positions,
    start,
    end,
    department,
    city,
    location,
    skills,
    days,
  } = data?.attributes || {};
  const responsibilityArray = responsibilities?.split("\n");
  const skillArray = skills?.split("\n");

  const formatTime = (time) => {
    const date = new Date();
    const [hours, minutes] = time?.split(":");

    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  function displayDays(daysArray) {
    const daysArrayWithoutId = days?.map(({ id, ...rest }) => rest);
    const daysObject = daysArrayWithoutId[0]; // Assuming there's only one object in the array
    const selectedDays = Object.keys(daysObject)?.filter(
      (day) => daysObject[day],
    );

    if (selectedDays?.length === 6) {
      return "Monday to Saturday";
    } else {
      return selectedDays.join(", ");
    }
  }

  function openModal(): void {
    setIsOpen(true);
  }

  return (
    <div className=" block text-center container  ">
      {/* <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#00000046]"> */}
      <JobModal onClose={closeModal} open={isOpen} />

      <div className="font-metropolis-bold pb-[2.058rem] pt-[2.912rem] text-[1.875rem] md:text-[3rem]">
        {title}
      </div>
      <div className="font-metropolis-thin text-nk-black text-[0.875rem] md:text-[1.25rem]">
        {description}
      </div>
      <div className="font-metropolis-semibold pb-[0.789rem] pt-[1.999rem] text-[1rem] md:text-[1.5rem]">
        No. of positions: {positions}
      </div>
      <LinkButton
        text="Apply Now"
        type="solid"
        className="h-[2.75rem] md:h-[3.063rem] w-[19.25] md:w-[22.125rem] border-2 "
        clickEvent={openModal}
      />

      <div className="font-metropolis-bold pb-[1.595rem] pt-[4.813rem] text-left text-[1.75rem] md:text-[2rem] leading-[2.1rem] uppercase">
        key responsibilities:
      </div>
      <div className="pb-4 pt-2 text-left text-[0.875rem] md:text-[1.5rem]">
        <ul className="font-metropolis-thin list-disc pl-5">
          {responsibilityArray?.map((responsibility, index) => (
            <li key={index} className="py-1">
              {responsibility?.trim()}
            </li>
          ))}
        </ul>
      </div>

      <div className="font-metropolis-bold pb-[2.524rem] pt-[4.241rem] text-left text-[1.75rem] md:text-[2rem] leading-[2.1rem] uppercase">
        job specifications
      </div>

      <div className="font-metropolis text-left text-[1rem] md:text-[1.5rem]">
        <span className="font-metropolis-bold text-nk-red">
          Qualification:{" "}
        </span>
        {qualification?.trim()}
      </div>

      <div className="font-metropolis text-left text-[1rem] md:text-[1.5rem]">
        <span className="font-metropolis-bold text-nk-red ">Experience: </span>
        {experience?.trim()}
      </div>

      <div className="font-metropolis-bold pb-[2.524rem] pt-[4.241rem] text-left text-[1.75rem] md:text-[2rem] leading-[2.1rem] uppercase">
        skills required
      </div>

      <ul className="font-metropolis-thin text-nk-black list-disc pl-5 text-left text-[0.875rem] md:text-[1.5rem]">
        {skillArray?.map((skill, index) => (
          <li key={index} className="py-1 text-[0.875rem] md:text-[1.5rem]">
            {skill?.trim()}
          </li>
        ))}
      </ul>

      <div className="font-metropolis-bold pb-[1.555rem] pt-[4.241rem] text-left text-[1.75rem] md:text-[2rem] leading-[2.1rem] uppercase">
        office timings
      </div>
      {start && end && (
        <div className="font-metropolis-medium text-left text-[1rem] md:text-[1.5rem] uppercase">
          {formatTime(start)} to {formatTime(end)} ({displayDays(days)})
        </div>
      )}
      <div className="font-metropolis-bold pb-[1.555rem] pt-[4.254rem] text-left text-[1.75rem] md:text-[2rem] leading-[2.1rem] uppercase">
        location
      </div>
      <div className="font-metropolis-medium text-left text-[1rem] md:text-[1.5rem] uppercase">
        {location}
      </div>
      <div className="font-metropolis-semibold pb-[1.063rem] pt-[5.218rem] text-[1rem] md:text-[1.5rem]">
        No. of positions: {positions}
      </div>
      <div className="pb-[5.25rem]">
        <LinkButton
          text="Apply Now"
          type="solid"
          className="h-[2.75rem] md:h-[3.063rem] w-[19.25] md:w-[22.125rem] border-2"
          clickEvent={openModal}
        />
      </div>
    </div>
  );
}

export default JobDetail;
