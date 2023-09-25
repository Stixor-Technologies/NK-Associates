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
  const {
    title,
    area,
    area_type,
    price,
    address,
    property_category,
    property_type,
    property_purpose,
  } = property?.attributes;
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
      className={`property-card ${(actSim || actFeatured) && "flex-grow"} ${
        actSim
          ? "min-w-[17.288rem] max-w-[18.125rem]"
          : actFeatured
          ? "min-w-[17.25rem] w-full overflow-hidden"
          : ""
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
              ? "h-[17.5rem] aspect-w-1 aspect-h-1 md:h-[22.375rem] lg:h-[19rem] xl:h-[24rem] 2xl:h-[29rem] rounded-xl"
              : "h-[17.5rem] rounded-xl"
          }`}
        >
          <Image
            src={`${BASE_URL}${thumbnailImage || "/"}`}
            fill
            alt=""
            className={`property-image object-cover transition-all duration-700 ease-in-out bg-gray-300 ${
              !actMap && "hover:scale-110"
            }`}
          />
        </div>
      </Link>

      <div
        className={`property-card-text -z-10 relative ${
          actMap && "bg-nk-white px-3 pb-4"
        }`}
      >
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            {property_category && property_category?.data && (
              <span
                className={`rounded-full bg-white px-4 py-1 text-nk-gray shadow-lg ${categoryTextSize}`}
              >
                {property_category?.data?.attributes?.name}
              </span>
            )}
            {property_purpose && property_purpose?.data && (
              <span
                className={`rounded-full bg-white px-4 py-1 text-nk-gray shadow-lg ${categoryTextSize}`}
              >
                {property_type?.data?.attributes?.name}
              </span>
            )}
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
