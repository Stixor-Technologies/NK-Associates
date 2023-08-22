"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Field, Form } from "formik";
import Input from "../../shared/input";
import LinkButton from "../../button/link-button";
import PillButton from "../../shared/pill-button";
import PillRadio from "../../shared/pill-radio";
import FilterButton from "./filter-button";

type PropType = {
  open: boolean;
  onClose: () => void;
};

const FilterFormSchema = {};

const initialValues = {};

const FiltersModal = ({ open, onClose }: PropType) => {
  // const body = document.body;
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedOption2, setSelectedOption2] = useState(undefined);

  const pillActiveClasses = "bg-nk-red text-white";
  const numberOfRoomsFilter = ["1", "2", "3", "4", "5", "6", "7", "8+"];
  const buyOptions = ["All", "Ready", "Off-Plan"];

  const onSubmit = () => {};

  const handleCloseModal = () => {
    onClose();
    // body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    // body.classList.add("overflow-hidden");
  }, [open]);

  const content = (
    <div className="fixed bg-black/30 w-full h-full top-0 left-0 z-50 overflow-y-auto md:flex items-center justify-center md:items-start">
      <section className="relative md:max-w-[60rem] md:my-[5rem] flex flex-wrap w-full min-h-full md:w-10/12 lg:w-8/12 md:h-auto md:min-h-fit bg-nk-light-gray p-4 py-6 md:p-6 md:py-10 md:rounded-3xl">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={FilterFormSchema}
        >
          {({ errors, touched }) => (
            <>
              <div className="w-full mb-6">
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
                      // fill="#333333"
                    />
                    <rect
                      x="28.0713"
                      y="0.180176"
                      width="4.06338"
                      height="38.3123"
                      rx="2.03169"
                      transform="rotate(45 28.0713 0.180176)"
                      // fill="#333333"
                    />
                  </svg>
                </button>
              </div>

              <div className="w-full mb-4">
                <h3 className="text-lg font-metropolis-semibold">
                  Price range
                </h3>

                <div>
                  <input
                    id="default-range"
                    type="range"
                    value="50"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="w-full mb-4 md:w-1/2 md:pr-2.5">
                <Input
                  hasError={errors["max price"]}
                  isTouched={touched["max price"]}
                  label="Max Price"
                  name="Max Price"
                  placeholder={"PKR 10000000"}
                  errorMessage={errors["max price"]}
                />
              </div>

              <div className="w-full mb-4 md:w-1/2 md:pl-2.5">
                <Input
                  hasError={errors["min price"]}
                  isTouched={touched["min price"]}
                  label="Min Price"
                  name="Min Price"
                  placeholder={"PKR 100000"}
                  errorMessage={errors["min price"]}
                />
              </div>

              <div className="w-full mb-4">
                <h3 className="text-lg font-metropolis-semibold">Area</h3>

                <div>
                  <input
                    id="default-range"
                    type="range"
                    value="50"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="w-full mb-4 md:w-1/2 md:pr-2.5">
                <Input
                  hasError={errors["max sqft"]}
                  isTouched={touched["max sqft"]}
                  label="Max sqft"
                  name="Max sqft"
                  placeholder={"10 sqft"}
                  errorMessage={errors["max sqft"]}
                />
              </div>

              <div className="w-full mb-4 md:w-1/2 md:pl-2.5">
                <Input
                  hasError={errors["min sqft"]}
                  isTouched={touched["min sqft"]}
                  label="Min sqft"
                  name="Min sqft"
                  placeholder={"10000 sqft"}
                  errorMessage={errors["min sqft"]}
                />
              </div>

              <div className="w-full mb-4">
                <h3 className="text-lg font-metropolis-semibold mb-4">
                  Purpose
                </h3>

                <div className="mb-4 md:flex items-center">
                  <FilterButton ariaLabel="Buy" active>
                    Buy
                  </FilterButton>

                  <hr className="hidden md:block mx-4 w-[1px] min-h-[2.5rem] bg-nk-gray" />

                  <div>
                    <h4 className="mb-2">Completion Status</h4>

                    <div className="flex flex-wrap text-nk-black text-sm">
                      {buyOptions.map((option, index) => (
                        <PillRadio
                          key={index}
                          label={option}
                          name="types-radio"
                          checked={selectedOption === option}
                          onChange={() => setSelectedOption(option)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mb-4">
                <h3 className="text-lg font-metropolis-semibold mb-4">
                  Rooms and beds
                </h3>

                <div className="mb-4">
                  <h4 className="mb-2">Bedrooms</h4>

                  <div className="flex flex-wrap text-nk-black text-sm">
                    <PillRadio
                      label="Any"
                      name="types-radio"
                      checked={selectedOption === "Any"}
                      onChange={() => setSelectedOption("Any")}
                    />
                    {numberOfRoomsFilter.map((num, index) => (
                      <PillRadio
                        key={index}
                        label={num}
                        name="types-radio"
                        checked={selectedOption === num}
                        onChange={() => setSelectedOption(num)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full mb-4">
                <h3 className="text-lg font-metropolis-semibold mb-4">
                  Location
                </h3>

                <div className="flex items-center relative">
                  <Field
                    name="Location"
                    className={`mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 pr-14 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none ${
                      touched["location"] && errors["location"]
                        ? "border-nk-red"
                        : " focus:border-nk-gray focus:ring-nk-gray"
                    }`}
                    placeholder="Select Location"
                  />
                  <div className="absolute right-0 mr-4">
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 18 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.82459 12.6779C7.99959 12.6779 7.20838 12.3502 6.62502 11.7668C6.04166 11.1835 5.71393 10.3923 5.71393 9.56727C5.71393 8.74227 6.04166 7.95106 6.62502 7.3677C7.20838 6.78434 7.99959 6.45661 8.82459 6.45661C9.64958 6.45661 10.4408 6.78434 11.0242 7.3677C11.6075 7.95106 11.9352 8.74227 11.9352 9.56727C11.9352 9.97577 11.8548 10.3803 11.6985 10.7577C11.5421 11.1351 11.313 11.478 11.0242 11.7668C10.7353 12.0557 10.3924 12.2848 10.015 12.4411C9.63758 12.5975 9.23308 12.6779 8.82459 12.6779ZM8.82459 0.857422C6.51459 0.857422 4.29921 1.77506 2.6658 3.40848C1.03239 5.04189 0.114746 7.25727 0.114746 9.56727C0.114746 16.0997 8.82459 25.7427 8.82459 25.7427C8.82459 25.7427 17.5344 16.0997 17.5344 9.56727C17.5344 7.25727 16.6168 5.04189 14.9834 3.40848C13.35 1.77506 11.1346 0.857422 8.82459 0.857422Z"
                        fill="url(#paint0_linear_1903_1107)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1903_1107"
                          x1="8.82459"
                          y1="0.857422"
                          x2="8.82459"
                          y2="25.7427"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#E4404A" />
                          <stop offset="1" stop-color="#EB4B5E" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                {touched["location"] && errors["location"] && (
                  <p className="mt-2 text-sm italic text-nk-red">
                    {errors["location"] as string}
                  </p>
                )}
              </div>

              <div className="w-full flex items-center justify-center mt-4">
                <LinkButton
                  className="min-w-[10rem]"
                  text="Search"
                  clickEvent={() => {}}
                />
              </div>
            </>
          )}
        </Formik>
      </section>
    </div>
  );

  if (open) {
    return createPortal(content, document.querySelector("body"));
  }
  return null;
};

export default FiltersModal;
