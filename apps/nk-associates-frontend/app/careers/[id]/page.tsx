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
    <div className=" block px-6 text-center md:px-14  ">
      {/* <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#00000046]"> */}
      <JobModal onClose={closeModal} open={isOpen} />
      {/* </div> */}

      <div className="font-metropolis-bold pb-5 text-3xl">{title}</div>
      <div className="font-metropolis text-sm">{description}</div>
      <div className="font-metropolis-semibold py-3 text-base">
        No. of Positions: {positions}
      </div>
      <LinkButton
        text="Apply Now"
        type="solid"
        className="h-[3.063rem] w-[22.125rem] border-2 "
        clickEvent={openModal}
      />

      <div className="font-metropolis-bold pb-[1.595rem] pt-[4.813rem] text-left text-[2rem] leading-[2.1rem]">
        KEY RESPONSIBILITIES:
      </div>
      <div className="pb-4 pt-2 text-left text-[1.5rem]">
        <ul className="font-metropolis-thin list-disc pl-5">
          {responsibilityArray?.map((responsibility, index) => (
            <li key={index} className="py-1">
              {responsibility?.trim()}
              
            </li>
          ))}
        </ul>
      </div>

      <div className="font-metropolis-bold pb-[2.524rem] pt-[4.241rem] text-left text-[2rem] leading-[2.1rem]">
        JOB SPECIFICATIONS
      </div>

      <div className="font-metropolis text-left text-[1.5rem]">
        <span className="font-metropolis-bold text-nk-red">
          Qualification:{" "}
        </span>
        {qualification?.trim()}
      </div>

      <div className="font-metropolis text-left text-[1.5rem]">
        <span className="font-metropolis-bold text-nk-red ">Experience: </span>
        {experience?.trim()}
      </div>

      <div className="font-metropolis-bold pb-[2.524rem] pt-[4.241rem] text-left text-[1.75rem] leading-[2.1rem]">
        Skills Required
      </div>

      <ul className="font-metropolis-thin text-nk-black list-disc pl-5 text-left text-[1.5rem]">
        {skillArray?.map((skill, index) => (
          <li key={index} className="py-1 text-[1.5rem]">
            {skill?.trim()}
          </li>
        ))}
      </ul>

      <div className="font-metropolis-bold pb-[1.555rem] pt-[4.241rem] text-left text-[2rem] leading-[2.1rem]">
        Office Timings
      </div>
      {start && end && (
        <div className="font-metropolis-medium text-left text-[1.5rem]">
          {formatTime(start)} to {formatTime(end)} ({displayDays(days)})
        </div>
      )}
      <div className="font-metropolis-bold pb-[1.555rem] pt-[4.254rem] text-left text-[2rem] leading-[2.1rem]">
        Location
      </div>
      <div className="font-metropolis-medium text-left text-[1.5rem]">
        {location}
      </div>
      <div className="font-metropolis-semibold pb-[1.063rem] pt-[5.218rem] text-[1.5rem]">
        No. of Positions: {positions}
      </div>
      <div className="pb-[5.25rem]">
        <LinkButton
          text="Apply Now"
          type="solid"
          className="h-[3.063rem] w-[22.125rem] border-2"
          clickEvent={openModal}
        />
      </div>
    </div>
  );
}

export default JobDetail;
