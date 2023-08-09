import Image from "next/image";
import PlayIcon from "../../public/assets/icons/play-icon.svg";
import NKTitleLogo from "../../public/assets/icons/nk-title-logo.svg";
import WhatsappLogo from "../../public/assets/icons/whatsapp-logo.svg";
import PhoneIcon from "../../public/assets/icons/phone-icon.svg";

const ProjectDetailsVR = () => {
  return (
    <section className="relative h-[16.625rem] min-h-[16.625rem] bg-red-300 [background-image:url('/assets/images/bg-project.jpeg')] bg-cover lg:h-[39.375rem] lg:min-h-[39.375rem]">
      <div className="absolute left-0 top-0 h-full w-full bg-black/50" />
      <section className="container relative mx-auto flex h-full flex-1 flex-col items-center justify-center p-4 text-white lg:p-10">
        <div className="flex flex-col items-center justify-center">
          <button className="mb-2">
            <Image
              className=" h-[4.75rem] w-[4.75rem] lg:h-[8.875rem] lg:w-[8.875rem]"
              src={PlayIcon}
              alt="Play Virtual Tour"
            />
          </button>
          <h1 className="font-metropolis-semibold lg:text-3xl">
            Explore 3d Space
          </h1>
        </div>

        <div className="absolute bottom-0 mb-4 flex flex-col items-center justify-center lg:mb-10">
          <p className="mb-1 text-xs lg:text-xl">Powered By</p>
          <Image
            className="h-5 w-auto lg:h-12"
            src={NKTitleLogo}
            alt="NK Title Logo"
          />
        </div>

        <div className="absolute bottom-0 right-0 mb-4 mr-4 lg:mb-10 lg:mr-10">
          <button className="mr-1 rounded bg-white px-3 py-1.5 lg:px-6 lg:py-3">
            <Image
              className="h-7 w-7 lg:h-14 lg:w-14"
              src={WhatsappLogo}
              alt="Contact us via Whatsapp"
            />
          </button>

          <button className="rounded bg-white px-3 py-1.5 lg:px-6 lg:py-3">
            <Image
              className="h-7 w-7 lg:h-14 lg:w-14"
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