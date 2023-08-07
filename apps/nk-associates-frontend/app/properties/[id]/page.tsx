import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPropertyDetail } from "../../../utils/api-calls";
import DetailSlider from "../../../components/properties/property-detail/detail-slider";
import Tile from "../../../components/shared/tile";
import MapComponent from "../../../components/shared/map-component";
import { convertAreaToSqFeet } from "../../../utils/utils";
import { Property } from "../../../utils/types/types";
import { BASE_URL } from "../../../utils/constants";
import BathIcon from "../../../public/assets/icons/bath-icon.svg";
import BedroomIcon from "../../../public/assets/icons/bedrooms-icon.svg";
import AreaIcon from "../../../public/assets/icons/area-icon.svg";
import AreaMarker from "../../../public/assets/icons/area-marker.svg";
import PDFIcon from "../../../public/assets/icons/pdf-file-icon.svg";
import TourIcon from "../../../public/assets/icons/360-icon.svg";
import LinkButton from "../../../components/button/link-button";
import TileSection from "../../../components/properties/property-detail/tile-section";
import ServicesOverview from "../../../components/shared/service-overview";

interface PropertyDetailProps {
  params: {
    id: string;
  };
}

async function PropertyDetail({ params: { id } }: PropertyDetailProps) {
  const data: Property = await getPropertyDetail(id);
  const {
    title,
    bedrooms,
    baths,
    area,
    area_type,
    category,
    type,
    price,
    description,
    latitude,
    longitude,
    property_images,
    city,
  } = data?.attributes;

  const pdfUrl: string = data?.attributes?.property_pdf?.data?.attributes?.url;
  const paragraphs: string[] | string = description.split("\n\n");

  const center = { lat: latitude, lng: longitude };

  return (
    <section>
      <DetailSlider property_images={property_images.data} />
      <div className="relative mt-14 bg-right-top bg-no-repeat md:mt-3 md:bg-nk-bg">
        {/* 360 Tour Button */}
        <button className="group ml-[auto] hidden w-48 items-center gap-3 overflow-hidden rounded-l-lg bg-nk-white px-4 py-3.5 shadow-3xl transition-all md:flex">
          <Image
            src={TourIcon}
            width={56}
            height={35}
            alt="tour-button"
            className="w-14 transition-all delay-200 duration-500 group-hover:scale-110"
          />
          <span className="text-[1.375rem] text-nk-black transition-all delay-200 duration-500 ease-in-out group-hover:text-nk-red">
            View
          </span>
        </button>

        <div className="container mx-auto py-6">
          {/* Property Info section */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between lg:items-center">
            <div
              className={`flex flex-col gap-5 lg:flex-row ${
                title.length > 28
                  ? "lg:gap-8 2xl:gap-10"
                  : "lg:gap-10 xl:gap-20"
              }`}
            >
              <h2
                className={`text-center font-metropolis-semibold text-4xl sm:text-left ${
                  title.length > 28 && "lg:basis-1/2 2xl:basis-auto"
                }`}
              >
                {title}
              </h2>

              <div className="flex flex-1 justify-center gap-6 sm:justify-start">
                {baths && (
                  <div className="flex items-center gap-1">
                    <Image
                      src={BathIcon}
                      width={27}
                      height={27}
                      alt="bath-icon"
                    />
                    <span className="font-metropolis-semibold text-lg text-nk-black">
                      {baths}
                    </span>
                  </div>
                )}

                {bedrooms && (
                  <div className="flex items-center gap-1">
                    <Image
                      src={BedroomIcon}
                      width={27}
                      height={27}
                      alt="bed-icon"
                    />
                    <span className="font-metropolis-semibold text-lg text-nk-black">
                      {bedrooms}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Image src={AreaIcon} width={27} height={27} alt="" />
                  <span className="font-metropolis-semibold text-lg text-nk-black">
                    {`${convertAreaToSqFeet(area, area_type)} Sq.Ft`}
                  </span>
                </div>
              </div>
            </div>

            <LinkButton
              text="Inquires"
              type="solid"
              navigateTo="#"
              className="mb-2 w-[11.75rem] border text-lg sm:mb-0 md:w-[11.75rem]"
            />
          </div>

          {/* Tiles section */}

          <TileSection
            category={category}
            area={area}
            area_type={area_type}
            type={type}
            price={price}
            city={city}
          />

          {/* Property description */}
          {paragraphs.map((paragraph: string, index: number) => (
            <p
              key={index}
              className="py-2 text-center font-metropolis-thin text-sm leading-snug text-nk-black md:py-3 md:text-left md:text-[1.375rem]"
            >
              {paragraph}
            </p>
          ))}

          {/* Property location */}
          <div className="mt-8 md:my-12">
            <h3 className="pb-2 text-center font-metropolis-semibold text-[2rem] md:pb-10 md:text-4xl">
              Location
            </h3>
            <MapComponent locations={center} />
            <div className="flex items-center gap-3 py-1 md:gap-3.5 md:py-4">
              <Image
                src={AreaMarker}
                width={16}
                height={16}
                alt="address-marker"
                className="w-3.5 md:w-5"
              />
              <h2 className="self-end text-sm text-nk-black md:font-metropolis-extralight md:text-[1.75rem]">
                Street: 12, Secor- B, Plot #: 24-C, DHA-III, Islamabad
              </h2>
            </div>

            {pdfUrl && (
              <Link
                href={`${BASE_URL}${pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-10 mx-auto my-12 hidden items-center gap-4 rounded-full border bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two px-20 py-2.5 text-lg text-nk-white transition-all delay-200 duration-500 hover:opacity-80 md:flex md:w-[25rem] md:justify-center"
              >
                Download Broucher
                <Image
                  src={PDFIcon}
                  alt="property-info-download"
                  width={17}
                  height={17}
                />
              </Link>
            )}
          </div>
        </div>
        <ServicesOverview />
      </div>
    </section>
  );
}

export default PropertyDetail;
