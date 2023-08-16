import React, { FC } from "react";
import { BASE_URL } from "../../utils/constants";
import ServiceLogo from "../../public/assets/images/serviceLogo.svg";
import Arrow from "../../public/assets/images/arrow.svg";
import Image from "next/image";
import Link from "next/link";
import { Service } from "../../utils/types/types";

interface CardProps {
  service: Service;
  actMap?: boolean;
}

const serviceCard: FC<CardProps> = ({ service, actMap }) => {
  const { title, description } = service?.attributes;
  const id = service?.id;
  const thumbnailImage = service?.attributes?.image?.data?.attributes?.url;
  const logo = service?.attributes?.logo?.data?.attributes?.url;

  return (
    <div>
      <div className="mx-1 my-4 p-1 lg:px-3 border bg-gradient-to-b from-nk-off-white to-nk-background rounded-xl flex-col md:flex-row justify-center md:mx-auto md:w-5/6 ">
        <div className="justify-center text-center text-nk-dark-gray py-2 md:flex md:gap-4 lg:gap-8">
          <div className="relative md:w-1/2 lg:w-2/5 min-h-[400px] mx-2 rounded-xl overflow-hidden items-center justify-center my-auto">
            <Image
              src={`${BASE_URL}${thumbnailImage || "/"}`}
              alt="service-card"
              fill
              className="w-full h-full mx-auto object-cover"
            />
          </div>
          <div className="md:flex-col md:text-left md:w-1/2 lg:w-3/5 md:my-auto">
            <h1 className="font-metropolis-bold text-2xl lg:text-3xl my-4">
              {title}
            </h1>
            <p className="text-sm lg:text-xl font-metropolis-light">
              {description}
            </p>
            <div className="flex justify-center md:justify-between ">
              <Image
                src={`${BASE_URL}${logo || "/"}`}
                alt="service Logo"
                className="mt-5 mb-2"
                width={190}
                height={47}
              />
              <button className="mt-20 md:block hidden">
                <Link
                  href={`service/${id}`}
                  target={actMap ? "_blank" : "_self"}
                  rel={actMap ? "noopener noreferrer" : undefined}
                >
                  <Image src={Arrow} alt="arrow" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serviceCard;
