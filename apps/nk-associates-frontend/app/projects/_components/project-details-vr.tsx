import Image from "next/image";
import PlayIcon from "../../../public/assets/icons/play-icon.svg";
import NKTitleLogo from "../../../public/assets/icons/nk-title-logo.svg";
import WhatsappLogo from "../../../public/assets/icons/whatsapp-logo.svg";
import PhoneIcon from "../../../public/assets/icons/phone-icon.svg";

const ProjectDetailsVR = () => {
  return (
    <section className="relative h-[16.625rem] min-h-[16.625rem] md:h-[22.625rem] bg-red-300 bg-cover [background-image:url('/assets/images/bg-project.jpeg')] lg:h-[39.375rem] lg:min-h-[39.375rem]">
      <div className="absolute left-0 top-0 h-full w-full bg-black/50" />
      <section className="container relative mx-auto flex h-full flex-1 flex-col items-center justify-center p-4 text-white lg:p-10">
        <div className="flex flex-col items-center justify-center">
          <button className="mb-2">
            <svg
              className="h-[4.75rem] w-[4.75rem] lg:h-[8.875rem] lg:w-[8.875rem]"
              viewBox="0 0 76 78"
              fill="none"
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
                  d="M37.9992 71.0636C55.4887 71.0636 69.6659 56.6999 69.6659 38.9803C69.6659 21.2607 55.4887 6.89697 37.9992 6.89697C20.5097 6.89697 6.33252 21.2607 6.33252 38.9803C6.33252 56.6999 20.5097 71.0636 37.9992 71.0636Z"
                  fill="white"
                  stroke="white"
                  stroke-width="2.97033"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.6658 38.9804V27.8667L41.1658 33.4235L50.6658 38.9804L41.1658 44.5372L31.6658 50.094V38.9804Z"
                  fill="black"
                  stroke="black"
                  stroke-width="2.97033"
                  stroke-linejoin="round"
                />
              </mask>
              <g mask="url(#mask0_451_3122)">
                <path
                  d="M-0.000488281 0.480469H75.9995V77.4805H-0.000488281V0.480469Z"
                  fill="white"
                />
              </g>
            </svg>
          </button>

          <h1 className="font-metropolis-semibold md:text-xl lg:text-2xl">
            Explore 3d Space
          </h1>
        </div>

        <div className="absolute bottom-0 mb-4 flex flex-col items-center justify-center lg:mb-10">
          <p className="mb-1 text-xs md:text-sm lg:text-lg">Powered By</p>
          <Image
            className="h-5 w-auto md:h-6 lg:h-10"
            src={NKTitleLogo}
            alt="NK Title Logo"
          />
        </div>

        <div className="absolute bottom-0 right-0 mb-4 mr-4 lg:mb-10 lg:mr-10">
          <button className="mr-1 rounded bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2">
            <Image
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-10 md:w-10"
              src={WhatsappLogo}
              alt="Contact us via Whatsapp"
            />
          </button>

          <button className="rounded bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2">
            <Image
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-10 md:w-10"
              src={PhoneIcon}
              alt="Contact us via Phone"
            />
          </button>
        </div>
      </section>
    </section>
  );
};

export default ProjectDetailsVR;
