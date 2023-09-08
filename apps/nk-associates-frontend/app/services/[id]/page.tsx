import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServiceDetail, getContactNumber } from "../../../utils/api-calls";
import { whatsAppChatLink } from "../../../utils/utils";
import { Services } from "../../../utils/types/types";
import ProcessSteps from "../../../components/services/service-detail/process-steps";
import ExpertiseOutcomes from "../../../components/services/service-detail/expertise-outcomes";
import WhatsAppIcon from "../../../public/assets/icons/whatsapp-white-icon.svg";
import WhatsAppAlternateIcon from "../../../public/assets/icons/whatsapp-inverse.svg";
import PhoneIcon from "../../../public/assets/icons/phone-white-icon.svg";
import PhoneAlternateIcon from "../../../public/assets/icons/phone-icon.svg";

interface ServiceDetailProps {
  params: {
    id: string;
  };
}

async function ServiceDetail({ params: { id } }: ServiceDetailProps) {
  const data: Services = await getServiceDetail(id);
  const {
    title,
    description,
    process,
    expertise,
    outcome,
    expertise_image,
    outcome_image,
  } = data?.attributes;
  const descriptionParas: string[] | string = description.split("\n\n");
  const expertiseImage = expertise_image?.data?.attributes?.url;
  const outcomeImage = outcome_image?.data?.attributes?.url;

  const contactNumber = await getContactNumber();
  const number = contactNumber?.data?.attributes.number;

  const whatsppChat = whatsAppChatLink(number);

  return (
    <section className="bg-right-top bg-no-repeat md:bg-nk-bg">
      <div className="overflow-hidden">
        <div className="container text-center py-6 md:py-20">
          <h1 className="text-3xl font-metropolis-bold text-nk-black md:text-5xl">
            {title}
          </h1>
          {descriptionParas.map((paragraph: string, index: number) => (
            <p
              key={index}
              className="text-sm font-metropolis-thin text-nk-black py-3 md:text-[1.25rem] md:leading-snug md:py-7"
            >
              {descriptionParas}
            </p>
          ))}

          {number && (
            <div className="flex items-center justify-center gap-5 md:py-7">
              <Link
                href={`tel:+${number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-full border hover:text-nk-red w-[10.5rem] bg-nk-red py-2  text-nk-white text-base transition-all duration-300 ease-in-out hover:bg-white md:w-[14.125rem] md:py-2.5 md:text-lg"
              >
                Call Us
                <Image
                  src={PhoneIcon}
                  alt="call-icon"
                  width={25}
                  height={25}
                  className="group-hover:hidden block"
                />
                <Image
                  src={PhoneAlternateIcon}
                  alt="call-icon"
                  width={25}
                  height={25}
                  className="group-hover:block hidden"
                />
              </Link>
              {/* <PhoneButton /> */}

              <Link
                href={whatsppChat}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-full border hover:text-nk-red w-[10.5rem] bg-nk-red py-2  text-nk-white text-base transition-all duration-300 ease-in-out hover:bg-white md:w-[14.125rem] md:py-2.5 md:text-lg"
              >
                Whatsapp
                <Image
                  src={WhatsAppIcon}
                  alt="whats-app-icon"
                  width={25}
                  height={25}
                  className="group-hover:hidden block"
                />
                <Image
                  src={WhatsAppAlternateIcon}
                  alt="whats-app-icon"
                  width={25}
                  height={25}
                  className="group-hover:block hidden"
                />
              </Link>
            </div>
          )}
        </div>
        <ProcessSteps process={process} />
        <ExpertiseOutcomes
          expertise={expertise}
          expertise_image={expertiseImage}
          outcome={outcome}
          outcome_image={outcomeImage}
        />
      </div>
    </section>
  );
}

export default ServiceDetail;
