import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Properties } from "../../../utils/types/types";
import { convertToPakistaniNumbering } from "../../../utils/utils";
import Area_Icon from "../../../public/assets/icons/area-icon.svg";
import Area_Marker from "../../../public/assets/icons/area-marker.svg";
import { BASE_URL } from "../../../utils/constants";

interface CardProps {
  property: Properties;
}

const PropertyCard: FC<CardProps> = ({ property }) => {
  const { title, category, purpose, area, area_type, price } =
    property?.attributes;
  const thumbnailImage =
    property?.attributes?.image_thumbnail.data.attributes.url;
  return (
    <div>
      <Link href="#">
        <div className="aspect-w-1 aspect-h-1 relative h-[17.5rem] w-full max-w-[37.5rem] rounded-xl">
          <Image
            src={`${BASE_URL}${thumbnailImage}`}
            fill
            alt=""
            className="rounded-xl object-cover"
          />
        </div>
      </Link>
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-nk-gray shadow-lg md:text-xs">
            {category}
          </span>
          <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-nk-gray shadow-lg md:text-xs">
            {purpose}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Image src={Area_Icon} width={13} height={13} alt="" />
          <span className="font-metropolis-light text-sm text-nk-grey md:text-[0.625rem]">
            {area} {area_type}
          </span>
        </div>
      </div>

      <h2 className="text-xl text-nk-black md:text-base">{title}</h2>
      <p className="my-1 font-metropolis-bold text-[1.375rem] text-nk-black md:text-lg">
        {convertToPakistaniNumbering(price)}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <Image src={Area_Marker} width={12} height={18} alt="" />

        {/* need to change, it will be done when I'll integrate google maps api on details page */}
        <p className="font-metropolis-light text-sm text-nk-grey md:text-xs">
          Garden City phase 7 Bahria Town
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
