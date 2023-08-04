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
import TourIcon from "../../../public/assets/icons/360-icon.svg"
import LinkButton from "../../../components/button/link-button";

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
  } = data?.attributes;

  const pdfUrl: string = data?.attributes?.property_pdf?.data?.attributes?.url;
  const paragraphs: string[] | string = description.split("\n\n");

  const center = { lat: latitude, lng: longitude };
  console.log("center", center)
  const locations = [
    { lat: 33.55427247854852, lng: 73.09534453163067 },
    { lat: 33.54949268301728, lng: 73.12385803665302 },
    { lat: 33.52258019226873, lng: 73.0887855231596 },
    { lat: 33.650024870838685, lng: 73.04176688268879 },
  ];

  return (
      <section>
        <DetailSlider property_images={property_images.data} />
        <div className="mt-14 bg-right-top bg-no-repeat md:mt-3 md:bg-nk-bg">
          {/* 360 Tour Button */}
          <button className="group ml-auto hidden w-48 items-center gap-3 overflow-hidden rounded-l-lg bg-nk-white px-4 py-3.5 shadow-3xl transition-all md:flex">
           
          <Image src={TourIcon} width={56} height={35} alt="tour-button" className="w-14 transition-all duration-500 delay-200 group-hover:scale-110"/>

          <span className="text-[1.375rem] text-nk-black transition-all delay-200 duration-500 ease-in-out group-hover:text-nk-red">
              View
            </span> 
          </button>

          <div className="container mx-auto px-4 py-6">
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
                className="mb-2 w-[11.75rem] text-lg border hover:border-nk-red sm:mb-0 md:w-[11.75rem]"
              />
            </div>

            {/* Tiles section */}
            <div className="flex flex-col gap-3 py-8 md:py-10 lg:flex-row lg:gap-1">
              <div className="flex flex-grow gap-1 shadow-3xl">
                <Tile
                  label="Category"
                  value={category}
                  className="flex-grow rounded-l-lg"
                />
                <Tile
                  label="Coverd Area / Area"
                  value={`${area} ${area_type}`}
                  className="flex-grow"
                />
                <Tile
                  label="Types"
                  value={type}
                  className="flex-grow rounded-r-lg lg:rounded-r-none"
                />
              </div>
              <div className="mx-auto flex w-full max-w-[300px] justify-center gap-1 shadow-3xl sm:max-w-sm md:max-w-md lg:flex-grow">
                <Tile
                  label="Price"
                  value={`PKR: ${price}`}
                  className="flex-grow rounded-l-lg lg:rounded-l-none"
                />
                <Tile
                  label="City"
                  value="Islamabad"
                  className="flex-grow rounded-r-lg"
                />
              </div>
            </div>

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
                  className="group relative z-10 mx-auto my-12 hidden items-center gap-4 rounded-full bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two px-20 py-2.5 text-lg text-nk-white md:flex md:w-[25rem] md:justify-center transition-all duration-500 delay-200 border hover:shadow-lg hover:border-nk-red"
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

          <div className="relative mt-4 bg-[url('/assets/images/detail-service-bg.svg')] bg-cover bg-right-top bg-no-repeat py-9 text-center text-nk-white md:mt-0 md:py-20 md:text-left">
            <div className="container relative z-20 mx-auto px-4">
              <div className="max-w-4xl">
                <h3 className="font-metropolis-semibold text-[1.625rem] md:text-4xl">
                  NK Associates Services
                </h3>
                <p className="py-5 text-base md:font-metropolis-extralight md:text-lg">
                  Our core expertise lies in the meticulous design, precise
                  construction, and strategic enhancement of existing real
                  estate properties. We possess a remarkable proficiency in
                  developing unique, ground-up projects that showcase our
                  innovative vision and unwavering dedication to quality. We are
                  committed to excellence driving our specialized services and
                  integrated approach, resulting in unparalleled service and
                  exceptional value for our esteemed clients.
                </p>
                <LinkButton
                  text="Explore all"
                  type="inverted"
                  navigateTo="#"
                  className="mx-auto mt-3 w-64 border py-2.5 text-lg hover:border-nk-red md:mx-0 md:w-[25rem]"
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-nk-gradient-red-sharp-one to-nk-gradient-red-sharp-two opacity-80" />
          </div>
        </div>
      </section>
  );
}

export default PropertyDetail;
