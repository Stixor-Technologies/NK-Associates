"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "../../utils/types/types";
import { convertToPakistaniNumbering } from "../../utils/utils";
import Area_Icon from "../../public/assets/icons/area-icon.svg";
import Area_Marker from "../../public/assets/icons/area-marker.svg";
import { BASE_URL } from "../../utils/constants";

interface CardProps {
  property: Property;
  actMap?: boolean;
  actSim?: boolean;
  actFeatured?: boolean;
}

const PropertyCard: FC<CardProps> = ({
  property,
  actMap,
  actSim,
  actFeatured,
}) => {
  const { title, category, purpose, area, area_type, type, price, address } =
    property?.attributes;
  const id = property?.id;
  const thumbnailImage =
    property?.attributes?.image_thumbnail?.data?.attributes?.url;
  const categoryTextSize = actFeatured
    ? "text-[0.688rem] md:text-base"
    : actMap || actSim
    ? "text-[0.688rem] md:text-xs"
    : "text-sm md:text-xs";

  const titleTextSize = actFeatured
    ? "text-base md:text-[1.313rem]"
    : actMap
    ? "text-[0.911rem] md:text-base"
    : actSim
    ? "text-sm md:text-base"
    : "text-xl md:text-base";

  const priceTextSize = actFeatured
    ? "text-base md:text-[1.5rem]"
    : actMap
    ? "text-[0.911rem] md:text-lg"
    : actSim
    ? "text-base md:text-lg"
    : "text-[1.375rem] md:text-lg";

  const addressTextSize = actFeatured
    ? "text-xs md:text-base"
    : actMap
    ? "text-[0.684rem] md:text-xs"
    : actSim
    ? "text-xs md:text-xs"
    : "text-sm md:text-xs";

  return (
    <div
      className={`${(actSim || actFeatured) && "flex-grow"} ${
        actSim
          ? "min-w-[17.288rem] max-w-[18.125rem]"
          : actFeatured
          ? "min-w-[17.25rem]  md:min-w-[22.125rem] md:max-w-[24rem] w-full"
          : "min-w-[17.288rem]"
      }`}
    >
      <Link
        href={`/properties/${id}`}
        target={actMap ? "_blank" : "_self"}
        rel={actMap ? "noopener noreferrer" : undefined}
      >
        <div
          className={`aspect-w-1 aspect-h-1 group relative w-full max-w-[37.5rem] overflow-hidden ${
            actMap
              ? "h-52 rounded-t-xl"
              : actFeatured
              ? "h-[17.5rem] md:h-[22.375rem]"
              : "h-[17.5rem]"
          } rounded-xl`}
        >
          <Image
            src={`${BASE_URL}${thumbnailImage || "/"}`}
            fill
            alt=""
            className={`object-cover transition-all duration-700 ease-in-out ${
              !actMap && "hover:scale-110"
            }`}
          />
        </div>
      </Link>

      <div className={`${actMap && "bg-nk-white px-3 pb-4"}`}>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full bg-white px-4 py-1 text-nk-gray shadow-lg ${categoryTextSize}`}
            >
              {category}
            </span>
            <span
              className={`rounded-full bg-white px-4 py-1 text-nk-gray shadow-lg ${categoryTextSize}`}
            >
              {purpose}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Image
              src={Area_Icon}
              width={13}
              height={13}
              alt=""
              className={`${actFeatured && "w-3 md:w-4"}`}
            />
            <span
              className={`font-metropolis-light text-nk-grey ${
                actFeatured
                  ? "text-[0.563rem] md:text-[0.813rem]"
                  : actMap || actSim
                  ? "text-[0.563rem]"
                  : "text-xs"
              }`}
            >
              {area} {area_type}
            </span>
          </div>
        </div>
        <h2
          className={`font-metropolis text-nk-black line-clamp-1 ${titleTextSize}`}
        >
          {title}
        </h2>
        <p
          className={`font-metropolis-bold text-nk-black ${
            actFeatured ? "my-2" : "my-1"
          } ${priceTextSize}`}
        >
          {`Rs. ${convertToPakistaniNumbering(price)}`}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <Image
            src={Area_Marker}
            width={12}
            height={18}
            alt="address-marker"
            className={`${actFeatured ? "w-3" : actSim ? "w-2.5" : ""}`}
          />
          <p
            className={`font-metropolis-light text-nk-grey ${addressTextSize}`}
          >
            {address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
