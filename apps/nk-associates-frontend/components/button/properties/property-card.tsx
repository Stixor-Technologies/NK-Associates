import React from "react";
import Image from "next/image";
import Link from "next/link";
import Area_Icon from "../../../public/assets/icons/area-icon.svg"
import Area_Marker from "../../../public/assets/icons/area-marker.svg"

const PropertyCard = () => {
  return (
    <div>
      <Link href={"#"} className="rounded-xl">
        <Image src={"/card_img.svg"} width={400} height={400} alt="" />
      </Link>
      <div className="my-2 flex justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-nk-gray shadow-lg md:text-xs">
            Residential
          </span>
          <span className="rounded-full bg-white px-4 py-1 text-sm font-medium text-nk-gray shadow-lg md:text-xs">
            Sale
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Image src={Area_Icon} width={13} height={13} alt="" />
          <span className="text-sm text-nk-grey md:text-[0.625rem]">
            902.3 Sq.Yds
          </span>
        </div>
      </div>

      <h2 className="text-xl font-medium text-nk-black md:text-base">
        Garden City Bahria Town
      </h2>
      <p className="my-1 text-[1.375rem] font-bold md:text-lg">Rs. 17 lac</p>
      <div className="mt-1 flex items-center gap-2">
        <Image src={Area_Marker} width={12} height={18} alt="" />
        <p className="text-sm text-nk-grey md:text-xs">
          Garden City phase 7 Bahria Town
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
