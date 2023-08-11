import React from "react";
import ContactForm from "../../components/shared/contact-form";
import ContactDetails from "../../components/contact/contact-details";
import { BASE_URL } from "../../utils/constants";
import MapComponent from "../../components/shared/map-component";
import { Contacts } from "../../utils/types/types";
import { getOfficeAddress, getHeadOffice } from "../../utils/api-calls";

interface Location {
  lat: number;
  lng: number;
}
async function FetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error(error);
  }
}

const ContactUs = async () => {
  const data: Contacts[] = await getOfficeAddress();
  const headOfficeAddress = await getHeadOffice();
  const categories = await FetchCategories();
  const combinedAddresses: Contacts[] = [
    ...data,
    ...(headOfficeAddress ? [headOfficeAddress] : []),
  ];
  const headOfficeLocation: Location = {
    lat: headOfficeAddress?.attributes?.latitude,
    lng: headOfficeAddress?.attributes?.longitude,
  };

  console.log(headOfficeLocation);
  console.log(combinedAddresses);

  return (
    <section className="">
      <div className="container mx-auto flex flex-1 flex-col px-4 pb-12 pt-4 md:pb-24 md:pt-8">
        <ContactForm categories={categories} />

        <div className="card-component mt-8 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ContactDetails data={combinedAddresses} />
        </div>

        {headOfficeLocation?.lat && headOfficeLocation?.lng && (
          <div className="mt-14 w-full md:mt-24">
            <div className="flex w-full flex-col items-center justify-center">
              <div className="mb-5 text-center font-metropolis-bold text-[2rem] text-nk-black md:mb-8 md:text-4xl">
                Head Office Locations
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
