import React from "react";
import ContactForm from "../../components/shared/contact-form";
import ContactDetails from "../../components/contact/contact-details";
import MapComponent from "../../components/shared/map-component";
import { Offices } from "../../utils/types/types";
import {
  getOfficeAddress,
  getHeadOffice,
  getDepartments,
} from "../../utils/api-calls";

interface Location {
  lat: number;
  lng: number;
}

const ContactUs = async () => {
  const data: Offices[] = await getOfficeAddress();
  const headOfficeAddress = await getHeadOffice();
  const departments = await getDepartments();

  const combinedAddresses: Offices[] = [
    ...(headOfficeAddress
      ? [{ ...headOfficeAddress, isHeadOffice: true }]
      : []),
    ...(data || []),
  ];
  const headOfficeLocation: Location = {
    lat: headOfficeAddress?.attributes?.latitude,
    lng: headOfficeAddress?.attributes?.longitude,
  };

  return (
    <section className="">
      <div className="container mx-auto flex flex-1 flex-col px-4 pb-12 pt-4 md:pb-24 md:pt-8">
        <ContactForm categories={departments} heading="Contact Us" />

        <div className="card-component mt-8 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ContactDetails data={combinedAddresses} />
        </div>

        {headOfficeLocation?.lat && headOfficeLocation?.lng && (
          <div className="mt-14 w-full md:mt-24">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="mb-5 text-center font-metropolis-bold text-[2rem] text-nk-black md:mb-8 md:text-4xl">
                Head Office Location
              </div>
              <MapComponent locations={headOfficeLocation} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactUs;
