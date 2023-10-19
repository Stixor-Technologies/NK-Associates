"use client";
import React, { useState, useEffect } from "react";
import MapComponent from "../shared/map-component";
import { getOfficeAddress, getHeadOffice } from "../../utils/api-calls";
import { Offices } from "../../utils/types/types";
import Spinner from "../spinner";

type Coordinates = {
  lat: number;
  lng: number;
};

const Offices = () => {
  const [offices, setOffices] = useState<Offices[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [selectedOfficeIndex, setSelectedOfficeIndex] = useState<number | null>(
    0,
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(offices);

  const collectCoordinates = (offices: Offices[]) => {
    return (
      offices?.map((office) => ({
        lat: office?.attributes?.latitude,
        lng: office?.attributes?.longitude,
      })) || []
    );
  };

  const fetchOfficesAddress = async () => {
    setIsLoading(true);
    const resp = await getOfficeAddress();
    const headOfficeAddress = await getHeadOffice();

    if (resp) {
      const combinedAddresses: Offices[] = [
        ...(headOfficeAddress
          ? [{ ...headOfficeAddress, isHeadOffice: true }]
          : []),
        ...(resp || []),
      ];

      if (combinedAddresses) {
        const officeCoordinates = collectCoordinates(combinedAddresses);
        setCoordinates(officeCoordinates);
      }
      setOffices(combinedAddresses);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOfficesAddress();
  }, []);

  const handleAddressClick = (index: number) => {
    setSelectedOfficeIndex(index);
  };

  return (
    <>
      {offices.length > 0 || isLoading ? (
        <div className="container pb-14 pt-10 md:pt-12 md:pb-20">
          <h6 className="text-[2rem] text-center text-nk-black font-metropolis-semibold mb-5 md:mb-7 md:text-4xl xl:px-0">
            Our Offices
          </h6>

          {isLoading && offices.length === 0 ? (
            <div className="min-h-[50vh] flex flex-1">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col gap-8 rounded-[1.25rem] lg:flex-row md:py-5 md:px-2 lg:gap-0 md:bg-nk-red">
              <div className="lg:w-[40%] max-h-[31.5rem] hidden overflow-auto px-3 md:flex flex-col gap-3">
                {offices?.map((office, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddressClick(index)}
                    className={`flex flex-col bg-nk-white text-left px-4 py-3 rounded-xl border ${
                      selectedOfficeIndex === index && "border-nk-black"
                    }`}
                  >
                    <span className="text-nk-red flex items-center gap-2 font-metropolis-semibold md:text-2xl">
                      {office?.attributes?.location}
                      {office?.isHeadOffice && (
                        <span className=" text-base font-metropolis text-nk-gray">
                          (Head Office)
                        </span>
                      )}
                    </span>
                    <span className="text-nk-black font-metropolis-thin text-base">
                      {office?.attributes?.address}
                    </span>
                  </button>
                ))}
              </div>
              <div className="lg:w-[60%] shrink-0 md:px-3">
                <MapComponent
                  locations={coordinates}
                  selectedOfficeIndex={selectedOfficeIndex}
                  offices={offices}
                />
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Offices;
