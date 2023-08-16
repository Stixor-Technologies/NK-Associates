"use client";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Input from "./input";
import { ContactFormSchema } from "../../utils/formik-schema";
import Spinner from "../spinner";
import Toast from "./toast";
import ArrowDown from "../../public/assets/icons/arrow-down.svg";
import Image from "next/image";
import LinkButton from "../button/link-button";

const fieldTypes = {
  name: "text",
  email: "text",
  phone: "text",
  subject: "text",
  category: "dropdown",
  message: "textarea",
};

const placeholders = {
  name: "Write your name here",
  email: "Write your email address",
  phone: "Write your phone number here",
  subject: "Write subject here",
};

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  category: "",
  message: "",
};

interface ContactFormProps {
  categories: {
    attributes: {
      value: string;
      category: string;
    };
  }[];
}

const ContactForm: React.FC<ContactFormProps> = ({ categories }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const formFields = [
    "name",
    "email",
    "phone",
    "subject",
    "category",
    "message",
  ];

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const res = await fetch("api/contact", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          category: values.category,
          message: values.message,
        }),
      });

      const data = await res.json();
      if (data === 202) {
        setToastMessage("Email has been sent");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          resetForm();
        }, 1000);
      } else {
        console.log(data);
        setToastMessage(`Error: Error sending email`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1000);
      }
    } catch (error) {
      console.error(error);
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
          <div className="rounded-3xl bg-nk-light-gray px-4 py-7 md:px-12 md:py-14">
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
                      <div key={fieldName}>
                        <label
                          htmlFor={fieldName}
                          className="relative font-metropolis-thin capitalize text-nk-black md:text-base"
                        >
                          {fieldName}
                          <sup className="top-[0.031rem] ml-[0.063rem] font-metropolis-thin text-lg text-nk-black">
                            *
                          </sup>
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name={fieldName}
                            className={`mt-1 flex h-[3.625rem] w-full appearance-none items-center rounded-lg border px-4 py-4 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none ${
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
                                  value={`${category?.attributes?.category?.toLowerCase()}`}
                                >
                                  {category?.attributes?.category}
                                </option>
                              );
                            })}
                          </Field>

                          <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
                            <Image
                              src={ArrowDown}
                              width={20}
                              height={20}
                              alt="dropdown"
                            />
                          </div>
                        </div>

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
                          className="relative font-metropolis-thin capitalize text-nk-black md:text-base"
                        >
                          {fieldName}
                          <sup className="top-[0.031rem] ml-[0.063rem] font-metropolis-thin text-lg text-nk-black">
                            *
                          </sup>
                        </label>
                        <Field
                          as="textarea"
                          name={fieldName}
                          className={`mt-1 w-full rounded-lg border px-4 py-4 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none ${
                            touched.message && errors.message
                              ? "border-nk-red"
                              : " focus:border-nk-gray focus:ring-nk-gray"
                          }`}
                          placeholder="Write your message here"
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
              <div className="mx-auto mt-4 flex h-12 cursor-pointer items-center justify-center rounded-full bg-nk-red sm:w-[22.5rem] md:w-[25rem]">
                {loading ? (
                  <Spinner color="fill-white" height="h-7" width="w-10" />
                ) : (
                  <LinkButton
                    text="Submit"
                    type="solid"
                    buttonType="submit"
                    className="h-full w-full md:text-lg"
                  />
                )}
              </div>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
};

export default ContactForm;
