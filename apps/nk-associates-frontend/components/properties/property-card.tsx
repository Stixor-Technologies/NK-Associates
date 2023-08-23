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
  const categoryTextSize = actMap || actSim ? "text-[0.688rem]" : "text-sm";
  return (
    <div
      // className={`${actSim && "flex-grow max-w-[18.125rem] min-w-[17.288rem]"}`}
      // className={`${(actSim || actFeatured) && "flex-grow min-w-[17.288rem]"} ${
      //   actSim ? "max-w-[18.125rem]" : actFeatured ? "max-w-[384px] w-full" : ""
      // }`}
      className={`${(actSim || actFeatured) && "flex-grow"} ${
        actSim
          ? "min-w-[17.288rem] max-w-[18.125rem]"
          : actFeatured
          ? "min-w-[374px] max-w-[384px] w-full"
          : "min-w-[17.288rem]"
      }`}
    >
      <Link
        href={`/properties/${id}`}
        target={actMap ? "_blank" : "_self"}
        rel={actMap ? "noopener noreferrer" : undefined}
      >
        <div
          // className={`aspect-w-1 aspect-h-1 group relative w-full max-w-[37.5rem] overflow-hidden ${
          //   actMap ? "h-52 rounded-t-xl" : "h-[17.5rem] rounded-xl"
          // }`}
          className={`aspect-w-1 aspect-h-1 group relative w-full max-w-[37.5rem] overflow-hidden ${
            actMap
              ? "h-52 rounded-t-xl"
              : actFeatured
              ? "h-[358px]"
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
              className={`rounded-full bg-white px-4 py-1 text-nk-gray shadow-lg md:text-xs ${categoryTextSize}`}
            >
              {category}
            </span>
            <span
              className={`rounded-full bg-white px-4 py-1 text-nk-gray shadow-lg md:text-xs ${categoryTextSize}`}
            >
              {purpose}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Image src={Area_Icon} width={13} height={13} alt="" />
            <span
              className={`font-metropolis-light text-nk-grey md:text-[0.625rem] ${
                actMap || actSim ? "text-[0.563rem]" : "text-xs"
              }`}
            >
              {area} {area_type}
            </span>
          </div>
        </div>
        <h2
          className={`font-metropolis text-nk-black md:text-base ${
            actMap ? "text-[0.911rem]" : actSim ? "text-sm" : "text-xl"
          }`}
        >
          {title.length > 32 ? `${title.substring(0, 32)} ...` : title}
        </h2>

        <p
          className={`my-1 font-metropolis-bold text-nk-black md:text-lg ${
            actMap
              ? "text-[0.911rem]"
              : actSim
              ? "text-base"
              : "text-[1.375rem]"
          }`}
        >
          {`Rs. ${convertToPakistaniNumbering(price)}`}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <Image
            src={Area_Marker}
            width={12}
            height={18}
            alt="address-marker"
            className={`${actSim && "w-2.5"}`}
          />

          <p
            className={`font-metropolis-light text-nk-grey md:text-xs ${
              actMap ? "text-[0.684rem]" : actSim ? "text-xs" : "text-sm"
            }`}
          >
            {address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
