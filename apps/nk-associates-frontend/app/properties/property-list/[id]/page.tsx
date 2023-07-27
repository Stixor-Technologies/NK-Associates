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
import Area_Marker from "../../../../public/assets/icons/area-marker.svg";
import Map from "../../../../public/assets/images/map.svg";
import PDF_Icon from "../../../../public/assets/icons/pdf-file-icon.svg";
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

      <div className="mt-14 bg-right-top bg-no-repeat md:mt-3 md:bg-nk-bg">
        <button className="ml-auto hidden items-center gap-2 rounded-l-md bg-white px-4 py-2 shadow-lg md:flex">
          <Image src={Tour_Icon} width={55} height={34} alt="360-tour" />
          <span className="text-[1.375rem] text-nk-black">View</span>
        </button>

        <div className="container mx-auto px-4 py-4">
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

          <div className="flex flex-col gap-3 py-8 md:py-10 lg:flex-row lg:gap-1">
            <div className="flex flex-grow gap-1">
              <Tile
                label="Category"
                value="Residential"
                className="flex-grow rounded-l-lg"
              />
              <Tile
                label="Coverd Area / Area"
                value="1 kanal (605yd2)"
                className="flex-grow"
              />
              <Tile
                label="Types"
                value="Plot"
                className="flex-grow rounded-r-lg lg:rounded-r-none"
              />
            </div>
            <div className="mx-auto flex w-full max-w-[300px] justify-center gap-1 sm:max-w-sm md:max-w-md lg:flex-grow">
              <Tile
                label="Price"
                value="26000000"
                className="flex-grow rounded-l-lg lg:rounded-l-none"
              />
              <Tile
                label="City"
                value="Islamabad"
                className="flex-grow rounded-r-lg"
              />
            </div>
          </div>

          <p className="font-metropolis-thin text-sm leading-snug text-nk-black md:py-3 md:text-[1.375rem]">
            Experience prestigious living in DHA 3, Islamabad's most coveted
            housing society. Centrally located on the Islamabad GT Road, this 1
            kanal plot offers the perfect canvas for your dream home. Enjoy
            proximity to renowned educational institutions, world-class
            healthcare facilities, vibrant shopping centers, and lush
            recreational areas. Embrace a serene and upscale lifestyle in DHA 3,
            where luxury meets convenience.
          </p>

          <div className="">
            <h3 className="pt-8 text-center font-metropolis-semibold text-[2rem] md:py-10 md:text-4xl">
              Location
            </h3>
            <Image
              src={Map}
              width={1536}
              height={900}
              alt="map"
              className="mx-auto py-3"
            />
            <div className="flex items-center gap-3 py-1 md:gap-3.5 md:py-3">
              <Image
                src={Area_Marker}
                width={16}
                height={16}
                alt="address-marker"
                className="w-3.5 md:w-5"
              />
              <h2 className="self-end font-metropolis-thin text-sm text-nk-black md:text-[1.75rem]">
                Street: 12, Secor- B, Plot #: 24-C, DHA-III, Islamabad
              </h2>
            </div>

            <button className="mx-auto my-12 hidden items-center gap-4 rounded-full bg-nk-gradient-red-one bg-gradient-to-b to-nk-gradient-red-two px-20 py-2 text-lg text-nk-white md:flex">
              Download Broucher
              <Image src={PDF_Icon} alt="" width={17} height={17} />
            </button>
          </div>
        </div>

        {/* <div className="mt-4 bg-nk-gradient-red-sharp-one bg-gradient-to-b to-nk-gradient-red-sharp-two py-9 text-center text-nk-white opacity-80 md:text-left md:mt-0 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h3 className=" font-metropolis-semibold text-[1.625rem] md:text-4xl">
                NK Associates Services
              </h3>
              <p className="py-5 text-base md:font-metropolis-extralight md:text-lg">
                Our core expertise lies in the meticulous design, precise
                construction, and strategic enhancement of existing real estate
                properties. We possess a remarkable proficiency in developing
                unique, ground-up projects that showcase our innovative vision
                and unwavering dedication to quality. We are committed to
                excellence driving our specialized services and integrated
                approach, resulting in unparalleled service and exceptional
                value for our esteemed clients.
              </p>
              <LinkButton
                text="Explore all"
                type="inverted"
                navigateTo="#"
                className="mx-auto mt-3 w-64 md:mx-0 md:w-[25rem]"
              />
            </div>
          </div>
        </div> */}

        <div className="relative bg-[url('/assets/images/detail-service-bg.svg')] bg-cover bg-right-top bg-no-repeat mt-4 py-9 text-center text-nk-white opacity-80 md:text-left md:mt-0 md:py-20">
      
        <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h3 className=" font-metropolis-semibold text-[1.625rem] md:text-4xl">
                NK Associates Services
              </h3>
              <p className="py-5 text-base md:font-metropolis-extralight md:text-lg">
                Our core expertise lies in the meticulous design, precise
                construction, and strategic enhancement of existing real estate
                properties. We possess a remarkable proficiency in developing
                unique, ground-up projects that showcase our innovative vision
                and unwavering dedication to quality. We are committed to
                excellence driving our specialized services and integrated
                approach, resulting in unparalleled service and exceptional
                value for our esteemed clients.
              </p>
              <LinkButton
                text="Explore all"
                type="inverted"
                navigateTo="#"
                className="mx-auto mt-3 w-64 md:mx-0 md:w-[25rem]"
              />
            </div>
          </div>

        <div className="absolute -z-10 inset-0 bg-gradient-to-b bg-nk-gradient-red-sharp-one to-nk-gradient-red-sharp-two">
         
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetail;
