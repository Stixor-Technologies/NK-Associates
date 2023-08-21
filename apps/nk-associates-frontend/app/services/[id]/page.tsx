import React, { FC, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ProcessSteps from "../../../components/services/service-detail/process-steps";
import ExpertiseOutcomes from "../../../components/services/service-detail/expertise-outcomes";
import WhatsAppIcon from "../../../public/assets/icons/whatsapp-white-icon.svg";
import PhoneIcon from "../../../public/assets/icons/phone-white-icon.svg";

interface ServiceDetailProps {
  params: {
    id: string;
  };
}

async function ServiceDetail({ params: { id } }: ServiceDetailProps) {
  // const ServiceDetail: FC<ServiceDetailProps> = () => {

  return (
    <section className="bg-right-top bg-no-repeat md:bg-nk-bg">
      <div className="container overflow-hidden">
        <div className="text-center py-6 md:py-20">
          <h1 className="text-3xl font-metropolis-bold text-nk-black md:text-5xl">
            NK Design and Construction
          </h1>
          <p className="text-sm font-metropolis-thin text-nk-black py-5 md:text-[1.25rem] md:leading-snug md:py-7">
            NK Design and Construction is a real estate development company that
            specializes in providing bespoke services for residential and
            commercial properties in Pakistan. The company mastery of
            architecture, construction, and interior design results in
            spectacular outcomes that prioritize client satisfaction. NK Design
            and Construction is committed to providing its clients with the
            highest quality real estate development services, and its team of
            experienced professionals is dedicated to creating beautiful and
            functional spaces. NK Design and Construction company has a proven
            track record of delivering exceptional outcomes for its clients, and
            its team of experienced professionals is dedicated to creating
            spaces that are both beautiful and functional. Entrust NK Design and
            Construction with your dream residential or commercial project, and
            witness their unwavering dedication to excellence firsthand.
          </p>
          <div className="flex items-center justify-center gap-5 md:py-7">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-full border w-[10.5rem] bg-nk-red py-2  text-nk-white text-base transition-all duration-300 ease-in-out hover:bg-nk-gradient-red-sharp-one md:w-[14.125rem] md:py-2.5 md:text-lg"
            >
              Call Us
              <Image src={PhoneIcon} alt="call-icon" width={25} height={25} />
            </Link>

            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 rounded-full border w-[10.5rem] bg-nk-red py-2 text-base text-nk-white transition-all duration-300 ease-in-out hover:bg-nk-gradient-red-sharp-one md:w-[14.125rem] md:py-2.5 md:text-lg"
            >
              Whatsapp
              <Image
                src={WhatsAppIcon}
                alt="whats-app-icon"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>
        <ProcessSteps />
        <ExpertiseOutcomes />
      </div>
    </section>
  );
}

export default ServiceDetail;
