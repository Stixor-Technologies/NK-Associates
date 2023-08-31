"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

import { convertToPakistaniNumbering } from "../../utils/utils";
import InquiresComponent from "./inquires-component";

type PropTypes = {
  projectName: string;
  description: string;
  totalUnits: number;
  unitsSold: number;
  price: number;
  coveredArea: number;
  coveredAreaUnits: string;
  category: string;
  types: string[];
  city: string;
  numberOfBathRooms?: number;
  numberOfRooms?: number;
};

const ProjectIntroduction = ({
  projectName,
  description,
  totalUnits,
  unitsSold,
  price,
  coveredArea,
  coveredAreaUnits,
  category,
  types,
  city,
  numberOfBathRooms = undefined,
  numberOfRooms = undefined,
}: PropTypes) => {
  const details = [
    {
      title: "Category",
      value: category,
    },
    {
      title: "Covered Area / Area",
      value: coveredArea + " " + coveredAreaUnits,
    },
    {
      title: "Types",
      value: types.join(", "),
    },
    {
      title: "Price",
      value: `PKR ${convertToPakistaniNumbering(price)}`,
    },
    {
      title: "City",
      value: city,
    },
  ];

  useEffect(() => {
    gsap.to("[data-project-title]", {
      opacity: 1,
      transform: "translateY(0%)",
    });

    gsap.to("[data-project-unitssold] p span", {
      visibility: "visible",
    });

    gsap.from("[data-project-unitssold] p span", {
      textContent: 0,
      duration: 4,
      ease: "circ.inOut",
      snap: { textContent: 1 },
      stagger: 1,
    });
  }, []);

  return (
    <section
      data-project-intro
      className="container flex flex-col py-8 md:py-14"
    >
      <section className="mb-6 flex flex-col font-metropolis-bold md:flex-row md:justify-between">
        <h1
          data-project-title
          className="mb-5 cursor-default text-center text-4xl md:mb-0 md:truncate md:pr-6 md:text-left opacity-0 translate-y-full"
          title={projectName}
        >
          {projectName}
        </h1>

        <div className="mb-5 flex justify-center md:hidden">
          {numberOfBathRooms && (
            <div className="mr-6 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.96809 5.04487C3.96819 4.61413 4.11829 4.19687 4.39261 3.86478C4.66693 3.53269 5.04834 3.30651 5.47131 3.22508C5.89428 3.14365 6.3324 3.21207 6.71041 3.41857C7.08842 3.62508 7.3827 3.95678 7.54272 4.3567L7.70597 4.76257C7.00688 5.27372 6.4649 5.97044 6.14144 6.77379C5.68145 7.9014 5.67333 9.16283 6.11876 10.2963C6.16061 10.4022 6.22333 10.4987 6.30318 10.5799C6.38304 10.6612 6.47842 10.7256 6.58364 10.7692C6.68886 10.8129 6.80179 10.835 6.91571 10.8342C7.02963 10.8334 7.14223 10.8097 7.24681 10.7645L14.0038 7.85536C14.2066 7.76817 14.3676 7.60549 14.4527 7.40173C14.5377 7.19798 14.5402 6.96913 14.4595 6.76359C14.2434 6.20585 13.9184 5.69674 13.5034 5.26598C13.0884 4.83522 12.5918 4.49142 12.0425 4.25466C11.16 3.87599 10.1771 3.79946 9.2467 4.03699L9.12199 3.72522C8.81533 2.95815 8.25106 2.32186 7.52616 1.92571C6.80125 1.52955 5.96099 1.39828 5.14979 1.55446C4.3386 1.71063 3.60714 2.14449 3.08114 2.78148C2.55513 3.41846 2.26744 4.21878 2.26751 5.04487V12.8279H1.98408C1.75857 12.8279 1.54229 12.9174 1.38283 13.0769C1.22337 13.2364 1.13379 13.4526 1.13379 13.6782C1.13379 13.9037 1.22337 14.1199 1.38283 14.2794C1.54229 14.4389 1.75857 14.5284 1.98408 14.5284H2.26751V14.9309C2.26751 15.3561 2.26751 15.6055 2.28565 15.8832C2.44664 18.4194 3.81617 20.7605 5.80245 22.291C5.78637 22.3159 5.77161 22.3417 5.75824 22.3681L4.62452 24.6356C4.52586 24.8371 4.51085 25.0694 4.58275 25.282C4.65466 25.4945 4.80765 25.67 5.00839 25.7702C5.20913 25.8704 5.44134 25.8872 5.65443 25.817C5.86751 25.7467 6.04419 25.5951 6.14597 25.3952L7.24341 23.2014C8.15681 23.6679 9.14839 23.9619 10.1684 24.0687C10.4462 24.0971 10.6151 24.1027 10.9031 24.1141H10.911C11.75 24.1458 12.5708 24.1651 13.3213 24.1651C14.0718 24.1651 14.8926 24.1458 15.7316 24.1141H15.7395C16.0275 24.1027 16.1975 24.0971 16.4742 24.0687C17.4942 23.9619 18.4858 23.6679 19.3992 23.2014L20.4966 25.3963C20.5466 25.4962 20.6157 25.5853 20.7001 25.6585C20.7845 25.7316 20.8824 25.7875 20.9884 25.8228C21.0943 25.8581 21.2062 25.8722 21.3176 25.8643C21.429 25.8564 21.5378 25.8266 21.6377 25.7767C21.7376 25.7267 21.8267 25.6576 21.8999 25.5732C21.973 25.4888 22.0289 25.3909 22.0642 25.2849C22.0995 25.1789 22.1136 25.0671 22.1057 24.9556C22.0978 24.8442 22.068 24.7355 22.0181 24.6356L20.8843 22.3681C20.8713 22.3417 20.8569 22.316 20.8413 22.291C22.8264 20.7605 24.1971 18.4182 24.3581 15.8832C24.3751 15.6055 24.3751 15.3561 24.3751 14.9309V14.8878C24.3751 14.8198 24.3751 14.7484 24.3705 14.6838C24.3673 14.6318 24.362 14.58 24.3547 14.5284H24.6585C24.884 14.5284 25.1003 14.4389 25.2598 14.2794C25.4192 14.1199 25.5088 13.9037 25.5088 13.6782C25.5088 13.4526 25.4192 13.2364 25.2598 13.0769C25.1003 12.9174 24.884 12.8279 24.6585 12.8279H3.96809V5.04487Z"
                  fill="url(#paint0_linear_171_4489)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_171_4489"
                    x1="13.3213"
                    y1="1.49036"
                    x2="13.3213"
                    y2="25.8665"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E4404A" />
                    <stop offset="1" stopColor="#EB4B5E" />
                  </linearGradient>
                </defs>
              </svg>

              <p className="ml-2">{numberOfBathRooms}</p>
            </div>
          )}

          {numberOfRooms && (
            <div className="mr-6 flex items-center justify-center">
              <svg
                width="24"
                viewBox="0 0 25 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.389 6.88534H13.0896V6.03504C13.0896 5.80953 13.1792 5.59326 13.3386 5.4338C13.4981 5.27434 13.7143 5.18475 13.9399 5.18475H16.4907C16.7162 5.18475 16.9325 5.27434 17.092 5.4338C17.2514 5.59326 17.341 5.80953 17.341 6.03504V6.88534H20.7422V3.48417C20.7422 2.58213 20.3839 1.71703 19.746 1.07919C19.1082 0.441344 18.2431 0.0830078 17.341 0.0830078H7.13753C6.23549 0.0830078 5.37039 0.441344 4.73255 1.07919C4.0947 1.71703 3.73637 2.58213 3.73637 3.48417V6.88534H7.13753V6.03504C7.13753 5.80953 7.22712 5.59326 7.38658 5.4338C7.54604 5.27434 7.76231 5.18475 7.98782 5.18475H10.5387C10.7642 5.18475 10.9805 5.27434 11.1399 5.4338C11.2994 5.59326 11.389 5.80953 11.389 6.03504V6.88534ZM4.58666 8.58592C3.4591 8.58592 2.37773 9.03384 1.58043 9.83114C0.783125 10.6284 0.335205 11.7098 0.335205 12.8374V19.6397C0.335205 19.8652 0.424789 20.0815 0.584249 20.2409C0.74371 20.4004 0.959985 20.49 1.1855 20.49C1.41101 20.49 1.62728 20.4004 1.78674 20.2409C1.9462 20.0815 2.03579 19.8652 2.03579 19.6397V15.3882H22.4428V19.6397C22.4428 19.8652 22.5324 20.0815 22.6918 20.2409C22.8513 20.4004 23.0675 20.49 23.2931 20.49C23.5186 20.49 23.7348 20.4004 23.8943 20.2409C24.0538 20.0815 24.1434 19.8652 24.1434 19.6397V12.8374C24.1434 11.7098 23.6954 10.6284 22.8981 9.83114C22.1008 9.03384 21.0195 8.58592 19.8919 8.58592H4.58666Z"
                  fill="url(#paint0_linear_451_2544)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_451_2544"
                    x1="12.2393"
                    y1="0.0830078"
                    x2="12.2393"
                    y2="20.49"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E4404A" />
                    <stop offset="1" stopColor="#EB4B5E" />
                  </linearGradient>
                </defs>
              </svg>

              <p className="ml-2">{numberOfRooms}</p>
            </div>
          )}

          <div className="flex items-center justify-center">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.2107 0.352004C1.13712 0.391658 1.02452 0.488829 0.960453 0.567983L0.843994 0.711892V10.153V19.5941L0.940241 19.7362C0.993177 19.8144 1.10694 19.9127 1.19303 19.9548C1.34502 20.029 1.43518 20.0312 4.31883 20.0312H7.2881L7.29996 18.956C7.3112 17.9352 7.31589 17.8752 7.39235 17.7721C7.68352 17.3795 8.25354 17.3939 8.45708 17.799C8.51625 17.9168 8.52441 18.0601 8.52445 18.9821L8.52453 20.0312H9.83122H11.1379L11.1498 18.9821C11.1609 18.0051 11.1671 17.9238 11.2408 17.7984C11.4712 17.4063 12.0439 17.3778 12.2857 17.7465C12.3472 17.8402 12.3574 17.9765 12.3744 18.9322L12.3937 20.0119H13.7026H15.0116L15.0308 18.9322C15.0479 17.9765 15.0581 17.8402 15.1195 17.7465C15.3614 17.3778 15.9341 17.4063 16.1645 17.7984C16.2381 17.9238 16.2444 18.0051 16.2555 18.9821L16.2674 20.0312L18.1804 20.0306L20.0935 20.0299L20.2467 19.9431C20.3321 19.8948 20.4385 19.7886 20.4872 19.7032L20.5745 19.55L20.565 17.4065C20.5556 15.3091 20.5537 15.2606 20.4761 15.1566C20.3614 15.0031 20.2243 14.9107 20.052 14.8707C19.9643 14.8504 16.9889 14.8353 12.9615 14.8348L6.0221 14.8338L6.02125 7.83666C6.02044 1.08587 6.01786 0.833895 5.94845 0.681016C5.90887 0.593854 5.81101 0.472583 5.73093 0.411523L5.58541 0.300492L3.46496 0.290213C1.45486 0.280434 1.33751 0.283668 1.2107 0.352004ZM4.67464 8.43362V15.2385L3.42342 16.4893L2.17221 17.74V15.671V13.6019H2.56343C2.91069 13.6019 2.97302 13.5911 3.11797 13.5062C3.30469 13.3967 3.44267 13.1567 3.44267 12.9413C3.44267 12.7405 3.29018 12.4812 3.11254 12.3801C2.98353 12.3068 2.90369 12.2941 2.56682 12.2935L2.17221 12.2929V11.0224V9.75198H2.53918C2.94734 9.75198 3.09703 9.70682 3.25734 9.53535C3.54061 9.2324 3.48387 8.76579 3.13576 8.53541C2.99454 8.44194 2.93191 8.42819 2.57448 8.41233L2.17221 8.39443V7.14826V5.90209L2.52832 5.90124C2.94927 5.90024 3.14623 5.82878 3.30623 5.61896C3.57988 5.26019 3.39135 4.71724 2.95062 4.59482C2.87189 4.57295 2.66453 4.55497 2.48982 4.55485L2.17221 4.55462V3.09166V1.62871H3.42342H4.67464V8.43362Z"
                fill="url(#paint0_linear_451_2547)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_451_2547"
                  x1="10.7092"
                  y1="0.286133"
                  x2="10.7092"
                  y2="20.0312"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#E4404A" />
                  <stop offset="1" stopColor="#EB4B5E" />
                </linearGradient>
              </defs>
            </svg>

            <p className="ml-2">
              {coveredArea} {coveredAreaUnits}
            </p>
          </div>
        </div>

        <div data-project-unitssold className="flex justify-center">
          <div className="mr-7 hidden flex-col items-center font-metropolis-semibold text-nk-red md:flex">
            <p>
              <span className="invisible">{unitsSold}</span> Units Sold
            </p>

            <div className="mt-2 h-2.5 w-full min-w-[11.875rem] rounded-full bg-nk-gray lg:min-w-[13.75rem]">
              <div
                className="h-2.5 rounded-full bg-nk-red"
                style={{ width: `${(unitsSold / totalUnits) * 100}%` }}
              ></div>
            </div>
          </div>

          <InquiresComponent />
        </div>
      </section>

      <section className="my-6 flex flex-wrap justify-center gap-0.5 overflow-hidden rounded-xl lg:w-full">
        {details.map((detail, index) => (
          <div
            key={index}
            className="min-w-fit flex-1 bg-white px-4 py-2 lg:px-5 lg:py-3"
          >
            <h3 className="font-metropolis-semibold text-xs text-nk-red md:text-base">
              {detail.title}
            </h3>
            <p className="text-sm text-black md:text-lg">{detail.value}</p>
          </div>
        ))}
      </section>

      <p className="mt-2 whitespace-pre-line text-center text-sm md:text-base lg:text-justify lg:text-lg">
        {description}
      </p>
    </section>
  );
};

export default ProjectIntroduction;
