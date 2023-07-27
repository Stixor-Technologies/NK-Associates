// 'use client'
import React, { FC } from "react";
import Image from "next/image";
import { getPropertyDetail } from "../../../utils/api-calls";
import DetailSlider from "../../../../components/properties/property-detail/detail-slider";
import Tile from "../../../../components/shared/tile";
import Bath_Icon from "../../../../public/assets/icons/bath-icon.svg";
import Bedroom_Icon from "../../../../public/assets/icons/bedrooms-icon.svg";
import Tour_Icon from "../../../../public/assets/icons/360-icon.svg";
import Area_Icon from "../../../../public/assets/icons/area-icon.svg";
import LinkButton from "../../../../components/button/link-button";
import "./slider-styles.css";

interface PropertyDetailProps {
  params: {
    id: string;
  };
}

async function PropertyDetail({ params: { id } }) {
  const data = await getPropertyDetail(id);

  return (
    <section className="">
      <DetailSlider />

      <div className="bg-right-top bg-no-repeat md:bg-nk-bg">
        <button className="ml-auto mt-3 hidden items-center gap-2 rounded-l-md bg-white px-4 py-2 shadow-lg md:flex">
          <Image src={Tour_Icon} width={55} height={34} alt="360-tour" />
          <span className="text-[1.375rem] text-nk-black">View</span>
        </button>

        <div className="container mx-auto h-[2000px] py-4 px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex lg:gap-10 xl:gap-20">
              <h2 className="font-metropolis-semibold text-4xl">
                DHA-III Residential Plots
              </h2>

              <div className="flex gap-6">
                <div className="flex items-center gap-1">
                  <Image
                    src={Bath_Icon}
                    width={27}
                    height={27}
                    alt="bath-icon"
                  />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    7
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Image
                    src={Bedroom_Icon}
                    width={27}
                    height={27}
                    alt="bed-icon"
                  />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    6
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Image src={Area_Icon} width={27} height={27} alt="" />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    4500 sq.ft
                  </span>
                </div>
              </div>
            </div>

            <LinkButton
              text="Inquires"
              type="solid"
              navigateTo="#"
              className="w-[11.75rem] text-lg md:w-[11.75rem]"
            />
          </div>

          {/* <div className="flex gap-1">
            <Tile label="Category" value="Residential" round="left" />
            <Tile label="Cover Area / Area" value="1 kanal (605yd2)" />
            <Tile label="Types" value="Plot" />
            <Tile label="Price" value="26000000" />
            <Tile label="City" value="Islamabad" round="right" />
          </div> */}

          <div className="flex gap-3 flex-col lg:gap-1 lg:flex-row">
            <div className="flex gap-1 flex-grow">
              <Tile label="Category" value="Residential" className="rounded-l-lg flex-grow" />
              <Tile label="Coverd Area / Area" value="1 kanal (605yd2)" className="flex-grow" />
              <Tile label="Types" value="Plot" className="rounded-r-lg lg:rounded-r-none flex-grow"/>
            </div>
            <div className="flex justify-center gap-1 max-w-[300px] sm:max-w-sm md:max-w-md w-full mx-auto lg:flex-grow">
              <Tile label="Price" value="26000000" className="rounded-l-lg lg:rounded-l-none flex-grow"/>
              <Tile label="City" value="Islamabad" className="rounded-r-lg flex-grow"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetail;
