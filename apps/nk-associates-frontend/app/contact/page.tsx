import React from "react";
import ContactForm from "../../components/shared/contact-form";
import ContactDetails from "../../components/contact/contact-details";
import { BASE_URL } from "../../utils/constants";
import MapComponent from "../../components/shared/map-component";
import { Contacts } from "../../utils/types/types";

interface Location {
  lat: number;
  lng: number;
}

async function FetchData() {
  try {
    const response = await fetch(`${BASE_URL}/api/contacts?populate=*`, {
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

function collectCoordinates(data: Contacts[]) {
  let locations: Location[] = [];
  data?.map((dataItem, index) => {
    const latlng: Location = {
      lat: dataItem.attributes.latitude,
      lng: dataItem.attributes.longitude,
    };
    locations.push(latlng);
  });
  console.log(locations);
  return locations;
}

const ContactUs = async () => {
  const data: Contacts[] = await FetchData();
  const locations = collectCoordinates(data);
  const categories = await FetchCategories();

  return (
    <section className="">
      <div className="container mx-auto flex flex-1 flex-col px-4 pt-4 pb-12 md:pb-24 md:pt-8">
        <ContactForm categories={categories} />

        <div className="card-component mt-8 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ContactDetails data={data} />
        </div>

        <div className="mt-14 w-full md:mt-24">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="mb-5 text-center font-metropolis-bold text-[2rem] text-nk-black md:mb-8 md:text-4xl">
              Head Office Locations
            </div>

            <MapComponent locations={locations} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
