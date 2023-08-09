import LinkButton from "../../../components/button/link-button";
import { getJobDetail } from "../../../utils/api-calls";
import { Job } from "../../../utils/types/types";

interface JobDetailProps {
  params: {
    id: string;
  };
}

async function JobDetail({ params: { id } }: JobDetailProps) {
  const data: Job = await getJobDetail(id);
  const {
    title,
    description,
    responsibilities,
    qualification,
    positions,
    start,
    end,
    city,
    location,
    department,
    skills,
    days,
  } = data?.attributes;
  const responsibilityArray = responsibilities.split("\n");
  const [qualificationPart, experiencePart] =
    qualification.split("Experience:");
  const cleanedQualificationPart = qualificationPart
    .replace("Qualification: ", "")
    .trim();
  const skillArray = skills.split("\n");

  const formatTime = (time) => {
    const date = new Date();
    const [hours, minutes] = time.split(":");
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  function displayDays(daysArray) {
    const daysArrayWithoutId = days.map(({ id, ...rest }) => rest);
    const daysObject = daysArrayWithoutId[0]; // Assuming there's only one object in the array
    const selectedDays = Object.keys(daysObject).filter(
      (day) => daysObject[day]
    );

    if (selectedDays.length === 6) {
      return "Monday to Saturday";
    } else {
      return selectedDays.join(", ");
    }
  }

  console.log(data);
  return (
    <div className="px-6 text-center">
      <div className="pb-5 font-metropolis-bold text-3xl">{title}</div>
      <div className="font-metropolis text-sm">{description}</div>
      <div className="py-3 font-metropolis-semibold text-base">
        No. of Positions: {positions}
      </div>
      <LinkButton
        text="Apply Now"
        navigateTo=""
        type="solid"
        className="h-10 w-80 border-2 "
      />
      <div className="py-4 pt-10 text-left font-metropolis-bold text-[1.75rem] leading-[2.1rem]">
        KEY RESPONSIBILITIES:
      </div>
      <div className="pb-4 text-left">
        <ul className="list-disc pl-5 font-metropolis-thin">
          {responsibilityArray.map((responsibility, index) => (
            <li key={index} className="py-1 text-sm">
              {responsibility.trim()}
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4 text-left font-metropolis-bold text-[1.75rem] leading-[2.1rem]">
        JOB SPECIFICATIONS
      </div>
      <div className="pb-2 text-left font-metropolis">
        <span className="font-metropolis-bold text-base text-nk-red">
          Qualification:{" "}
        </span>
        {cleanedQualificationPart}
      </div>
      <div className="text-left font-metropolis">
        <span className="font-metropolis-bold text-base text-nk-red">
          Experience:{" "}
        </span>
        {experiencePart}
      </div>
      <div className="py-4 text-left font-metropolis-bold text-[1.75rem] leading-[2.1rem]">
        Skills Required
      </div>
      <ul className="list-disc pl-5 text-left font-metropolis-thin text-nk-black">
        {skillArray.map((skill, index) => (
          <li key={index} className="py-1 text-sm">
            {skill.trim()}
          </li>
        ))}
      </ul>
      <div className="py-4 pt-10 text-left font-metropolis-bold text-[1.75rem] leading-[2.1rem]">
        Office Timings
      </div>
      <div className="text-left font-metropolis-medium">
        {formatTime(start)} to {formatTime(end)} ({displayDays(days)})
      </div>
      <div className="py-2  text-left font-metropolis-bold text-[1.75rem] leading-[2.1rem]">
        Location
      </div>
      <div className="text-left  font-metropolis-medium">{location}</div>
      <div className="py-3 font-metropolis-semibold text-base">
        No. of Positions: {positions}
      </div>
      <div className="pb-20">
        <LinkButton
          text="Apply Now"
          navigateTo=""
          type="solid"
          className="h-10 w-80 border-2 "
        />
      </div>
    </div>
  );
}

export default JobDetail;
