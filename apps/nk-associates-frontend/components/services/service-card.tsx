import React, { FC } from "react";
import { BASE_URL } from "../../utils/constants";
import ServiceLogo from "../../public/assets/images/serviceLogo.svg";
import Arrow from "../../public/assets/images/arrow.svg";
import Image from "next/image";
import Link from "next/link";
import { Service } from "../../utils/types/types";

interface CardProps {
  service: Service;
}

const serviceCard: FC<CardProps> = ({ service }) => {
  const { title, description, company } = service?.attributes;
  const id = service?.id;
  const thumbnailImage = service?.attributes?.image?.data?.attributes?.url;
  const logo = service?.attributes?.logo?.data?.attributes?.url;
  // bg-custom-gradient
  return (
    <div className="service-card min-h-screen h-full flex-col relative items-start justify-center">
      <div className="absolute left-0 right-0 my-12 border bg-nk-white rounded-xl flex-col md:flex-row justify-center md:mx-auto ">
        <div className="justify-center text-center text-nk-black p-4 md:flex md:gap-4 lg:gap-8">
          <Link
            href={`service/${id}`}
            rel="noopener noreferrer"
            className="block relative md:w-1/2 lg:w-[45%] max-w-xl w-full min-h-[400px] h-full rounded-xl overflow-hidden items-center justify-center my-auto"
          >
            <Image
              src={`${BASE_URL}${thumbnailImage || "/"}`}
              alt="service-card"
              fill
              className="w-full h-full mx-auto object-cover"
            />
          </Link>

          {/* Text section */}
          <div className="relative py-4 md:py-8 md:pr-3 md:w-1/2 md:flex-col md:text-left lg:w-[55%]">
            <h1 className="font-metropolis-bold text-2xl pb-2 md:pt-6 lg:text-3xl">
              {title}
            </h1>
            <p className="text-sm font-metropolis-thin my-2 md:my-4 md:text-xl md:leading-none lg:leading-normal">
              {description}
            </p>

            <Image
              src={`${BASE_URL}${logo || "/"}`}
              alt="service Logo"
              className="mx-auto pt-2 md:mx-0 md:pt-0"
              width={190}
              height={47}
            />
            <Link
              href={`service/${id}`}
              rel="noopener noreferrer"
              className="group absolute bottom-0 right-0"
            >
              <Image
                src={Arrow}
                width={30}
                height={20}
                alt="move-arrow"
                className="transition-all duration-300 ease-in-out group-hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serviceCard;
