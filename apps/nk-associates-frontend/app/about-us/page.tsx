import React from "react";
import LinkButton from "../../components/button/link-button";
import ContactForm from "../../components/shared/contact-form";
import { getCategories } from "../../utils/api-calls";
import ServicesOverview from "../../components/shared/service-overview";
import CeoMessage from "../../components/about-us/ceo-message";
import { getAbout } from "../../utils/api-calls";
import { About } from "../../utils/types/types";
import { BASE_URL } from "../../utils/constants";
import MembersList from "../../components/members/member-list";
import Goals from "../../components/about-us/goals";

const AboutUs = async () => {
  const categories = await getCategories();
  const aboutInfo: About = await getAbout();
  const ceoMessage: string = aboutInfo?.data?.attributes?.ceo_message;
  const ceoImage: string = `${BASE_URL}${aboutInfo?.data?.attributes?.ceo_image?.data?.attributes?.url}`;
  const ceoName: string = aboutInfo?.data?.attributes?.ceo_name;
  return (
    <div>
      <div className="text-center text-black container">
        <div className="text-[1.875rem] md:text-[3rem] font-metropolis-extrabold pt-[1rem]  md:pt-[3rem]">
          About Us
        </div>
        <div className="pb-[1.563rem] text-[0.875rem] md:text-[1.25rem] md:pb-[2.563rem]">
          NK Associates & Builders Pvt Ltd, established in 2004, is a leading
          real estate development, construction, and investment consultancy
          company. We specialize in the bulk sourcing and sale of properties
          within Bahria Town and DHA. Our aim is to evolve into a Proptech
          company that holds a real estate license.
        </div>
        <div>
          <LinkButton
            text="Contact Us"
            type="solid"
            className="h-[2.75rem] w-[14.063rem] text-[1rem] md:text-lg md:text-[1.094rem]"
            navigateTo="#form"
          />
        </div>
      </div>
      <div className="container min-h-[250vh]">
        <Goals />
      </div>
      <div className="container">
        <CeoMessage
          ceoImage={ceoImage}
          ceoMessage={ceoMessage}
          ceoName={ceoName}
        />
      </div>

      <ServicesOverview />

      <div className="container pt-[3.25rem] lg:pt-[6.688rem] text-center">
        <div className="text-nk-dark-gray font-metropolis-bold text-[2.25rem] text-center mb-[3.625]">
          Meet Our Best-In-Class Team
        </div>
        <div className="pt-12 -mr-[24px]">
          <MembersList />
        </div>
      </div>
      <div
        id="form"
        className="pb-[2.958rem] md:pb-[3.603rem] pt-[5.05rem] lg:flex lg:justify-center lg:m-0"
      >
        <ContactForm categories={categories} heading="Get In Touch" />
      </div>
    </div>
  );
};

export default AboutUs;
