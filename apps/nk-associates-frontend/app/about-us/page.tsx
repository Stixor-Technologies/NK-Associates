import React from "react";
import LinkButton from "../../components/button/link-button";
import ContactForm from "../../components/shared/contact-form";
import { getCategories } from "../../utils/api-calls";
import ServicesOverview from "../../components/shared/service-overview";

const AboutUs = async () => {
  const categories = await getCategories();
  return (
    <div className="container">
      <div className="text-center text-black">
        <div className="text-[1.875rem] md:text-[3rem] font-metropolis-extrabold pt-[1rem] pb-[1.563rem] md:pt-[3rem] md:pb-[2.563rem]">
          About Us
        </div>
        <div className="pb-[1.563rem] text-[0.875rem] md:text-[1.25rem] md:pb-[2.563rem]">
          NK Associates & Builders Pvt Ltd, established in 2004, is a leading
          real estate development, construction, and investment consultancy
          company. We specialize in the bulk sourcing and sale of properties
          within Bahria Town and DHA. Our aim is to evolve into a Proptech
          company that holds a real estate license.
        </div>
        <div className="pb-[3.803rem] md:pb-[9rem]">
          <LinkButton
            text="Contact Us"
            type="solid"
            buttonType="submit"
            className="h-[2.75rem] w-[14.063rem] text-[1rem] md:text-lg md:text-[1.094rem]"
          />
        </div>
      </div>
      <div>Our Mission Component</div>
      <div>Ceos Message Component</div>

      <ServicesOverview />

      <div>Meet Our best inclass team Component</div>
      <div>
        <ContactForm categories={categories} heading="Get In Touch" />
      </div>
    </div>
  );
};

export default AboutUs;
