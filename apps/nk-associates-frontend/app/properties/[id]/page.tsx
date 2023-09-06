import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getPropertyDetail,
  getSimilarProperties,
  getContactNumber,
} from "../../../utils/api-calls";
import DetailSlider from "../../../components/properties/property-detail/detail-slider";
import MapComponent from "../../../components/shared/map-component";
import PropertyCarousel from "../../../components/shared/properites-carousel";
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
    price,
    description,
    latitude,
    longitude,
    property_images,
    address,
    city,
    property_category,
    property_type,
  } = data?.attributes || {};
  const similarProperties = await getSimilarProperties(
    property_type,
    property_category,
    id,
  );

  const pdfUrl: string = data?.attributes?.property_pdf?.data?.attributes?.url;
  const paragraphs: string[] | string = description?.split("\n\n");

  const center = { lat: latitude, lng: longitude };

  const phoneResponse = await getContactNumber();
  const phoneNumber = phoneResponse?.data?.attributes?.number;

  return (
    <section>
      <DetailSlider
        property_images={property_images?.data}
        phone={phoneNumber}
      />

      <div className="relative mt-14 md:mt-3 bg-right-top bg-no-repeat md:bg-nk-bg">
        {/* 360 Tour Button */}
        <button className="group sticky top-[31.25rem] z-30 ml-auto hidden w-[6rem] items-center gap-3 rounded-l-xl bg-nk-white px-4 py-3.5 shadow-3xl transition-all duration-500 ease-in-out hover:w-44 md:flex">
          <Image
            src={TourIcon}
            width={56}
            height={35}
            alt="tour-button"
            className="transition-all delay-200 duration-500 group-hover:scale-110"
          />
          <span className="overflow-hidden whitespace-nowrap text-[1.375rem] text-nk-black transition-all duration-200 ease-in-out group-hover:w-auto group-hover:text-nk-red">
            View
          </span>
        </button>

        <div className="container mx-auto py-4">
          {/* Property Info section */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between lg:items-center">
            <div
              className={`flex flex-col gap-5 lg:flex-row ${
                title?.length > 28
                  ? "lg:gap-8 2xl:gap-10"
                  : "lg:gap-10 xl:gap-20"
              }`}
            >
              <h2
                className={`text-center font-metropolis-semibold text-4xl sm:text-left ${
                  title?.length > 28 && "lg:basis-1/2 2xl:basis-auto"
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
              className="mb-2 w-[11.75rem] text-lg sm:mb-0 md:w-[11.75rem]"
            />
          </div>

          {/* Tiles section */}

          <TileSection
            category={
              property_category && property_category?.data
                ? property_category?.data?.attributes?.name
                : "Not Available"
            }
            area={area}
            area_type={area_type}
            type={
              property_type && property_type?.data
                ? property_type?.data?.attributes?.name
                : "Not Available"
            }
            price={price}
            city={city}
          />

          {/* Property description */}
          {paragraphs?.map((paragraph: string, index: number) => (
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
                {address}, {city}
              </h2>
            </div>

            {pdfUrl && (
              <Link
                href={`${BASE_URL}${pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-10 mx-auto my-12 hidden items-center gap-4 rounded-full border bg-nk-red px-20 py-2.5 text-lg text-nk-white transition-all delay-200 duration-500 ease-in-out hover:bg-nk-gradient-red-sharp-one md:flex md:w-[25rem] md:justify-center"
              >
                Download brochure
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

      {similarProperties?.length > 0 && (
        <div className="xl:container mt-16">
          <h6 className="text-[2rem] text-center font-metropolis-semibold px-4 sm:text-left md:px-8 md:text-4xl xl:px-0">
            Similar Properties
          </h6>
          <PropertyCarousel properties={similarProperties} />
        </div>
      )}
    </section>
  );
}

export default PropertyDetail;
