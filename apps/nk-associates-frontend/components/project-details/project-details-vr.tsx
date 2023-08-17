"use client";

import { useState } from "react";
import Image from "next/image";

import VRModel from "./vr-model";

import NKTitleLogo from "../../public/assets/icons/nk-title-logo.svg";

type PropTypes = {
  modelURL: string | undefined;
};

const ProjectDetailsVR = ({ modelURL = undefined }: PropTypes) => {
  const [showModel, toggleShowModel] = useState(false);

  const handleShowModel = () => {
    toggleShowModel((val) => !val);
  };

  const commonClasses =
    "transition-all relative w-full flex-shrink-0 h-[16.625rem] xs:h-[18.625rem] sm:h-[23.625rem] md:h-[28.625rem] lg:min-h-[35.375rem] xl:h-[39.375rem]";
  const stageClasses = `${commonClasses} ${
    showModel ? "-translate-x-full" : "translate-x-0"
  } bg-red-300 bg-cover [background-image:url('/assets/images/bg-project.jpeg')]`;
  const modelClasses = `${commonClasses} ${
    showModel ? "-translate-x-full" : "translate-x-0"
  }`;

  return (
    <section className="w-full flex flex-nowrap overflow-hidden">
      <section data-project-3d className={stageClasses}>
        <div className="absolute left-0 top-0 h-full w-full bg-black/50" />
        <section className="container relative mx-auto flex h-full flex-1 flex-col items-center justify-center p-4 text-white md:p-6 xl:p-8">
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleShowModel}
              className="mb-2 text-white hover:text-nk-red"
              title="Explore 3D model"
            >
              <svg
                className="h-[4.75rem] w-[4.75rem] md:h-[6.875rem] md:w-[6.875rem] lg:h-[7.575rem] lg:w-[7.575rem] transition-colors"
                viewBox="0 0 76 78"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_451_3122"
                  // style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="4"
                  y="5"
                  width="68"
                  height="68"
                >
                  <path
                    className="stroke-white fill-white hover:stroke-nk-red hover:fill-nk-red"
                    d="M37.9992 71.0636C55.4887 71.0636 69.6659 56.6999 69.6659 38.9803C69.6659 21.2607 55.4887 6.89697 37.9992 6.89697C20.5097 6.89697 6.33252 21.2607 6.33252 38.9803C6.33252 56.6999 20.5097 71.0636 37.9992 71.0636Z"
                    fill="currentColor"
                    stroke="currentStroke"
                    strokeWidth="2.97033"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M31.6658 38.9804V27.8667L41.1658 33.4235L50.6658 38.9804L41.1658 44.5372L31.6658 50.094V38.9804Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="2.97033"
                    strokeLinejoin="round"
                  />
                </mask>
                <g mask="url(#mask0_451_3122)">
                  <path
                    d="M-0.000488281 0.480469H75.9995V77.4805H-0.000488281V0.480469Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>

            <h1 className="font-metropolis-semibold md:text-xl lg:text-2xl">
              Explore 3d Space
            </h1>
          </div>

          <div className="absolute bottom-0 mb-4 flex flex-col items-center justify-center md:mb-6 xl:mb-8">
            <p className="mb-1 text-xs md:text-sm lg:text-lg">Powered By</p>
            <Image
              className="h-5 w-auto md:h-7 lg:h-8"
              src={NKTitleLogo}
              alt="NK Title Logo"
            />
          </div>

          <div className="absolute bottom-0 right-0 mb-4 mr-4 md:mb-6 xl:mb-8 md:mr-6 xl:mr-8">
            <button className="mr-1 rounded bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.727 0.757812C19.2672 0.757812 24.5687 6.14351 24.5687 12.7875C24.5687 19.4315 19.2672 24.8172 12.727 24.8172C10.6343 24.8206 8.57844 24.258 6.77061 23.1872L0.890007 24.8172L2.49101 18.8409C1.43602 17.0038 0.881774 14.9144 0.88527 12.7875C0.88527 6.14351 6.18682 0.757812 12.727 0.757812ZM8.69134 7.13355L8.45451 7.14318C8.30118 7.15266 8.15133 7.19358 8.01399 7.26347C7.88554 7.33737 7.76827 7.42975 7.66585 7.53775C7.52375 7.67369 7.44322 7.79158 7.35678 7.90586C6.91878 8.48437 6.68295 9.19462 6.68654 9.92444C6.6889 10.5139 6.84048 11.0877 7.07731 11.6242C7.56164 12.7093 8.35859 13.8582 9.41014 14.9228C9.66355 15.179 9.91222 15.4364 10.1798 15.6758C11.4865 16.8445 13.0435 17.6873 14.7271 18.1371L15.3997 18.2418C15.6188 18.2538 15.8378 18.237 16.0581 18.2261C16.403 18.208 16.7397 18.1132 17.0445 17.9482C17.1996 17.8671 17.3509 17.7788 17.498 17.6836C17.498 17.6836 17.549 17.6499 17.6461 17.5753C17.8059 17.455 17.9042 17.3696 18.0368 17.2289C18.1351 17.1254 18.2204 17.0039 18.2855 16.8656C18.3779 16.6695 18.4702 16.2954 18.5081 15.9838C18.5366 15.7456 18.5283 15.6157 18.5247 15.5351C18.52 15.4064 18.4146 15.2728 18.2997 15.2163L17.6105 14.9023C17.6105 14.9023 16.5803 14.4464 15.9503 14.1553C15.8844 14.126 15.8138 14.1093 15.7419 14.106C15.6609 14.0975 15.579 14.1068 15.5018 14.1331C15.4246 14.1595 15.3539 14.2023 15.2943 14.2587C15.2884 14.2563 15.209 14.3249 14.3529 15.3787C14.3037 15.4458 14.236 15.4965 14.1584 15.5243C14.0808 15.5522 13.9968 15.5559 13.9171 15.5351C13.84 15.5141 13.7644 15.4875 13.6909 15.4557C13.5441 15.3931 13.4932 15.3691 13.3925 15.3258C12.7129 15.0245 12.0836 14.6174 11.5274 14.1192C11.3782 13.9869 11.2397 13.8425 11.0976 13.703C10.6317 13.2497 10.2257 12.737 9.88972 12.1776L9.81986 12.0633C9.76968 11.9865 9.7291 11.9037 9.69907 11.8167C9.65408 11.6399 9.77131 11.4979 9.77131 11.4979C9.77131 11.4979 10.0591 11.1779 10.1929 11.0047C10.3231 10.8363 10.4333 10.6727 10.5043 10.556C10.644 10.3274 10.6879 10.0929 10.6144 9.91121C10.2829 9.08838 9.93946 8.26916 9.58658 7.45595C9.51671 7.29475 9.30948 7.17926 9.1212 7.15641C9.05725 7.14919 8.99331 7.14197 8.92936 7.13716C8.77033 7.12913 8.61098 7.13074 8.45214 7.14197L8.69016 7.13235L8.69134 7.13355Z"
                  fill="url(#paint0_linear_451_2520)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_451_2520"
                    x1="12.727"
                    y1="0.757812"
                    x2="12.727"
                    y2="24.8172"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E4404A" />
                    <stop offset="1" stopColor="#EB4B5E" />
                  </linearGradient>
                </defs>
              </svg>
            </button>

            <button className="rounded bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2">
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                viewBox="0 0 63 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M52.3688 56C46.725 56 41.2239 54.7218 35.8654 52.1653C30.5069 49.6089 25.76 46.2311 21.6248 42.032C17.4895 37.8329 14.1645 33.0107 11.6498 27.5653C9.135 22.12 7.87675 16.5316 7.875 10.8C7.875 10 8.1375 9.33333 8.6625 8.8C9.1875 8.26667 9.84375 8 10.6313 8H21.2625C21.875 8 22.4219 8.2 22.9031 8.6C23.3844 9 23.6688 9.51111 23.7563 10.1333L25.4625 19.4667C25.55 20.0889 25.5386 20.656 25.4284 21.168C25.3181 21.68 25.067 22.1351 24.675 22.5333L18.375 29.0667C20.2125 32.2667 22.5094 35.2667 25.2656 38.0667C28.0219 40.8667 31.0625 43.2889 34.3875 45.3333L40.5562 39.0667C40.95 38.6667 41.4645 38.3671 42.0998 38.168C42.735 37.9689 43.358 37.9129 43.9688 38L53.025 39.8667C53.6375 40 54.1406 40.3004 54.5344 40.768C54.9281 41.2356 55.125 41.7796 55.125 42.4V53.2C55.125 54 54.8625 54.6667 54.3375 55.2C53.8125 55.7333 53.1563 56 52.3688 56Z"
                  fill="url(#paint0_linear_171_3726)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_171_3726"
                    x1="31.5"
                    y1="8"
                    x2="31.5"
                    y2="56"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#E4404A" />
                    <stop offset="1" stopColor="#EB4B5E" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </div>
        </section>
      </section>

      <section className={modelClasses}>
        {modelURL && <VRModel modelURL={modelURL} />}
        <button
          className="absolute p-3 bottom-0 z-[2000] text-nk-red hover:text-white hover:bg-nk-red transition-colors"
          title="Hide 3D model"
          onClick={handleShowModel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
            />
          </svg>
        </button>
      </section>
    </section>
  );
};

export default ProjectDetailsVR;
