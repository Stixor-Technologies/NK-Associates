import React, { FC } from "react";
import { BASE_URL } from "../../utils/constants";
import Arrow from "../../public/assets/images/Arrow.svg";
import Image from "next/image";
import Link from "next/link";
import { Services } from "../../utils/types/types";

interface CardProps {
  service: Services;
}

const ServiceCard: FC<CardProps> = ({ service }) => {
  const { title, description, company } = service?.attributes;
  const id = service?.id;
  const thumbnailImage =
    service?.attributes?.service_image?.data?.attributes?.url;
  const company_logo = service?.attributes?.company_logo?.data?.attributes?.url;
  return (
    <div className="service-card flex-col relative items-start justify-center above-md:min-h-screen above-md:h-full">
      <div className="left-0 right-0 my-6 border bg-custom-gradient rounded-xl flex-col md:flex-row justify-center md:my-12 md:mx-auto above-md:absolute">
        <div className="justify-center text-center text-nk-black p-2 sm:flex sm:gap-4 sm:p-3 md:p-4 lg:gap-8">
          <Link
            href={`services/${id}`}
            rel="noopener noreferrer"
            className="block relative sm:w-1/2 lg:w-[45%] min-h-[18.75rem] lg:min-h-[25rem] w-full h-full rounded-xl overflow-hidden items-center justify-center my-auto"
          >
            <Image
              src={`${BASE_URL}${thumbnailImage || "/"}`}
              alt="service-card"
              fill
              className="w-full h-full mx-auto object-cover"
            />
          </Link>

          {/* Text section */}
          <div className="relative py-4 lg:py-8 md:pr-3 sm:w-1/2 md:flex-col sm:text-left lg:w-[55%]">
            <h1 className="font-metropolis-bold text-2xl lg:pb-2 lg:pt-6 lg:text-3xl">
              {title}
            </h1>

            <div className="my-2 md:my-3 line-clamp-4 lg:line-clamp-6">
              <p className="break-words sm:block text-sm font-metropolis-thin md:text-xl ">
                {description}
              </p>
            </div>

            <div className="my-4">
              <span className=" font-metropolis-extralight text-nk-gray">
                Powered By:{" "}
              </span>
              <span className="text-nk-red font-metropolis-semibold">
                {company}
              </span>
            </div>

            {company_logo && (
              <Image
                src={`${BASE_URL}${company_logo}`}
                alt="service Logo"
                className="mx-auto pt-2 sm:mx-0 md:pt-0"
                width={190}
                height={47}
              />
            )}

            <Link
              href={`services/${id}`}
              rel="noopener noreferrer"
              className="hidden group absolute bottom-0 right-0 sm:block"
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

export default ServiceCard;
