import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServiceDetail, getContactNumber } from "../../../utils/api-calls";
import { whatsAppChatLink } from "../../../utils/utils";
import { Services } from "../../../utils/types/types";
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

  const data: Services = await getServiceDetail(id);
  const { title, description, process, expertise } = data?.attributes;
  const descriptionParas: string[] | string = description.split("\n\n");

  const contactNumber = await getContactNumber();
  const number = contactNumber?.data?.attributes.number;

  const whatsppChat = whatsAppChatLink(number);

  return (
    <section className="bg-right-top bg-no-repeat md:bg-nk-bg">
      <div className="container overflow-hidden">
        <div className="text-center py-6 md:py-20">
          <h1 className="text-3xl font-metropolis-bold text-nk-black md:text-5xl">
            {title}
          </h1>
          <p className="text-sm font-metropolis-thin text-nk-black py-5 md:text-[1.25rem] md:leading-snug md:py-7">
            {descriptionParas}
          </p>

          {number && (
            <div className="flex items-center justify-center gap-5 md:py-7">
              <Link
                href={`tel:+${number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-full border w-[10.5rem] bg-nk-red py-2  text-nk-white text-base transition-all duration-300 ease-in-out hover:bg-nk-gradient-red-sharp-one md:w-[14.125rem] md:py-2.5 md:text-lg"
              >
                Call Us
                <Image src={PhoneIcon} alt="call-icon" width={25} height={25} />
              </Link>

              <Link
                href={whatsppChat}
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
          )}
        </div>
        <ProcessSteps process={process} />
        <ExpertiseOutcomes expertise={expertise} />
      </div>
    </section>
  );
}

export default ServiceDetail;
