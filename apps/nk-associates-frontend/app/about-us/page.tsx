import React from "react";
import LinkButton from "../../components/button/link-button";
import ContactForm from "../../components/shared/contact-form";
import { getAbout, getContactCategory } from "../../utils/api-calls";
import ServicesOverview from "../../components/shared/service-overview";
import CeoMessage from "../../components/about-us/ceo-message";
import { About } from "../../utils/types/types";
import { BASE_URL } from "../../utils/constants";
import MembersList from "../../components/members/member-list";
import Goals from "../../components/about-us/goals";

const AboutUs = async () => {
  const categories = await getContactCategory();

  const aboutInfo: About = await getAbout();
  const ceoMessage: string = aboutInfo?.data?.attributes?.ceo_message;
  const ceoImage: string = `${BASE_URL}${aboutInfo?.data?.attributes?.ceo_image?.data?.attributes?.url}`;
  const ceoName: string = aboutInfo?.data?.attributes?.ceo_name;
  const mission = aboutInfo?.data?.attributes?.Mission;
  const vision = aboutInfo?.data?.attributes?.Vision;
  const values = aboutInfo?.data?.attributes?.Values;
  const goals = aboutInfo?.data?.attributes?.Goals;
  return (
    <div className="bg-right-top bg-no-repeat md:bg-nk-bg">
      <div className="text-center text-nk-black container">
        <div className="text-[1.875rem] mb-6 md:text-[3rem] font-metropolis-bold pt-[1rem] md:pt-[3rem]">
          About Us
        </div>
        <div className="pb-[1.563rem] text-[0.875rem] font-metropolis-thin md:text-[1.25rem] md:pb-[2.563rem]">
          Established in 2004, NK Associates & Builders Pvt Ltd is a prominent
          figure in real estate development, construction, and investment
          consultancy. Specializing in the bulk sourcing and sale of properties
          within Bahria Town and DHA, we aim to evolve into a pioneering
          Proptech company, backed by a real estate license.
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
      <div className="container lg:h-[230vh]">
        <Goals
          mission={mission}
          vision={vision}
          values={values}
          goals={goals}
        />
      </div>

      <div className="container mb-28 lg:mt-[20rem]">
        <CeoMessage
          ceoImage={ceoImage}
          ceoMessage={ceoMessage}
          ceoName={ceoName}
        />
      </div>

      <ServicesOverview />
      <MembersList />

      <div
        id="form"
        className="container pb-[2.958rem] md:pb-[3.603rem] pt-[5.05rem] lg:flex lg:justify-center"
      >
        <ContactForm categories={categories} heading="Get In Touch" />
      </div>
    </div>
  );
};

export default AboutUs;
