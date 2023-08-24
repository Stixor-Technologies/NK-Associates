"use client";
import React, { useState, useEffect } from "react";
import MapComponent from "../shared/map-component";
import { getOfficeAddress, getHeadOffice } from "../../utils/api-calls";
import { Offices } from "../../utils/types/types";
import Image from "next/image";

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
    <div className="container my-10">
      <h6 className="text-[2rem] text-center text-nk-black font-metropolis-semibold px-4 md:px-8 md:text-4xl xl:px-0">
        Our Offices
      </h6>

      <div className="flex gap-4 my-10 bg-nk-red rounded-2xl px-5 py-3">
        <div className="w-[40%] my-3 flex flex-col gap-3">
          {offices.map((office, index) => (
            <button
              key={index}
              onClick={() => handleAddressClick(index)}
              className="flex flex-col bg-nk-white text-left px-4 py-3 rounded-xl"
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
        <div className="w-[60%] shrink-0">
          <MapComponent
            locations={coordinates}
            selectedOfficeIndex={selectedOfficeIndex}
          />
          {/* <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            dolor soluta perferendis cumque aspernatur, deleniti cupiditate
            repudiandae porro? Eos facere neque nobis magnam nemo suscipit
            dolorum eligendi omnis. Sapiente, cumque! Necessitatibus saepe
            incidunt laboriosam quia. Ipsum dolores similique amet cumque quas
            distinctio odit quam exercitationem. Eius temporibus autem
            accusantium error labore quia fugiat quas mollitia natus? Qui
            consectetur fuga in. Rem velit corporis illo explicabo ullam a
            quaerat necessitatibus nesciunt voluptatibus culpa unde quia
            consequuntur odio, consectetur veritatis animi et corrupti.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Offices;
