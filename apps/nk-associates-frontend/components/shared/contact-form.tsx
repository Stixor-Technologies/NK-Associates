"use client";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Input from "./input";
import { ContactFormSchema } from "../../utils/formik-schema";
import Spinner from "../spinner";
import Image from "next/image";
import Area_Marker from "../../public/assets/icons/area-marker.svg";
import Envelope from "../../public/assets/icons/envelope-icon.svg";

const fieldTypes = {
  name: "text",
  email: "text",
  phone: "text",
  category: "dropdown",
  message: "textarea",
};

const placeholders = {
  name: "Write your name here",
  email: "Write your email address",
  phone: "Write your phone number here",
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  category: "",
  message: "",
};

const ContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formFields = ["name", "email", "phone", "category", "message"];

  const onSubmit = async (values) => {
    setLoading(true);
    const res = await fetch("api/contact", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        category: values.category,
        message: values.message,
      }),
    });

    const ah = await res.json();
    console.log(ah);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ContactFormSchema}
    >
      {({ errors, touched }) => (
        <>
          <div className="rounded-3xl bg-nk-light-gray px-6 py-8 md:px-12 md:py-12">
            <h4 className="text-center font-metropolis-bold text-[1.75rem] text-nk-black md:text-5xl">
              Contact Us
            </h4>
            <Form>
              <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 md:py-8">
                {formFields.map((fieldName) => {
                  const fieldType = fieldTypes[fieldName];

                  if (fieldType === "dropdown") {
                    return (
                      <div key={fieldName} className="">
                        <label
                          htmlFor={fieldName}
                          className="font-metropolis-thin capitalize text-nk-black md:text-base"
                        >
                          {fieldName}
                        </label>
                        <Field
                          name={fieldName}
                          className={`mt-1 w-full rounded-lg px-4 py-4 placeholder-nk-gray shadow-lg placeholder:font-metropolis-thin placeholder:text-base focus:outline-none`}
                          placeholder="Select Category"
                        />
                      </div>
                    );
                  }

                  if (fieldType === "textarea") {
                    return (
                      <div key={fieldName} className="md:col-span-2">
                        <label
                          htmlFor={fieldName}
                          className="font-metropolis-thin capitalize text-nk-black md:text-base"
                        >
                          {fieldName}
                        </label>
                        <Field
                          as="textarea"
                          name={fieldName}
                          className={`mt-1 w-full rounded-lg border px-4 py-4 placeholder-nk-gray  shadow-lg placeholder:font-metropolis-thin placeholder:text-base focus:outline-none ${
                            touched.message && errors.message
                              ? "border-nk-red"
                              : " focus:border-nk-gray focus:ring-nk-gray"
                          }`}
                          placeholder="Enter your message"
                          rows={6}
                        />
                        {touched.message && errors.message && (
                          <p className="text-sm italic text-nk-red">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Input
                      key={fieldName}
                      hasError={errors[fieldName]}
                      isTouched={touched[fieldName]}
                      label={`Your ${fieldName}`}
                      name={fieldName}
                      placeholder={placeholders[fieldName]}
                      errorMessage={errors[fieldName]}
                    />
                  );
                })}
              </div>
              {/* <button
                type="submit"
                className=" mx-auto inline-flex w-[22.5rem] rounded-full bg-nk-red py-3 text-center font-metropolis capitalize text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:delay-100 h-12 md:w-[25rem]"
              >
                {loading ? <Spinner color="fill-white" height="h-10" width="w-10" /> : <span>Submit</span>}
              <Spinner color="fill-nk-white" height="h-12" width="w-12" />
              </button> */}

              <button
                type="submit"
                className={`bg-nk-red mx-auto my-5 rounded-md py-2 text-sm font-bold uppercase text-white shadow-md transition duration-200 ease-in-out md:w-96 h-12 lg:text-lg `}
              >
                  <Spinner color="fill-white" height="h-10" width="w-10" />
                {/* Submit */}
             
              </button>
            </Form>
          </div>
          {/* <div className="mt-5">
            <div>
              <Image
                src={Area_Marker}
                width={24}
                height={35}
                alt="address-marker"
              />
              <h5 className="font-metropolis-medium md:text-xl">Our Address</h5>
              <span className="">
                Heights 5, Square Commercial Bahria Town Phase 7 Rawalpindi
              </span>
              <span>
                Plaza No 54, Street No 26-A, Sector C, Service Lane, DHA II,
                Islamabad
              </span>
              <span>
                Burj ul Sadiq Plaza, Office # 7,8,9 Hub Commercial, Opp. bahria
                Town Head Office Phase 8 Rawalpindi
              </span>
            </div>

            <div>
              <Image src={Envelope} width={24} height={35} alt="email-icon" />
              <h5>Email Us</h5>
              <span>testemail10@gmail.com</span>
              <span>nktestemail12@gmail.com</span>
              <span>testemail321@gmail.com</span>
              <span></span>
            </div>

            <div>
              <Image src={Envelope} width={24} height={35} alt="email-icon" />
              <h5>Email Us</h5>
              <span> +92-51-111099111</span>
              <span> +92-51-111099111</span>
              <span> +92-51-111099111</span>
              <span></span>
            </div>
          </div> */}
        </>
      )}
    </Formik>
  );
};

export default ContactForm;
