import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Formik, Field, Form } from "formik";
import Input from "../shared/input";
import LinkButton from "../button/link-button";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};

const FilterFormSchema = {};

const initialValues = {};

const FiltersModal = ({ open, onClose }: PropTypes) => {
  const body = document.body;

  const onSubmit = () => {};

  const handleCloseModal = () => {
    onClose();
    body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    body.classList.add("overflow-hidden");
  }, [open]);

  const content = (
    <div className="fixed bg-black/30 w-full h-full top-0 left-0 z-50 overflow-y-auto md:flex items-center justify-center md:items-start">
      <section className="relative md:max-w-[60rem] md:my-[5rem] flex flex-wrap w-full h-full md:w-10/12 lg:w-8/12 md:h-auto bg-nk-light-gray p-4 py-6 md:p-6 md:rounded-3xl">
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
                  className="absolute top-0 right-0 p-1 m-4 mt-6 md:m-6"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 31 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.980469"
                      y="3.05347"
                      width="4.06338"
                      height="38.3123"
                      rx="2.03169"
                      transform="rotate(-45 0.980469 3.05347)"
                      fill="#333333"
                    />
                    <rect
                      x="28.0713"
                      y="0.180176"
                      width="4.06338"
                      height="38.3123"
                      rx="2.03169"
                      transform="rotate(45 28.0713 0.180176)"
                      fill="#333333"
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
                  <button className="w-full bg-nk-white p-4 rounded-lg mb-3 md:mb-0 md:max-w-[10rem]">
                    Buy
                  </button>

                  <hr className="hidden md:block mx-4 w-[1px] min-h-[2.5rem] bg-nk-gray" />

                  <div>
                    <h4 className="mb-2">Completion Status</h4>

                    <div className="flex flex-wrap text-nk-black text-sm">
                      <button className="py-1 px-4 mr-3 mb-2 rounded-full bg-white">
                        All
                      </button>
                      <button className="py-1 px-4 mr-3 mb-2 rounded-full bg-white">
                        Ready
                      </button>
                      <button className="py-1 px-4 mr-3 mb-2 rounded-full bg-white">
                        Off-Plan
                      </button>
                      <button className="py-1 px-4 mr-3 mb-2 rounded-full bg-white">
                        All
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mb-4">
                <h3 className="text-lg font-metropolis-semibold mb-4">
                  Rooms and beds
                </h3>

                <div className="mb-4 md:flex items-center">
                  <div>
                    <h4 className="mb-2">Bedrooms</h4>

                    <div className="flex flex-wrap text-nk-black text-sm">
                      <button className="py-1 px-4 mr-3 mb-2 rounded-full bg-nk-red text-white">
                        Any
                      </button>
                      {[1, 2, 3, 4, 5].map((num, index) => (
                        <button
                          key={index}
                          className="py-1 px-4 mr-3 mb-2 rounded-full bg-white"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mb-4 md:pr-2.5">
                <h3 className="text-lg font-metropolis-semibold mb-4">
                  Location
                </h3>

                <Input
                  hasError={errors["location"]}
                  isTouched={touched["location"]}
                  label="Location"
                  name="Location"
                  placeholder="Select Location"
                  errorMessage={errors["location"]}
                />
              </div>

              <div className="w-full flex items-center justify-center my-8">
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
    return createPortal(content, body);
  }
  return null;
};

export default FiltersModal;
