"use client";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Input from "./input";
import { ContactFormSchema } from "../../utils/formik-schema";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../spinner";
import Toast from "./toast";
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

const ContactForm = ({ categories }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const formFields = ["name", "email", "phone", "category", "message"];

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("api/contact", {
        // const res = await fetch(`${BASE_URL}/api/send-email`, {

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

      const data = await res.json();
      console.log(data);
      // setToastMessage("sent successfully");
      setToastMessage(data?.message);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      console.log(data?.message);
    } catch (error) {
      console.log(error);
      setToastMessage(`Error: ${error?.message}`);
      // setToastMessage(`Error: "errror"`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 22000);
      console.log("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={ContactFormSchema}
    >
      {({ errors, touched }) => (
        <>
          <div className="rounded-3xl bg-nk-light-gray px-6 py-9 md:px-12 md:py-14">
            {showToast && <Toast message={toastMessage} />}
            <h4 className="text-center font-metropolis-bold text-[1.75rem] text-nk-black md:text-5xl">
              Contact Us
            </h4>
            <Form>
              <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 md:py-8 2xl:px-4">
                {formFields.map((fieldName) => {
                  const fieldType = fieldTypes[fieldName];

                  if (fieldType === "dropdown") {
                    return (
                      <div key={fieldName} className="">
                        <label
                          htmlFor={fieldName}
                          className="font-metropolis-light capitalize text-nk-black md:text-base"
                        >
                          {fieldName}
                        </label>
                        <Field
                          as="select"
                          name={fieldName}
                          className={`mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none ${
                            touched.message && errors.message
                              ? "border-nk-red"
                              : " focus:border-nk-gray focus:ring-nk-gray"
                          }`}
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categories?.map((category, index) => {
                            return (
                              <option
                                key={index}
                                value={`${category.attributes.value}`}
                              >
                                {category.attributes.category}
                              </option>
                            );
                          })}
                        </Field>

                        {touched.category && errors.category && (
                          <p className="mt-2 text-sm italic text-nk-red">
                            {errors.category as string}
                          </p>
                        )}
                      </div>
                    );
                  }

                  if (fieldType === "textarea") {
                    return (
                      <div key={fieldName} className="md:col-span-2">
                        <label
                          htmlFor={fieldName}
                          className="font-metropolis-light capitalize text-nk-black md:text-base"
                        >
                          {fieldName}
                          <sup className="text-nk-black">*</sup>
                        </label>
                        <Field
                          as="textarea"
                          name={fieldName}
                          className={`mt-1 w-full rounded-lg border px-4 py-4 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none ${
                            touched.message && errors.message
                              ? "border-nk-red"
                              : " focus:border-nk-gray focus:ring-nk-gray"
                          }`}
                          placeholder="Enter your message"
                          rows={6}
                        />
                        {touched.message && errors.message && (
                          <p className="text-sm italic text-nk-red">
                            {errors.message as string}
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
              <button
                type="submit"
                className="mx-auto mt-4 block h-12 w-full rounded-full bg-nk-red py-3 text-center font-metropolis capitalize text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:delay-100 sm:w-[22.5rem] md:w-[25rem] md:text-lg"
              >
                {loading ? (
                  <Spinner color="fill-white" height="h-7" width="w-10" />
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default ContactForm;
