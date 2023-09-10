"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import LinkButton from "../../button/link-button";
import PriceRangeSection from "./price-range-section";
import PurposeSection from "./purpose-section";
import PropertyTypeSection from "./property-type-section";
import RoomBedsSection from "./rooms-beds-section";
import AreaSection from "./area-section";

import { SearchFilterProperties } from "../../../utils/types/types";
import LocationFilter from "../filters/location-filter";
import ProjectFilter from "./project-filter";

type PropType = {
  open: boolean;
  onClose: () => void;
  filtersProperties: SearchFilterProperties;
  onFilter: () => void;
  actHome?: boolean;
};

const FiltersModal = ({
  open,
  onClose,
  filtersProperties,
  onFilter,
  actHome = false,
}: PropType) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOnFilter = () => {
    onFilter();
    handleCloseModal();
  };

  const handleCloseModal = () => {
    const body = document.body;
    onClose();
    body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.classList.add("overflow-hidden");
    }
  }, [open]);

  const content = (
    <div
      ref={modalRef}
      className="myModal fixed bg-black/30 w-full h-full top-0 left-0 z-50 overflow-y-auto md:flex items-center justify-center md:items-start"
    >
      <section className="relative md:max-w-[60rem] md:my-[5rem] flex flex-wrap w-full min-h-full md:w-10/12 lg:w-8/12 md:h-auto md:min-h-fit bg-nk-light-gray p-4 py-6 md:p-6 md:py-10 md:rounded-3xl">
        <div className="w-full mb-8">
          <h1 className="mr-14 md:mr-0 md:text-center text-2xl font-metropolis-bold leading-7">
            Filter
          </h1>

          <button
            className="absolute top-0 right-0 p-1 m-4 mt-6 md:m-6 md:mt-9 text-nk-black hover:text-nk-red"
            onClick={handleCloseModal}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 31 31"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.980469"
                y="3.05347"
                width="4.06338"
                height="38.3123"
                rx="2.03169"
                transform="rotate(-45 0.980469 3.05347)"
              />
              <rect
                x="28.0713"
                y="0.180176"
                width="4.06338"
                height="38.3123"
                rx="2.03169"
                transform="rotate(45 28.0713 0.180176)"
              />
            </svg>
          </button>
        </div>

        {actHome && (
          <div className="w-full mb-4">
            <h3 className="text-lg font-metropolis-semibold mb-4">Project</h3>
            <ProjectFilter projectsList={filtersProperties?.projectsList} />
          </div>
        )}

        <PriceRangeSection priceRange={filtersProperties.priceRange} />

        {!actHome && (
          <AreaSection
            areaRange={filtersProperties.areaRange}
            areaUnitsList={filtersProperties.areaUnitsList}
            modalElement={modalRef}
          />
        )}

        <PurposeSection
          propertyPurposeList={filtersProperties.propertyPurposeList}
          completionStatusList={filtersProperties.completionStatusList}
          rentFrequencyList={filtersProperties.rentFrequencyList}
        />

        <PropertyTypeSection
          propertyTypesList={filtersProperties.propertyTypesList}
        />

        {!actHome && <RoomBedsSection />}

        <div className="w-full mb-4">
          <h3 className="text-lg font-metropolis-semibold mb-4">Location</h3>

          <LocationFilter
            locationsList={filtersProperties.propertyLocationList}
          />
        </div>

        <div className="w-full flex items-center justify-center mt-4">
          <LinkButton
            className="min-w-[10rem]"
            text="Search"
            clickEvent={handleOnFilter}
          />
        </div>
      </section>
    </div>
  );

  if (open) {
    return createPortal(content, document.querySelector("body"));
  }
  return null;
};

export default FiltersModal;
