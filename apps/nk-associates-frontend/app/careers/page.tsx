import React from "react";
import Image from "next/image";
import Job from "../../public/assets/images/job-application.png";
import LinkButton from "../../components/button/link-button";
import Link from "next/link";
import JobList from "../../components/job-card/job-list";

const Careers = () => {
  return (
    <div className="lg:p-0.50 grid grid-cols-1 p-3 sm:p-6 xl:p-20 2xl:p-32">
      <div className="mb-8">
        <h1 className="mb-8 mt-2 text-center font-metropolis-bold text-3xl text-nk-dark-gray md:text-5xl">
          Career
        </h1>
        <div className="hidden text-center font-metropolis-extralight text-sm text-nk-dark-gray md:text-xl lg:block">
          As pioneers in the industry, we are fervently devoted to magnetizing
          superior talent and establishing a climate of unparalleled excellence.
          Launch into an array of thrilling roles within our trendsetting
          organization. Take the leap towards a fulfilling, lucrative career
          journey by sharing your credentials with us today.
        </div>
        <div className="text-center font-metropolis-extralight text-sm text-nk-dark-gray md:text-xl lg:hidden ">
          As a recognized industry leader, we are dedicated to attracting top
          talent and fostering a culture of excellence. Explore exciting
          opportunities across various roles in our industry-leading
          organization. Take the next step towards a rewarding and successful
          career by submitting your details today.
        </div>
        <div className="flex justify-center">
          <LinkButton
            type="solid"
            navigateTo="#Listing"
            text="Be a part of our amazing team"
            className="h-10 my-8 w-80 lg:w-96 p-2 lowercase duration-500 ease-in-out hover:bg-opacity-90 hover:shadow-lg hover:delay-200"
          />
        </div>
      </div>
      <div className="mb-28 mt-8 gap-8 lg:grid lg:grid-cols-2">
        <div className="my-auto flex justify-center sm:mx-auto">
          <Image src={Job} alt="Job Application" />
        </div>
        <div>
          <h1 className="my-8 mt-16 text-center font-metropolis-bold text-2xl text-nk-dark-gray lg:text-left lg:text-4xl ">
            How Can I Apply?
          </h1>
          <p className="hidden p-0.5 text-center font-metropolis-extralight text-nk-dark-gray lg:block lg:text-justify lg:text-xl">
            To explore career possibilities at NK Associates, start by
            navigating through our current job vacancies. Assemble your
            application, composed of an up-to-date resume/CV, a persuasive cover
            letter, and any related certifications or portfolio samples. Use the
            designated `Apply Now` button or link to send in your application.
            Ensure your information is thorough and accurate for review by our
            dedicated HR team. If your skills align with our expectations, we
            will promptly coordinate interview schedules and evaluations. Upon
            successful selection, a formal job offer will be made, facilitated
            by a seamless onboarding process for your easy integration into the
            team.
          </p>
          <p className="text-based p-0.5 text-center font-metropolis-extralight text-nk-dark-gray lg:hidden">
            To apply for a career opportunity at NK Associates, please find the
            current job openings. Prepare your application by meticulously
            curating your updated resume/CV, a compelling cover letter, and any
            pertinent certifications or portfolio samples. Submit your
            application through the designated ``Apply`` Now button or link
            provided, ensuring that you provide accurate and comprehensive
            information. Our dedicated HR team will thoughtfully review your
            application, and if your qualifications align with our requirements,
            we will promptly reach out to schedule interviews and assessments.
            Upon successful selection, an official job offer will be extended,
            accompanied by a seamless onboarding process to facilitate your
            integration into the team.
          </p>
          <div
            id="Listing"
            className="flex items-center justify-center lg:justify-start "
          >
            <LinkButton
              text="contact us"
              navigateTo="contact"
              type="solid"
              className="mt-8 w-56 p-2 transition-all duration-300 hover:bg-opacity-90 lg:w-96"
            />
          </div>
        </div>
      </div>
      <JobList />
      <div className="mt-16 p-4 sm:p-0">
        <h1 className="my-8 text-center font-metropolis-bold text-3xl text-nk-dark-gray lg:text-4xl ">
          Don’t see the right role for you?
        </h1>
        <div className="hidden text-center font-metropolis-extralight text-nk-dark-gray lg:block lg:text-2xl">
          Unable to spot the perfect role? Feel free to send us your resume
          regardless. We`ll securely store it and alert you as soon as fitting
          opportunities surface in the future.
        </div>
        <div className="text-center font-metropolis-thin text-base text-nk-dark-gray lg:hidden ">
          If you don`t find the ideal role, feel free to submit your resume.
          We`ll keep it on file and reach out if suitable opportunities arise in
          the future.
        </div>
        <div className="sm: flex justify-center pb-8">
          <LinkButton
            text="Submit Your Resume"
            navigateTo="#"
            type="solid"
            className="mt-8 w-96  p-2  transition-all duration-300 hover:bg-opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default Careers;
