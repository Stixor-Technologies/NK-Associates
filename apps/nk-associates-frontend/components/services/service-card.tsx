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
    <div className="service-card flex-col relative items-start justify-center w-full above-md:h-screen ">
      <div className="left-0 right-0 my-6 border bg-custom-gradient rounded-xl flex-col md:flex-row justify-center lg:my-0 md:mx-auto above-md:absolute">
        <div className="justify-center text-center text-nk-black p-2 sm:flex sm:gap-6 sm:p-3 md:p-4 lg:gap-8 2xl:p-8 2xl:gap-14">
          <Link
            href={`services/${id}`}
            rel="noopener noreferrer"
            className="block relative sm:w-1/2 lg:w-[45%] min-h-[18.75rem] lg:min-h-[29rem] 2xl:min-h-[36rem] w-full h-full rounded-xl overflow-hidden items-center justify-center my-auto"
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
            <h1 className="font-metropolis-bold text-2xl lg:pb-2 lg:pt-6 lg:text-3xl 2xl:text-5xl">
              {title}
            </h1>

            <div className="my-2 md:my-3 line-clamp-4 lg:line-clamp-6">
              <p className="break-words sm:block text-sm font-metropolis-thin md:text-xl 2xl:text-2xl">
                {description}
              </p>
            </div>

            <div className="my-4 2xl:text-2xl">
              <span className="font-metropolis-extralight text-nk-gray">
                Powered By:{" "}
              </span>
              <span className="text-nk-red font-metropolis-semibold">
                {company}
              </span>
            </div>
            {company_logo && (
              <div className="relative mx-auto pt-2 sm:mx-0 md:pt-0 w-[12rem] h-[6rem] 2xl:w-[13rem] 2xl:h-[7rem]">
                <Image
                  src={`${BASE_URL}${company_logo}`}
                  alt={`${title}-logo`}
                  fill
                  className="object-left object-contain"
                />
              </div>
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
                className="transition-all duration-300 ease-in-out group-hover:scale-110 2xl:w-[3.5rem] 2xl:h-[2rem]"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
