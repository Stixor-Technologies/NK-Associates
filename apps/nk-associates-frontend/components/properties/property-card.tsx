import React, {FC} from "react";
import Image from "next/image";
import Link from "next/link";
import { Properties } from "../../utils/types/types";
import Area_Icon from "../../public/assets/icons/area-icon.svg"
import Area_Marker from "../../public/assets/icons/area-marker.svg"

interface CardProps {
  property: Properties;
}

const PropertyCard: FC<CardProps> = ({property}) => {
  const {title, type, purpose, area, area_type, price}  = property?.attributes;
  return (
    <div>
      <Link href={"#"} className="rounded-xl">
        <Image src={"/card_img.svg"} width={600} height={600} alt="" />
      </Link>
      <div className="my-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-nk-gray shadow-lg md:text-xs">
            {type}
          </span>
          <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-nk-gray shadow-lg md:text-xs">
            {purpose}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Image src={Area_Icon} width={13} height={13} alt="" />
          <span className="text-sm text-nk-grey font-metropolis-light md:text-[0.625rem]">
            {area} {area_type}
          </span>
        </div>
      </div>

      <h2 className="text-xl text-nk-black md:text-base">
       {title}
      </h2>
      <p className="my-1 text-[1.375rem] text-nk-black font-metropolis-bold md:text-lg">{price}</p>
      <div className="mt-1 flex items-center gap-2">
        <Image src={Area_Marker} width={12} height={18} alt="" />
        <p className="text-sm text-nk-grey font-metropolis-light md:text-xs">
          Garden City phase 7 Bahria Town
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
