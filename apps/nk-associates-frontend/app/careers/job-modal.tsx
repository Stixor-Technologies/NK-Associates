"use client";
import { ModalOptions, Modal } from "flowbite";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Field, Formik, Form } from "formik";
import Input from "../../components/shared/input";
import ArrowDown from "../../public/assets/icons/arrow-down.svg";
import Spinner from "../../components/spinner";
import Image from "next/image";
import Toast from "../../components/shared/toast";
import { BASE_URL } from "../../utils/constants";
import { JobFormSchema } from "../../utils/formik-schema";
import uploadIcon from "../../public/assets/icons/upload-icon.svg";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const EventModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const modalElement = useRef<HTMLDivElement | null>(null);

  //change to get departments
  const [Departments, setDepartments] = useState<any>();
  useEffect(() => {
    // Fetch Departments and update the state when the component mounts
    FetchDepartments()
      .then((DepartmentsData) => {
        console.log(DepartmentsData);
        setDepartments(DepartmentsData);
      })
      .catch((error) => {
        console.error("Error fetching Departments:", error);
      });
  }, []);

  const fieldTypes = {
    name: "text",
    father_name: "text",
    email: "email",
    phone: "text",
    current_address: "text",
    permanent_address: "text",
    department: "dropdown",
    resume: "file",
    cover_letter: "file",
  };

  const placeholders = {
    name: "Write your complete name here",
    father_name: "Write your fathers name",
    email: "Write your email address here",
    phone: "03xx xxxx xxx",
    current_address: "Write current address here",
    permanent_address: "Write permanent address here",
    department: "Select Department",
    resume: "Drag & drop here or enter to upload manually ",
    cover_letter: "Drag & drop here or enter to upload manually",
  };

  const initialValues = {
    name: "",
    father_name: "",
    email: "",
    phone: "",
    current_address: "",
    permanent_address: "",
    department: "",
    resume: "",
    cover_letter: "",
  };

  const formFields = [
    "name",
    "father_name",
    "email",
    "phone",
    "current_address",
    "permanent_address",
    "department",
    "resume",
    "cover_letter",
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

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
          Departments: values.Departments,
          message: values.message,
        }),
      });

      const data = await res.json();
      setToastMessage(data?.message);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        resetForm();
      }, 2000);
    } catch (error) {
      setToastMessage(`Error: ${error?.message}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  async function FetchDepartments() {
    try {
      const response = await fetch(`${BASE_URL}/api/departments`, {
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

  const closeModal = () => {
    onClose();
    modal?.hide();
  };
  const modal = useMemo(() => {
    if (!modalElement.current) {
      return null;
    }
    const modalOptions: ModalOptions = {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-900 bg-opacity-70 fixed inset-0 z-40",
      closable: true,
      onHide: () => {
        onClose();
      },
    };

    return new Modal(modalElement.current, modalOptions);
  }, [onClose]);

  useEffect(() => {
    if (!modalElement.current || !modal) {
      return;
    }
    if (open) {
      modal.show();
    } else {
      onClose();
      modal?.hide();
    }
  }, [modal, onClose, open]);

  function getFieldLabel(fieldName) {
    return fieldName.replace(/_/g, " ");
  }

  return (
    <div
      ref={modalElement}
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 hidden w-full overflow-y-auto overflow-x-hidden p-4 md:h-full"
    >
      <div className="relative m-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-white">
        <button
          className="absolute right-0 top-0 mr-5 mt-5 h-[0.92rem] w-[0.92rem] "
          onClick={closeModal}
        >
          <svg
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.073 1.82996L1.00537 14.8975"
              stroke="black"
              stroke-width="1.82271"
              stroke-linecap="round"
            />
            <path
              d="M14.0728 14.8975L1.00517 1.82996"
              stroke="black"
              stroke-width="1.82271"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div>
          <div className="font-metropolis text-nk-black flex flex-wrap text-left text-[0.938rem]">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={JobFormSchema}
            >
              {({ errors, touched }) => (
                <>
                  <div className="bg-nk-light-gray w-full rounded-3xl px-4 py-7 md:px-12 md:py-14">
                    {showToast && <Toast message={toastMessage} />}
                    <h4 className="font-metropolis-bold text-nk-black text-center text-[1.75rem] md:text-5xl">
                      Apply for this Job
                    </h4>
                    <Form>
                      <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 md:py-8 2xl:px-4">
                        {formFields.map((fieldName, index) => {
                          const fieldType = fieldTypes[fieldName];

                          if (fieldType === "dropdown") {
                            return (
                              <div key={index}>
                                <label
                                  htmlFor={fieldName}
                                  className="font-metropolis-thin  text-nk-black relative capitalize md:text-base"
                                >
                                  {getFieldLabel(fieldName)}
                                  <sup className="font-metropolis-thin text-nk-black top-[0.031rem] ml-[0.063rem] text-lg">
                                    *
                                  </sup>
                                </label>
                                <div className="relative">
                                  <Field
                                    as="select"
                                    name={fieldName}
                                    className={`font-metropolis-light text-nk-black placeholder-nk-gray placeholder:font-metropolis-thin mt-1 flex h-[3.625rem] w-full appearance-none items-center rounded-lg border px-4 py-4 shadow-md placeholder:text-base focus:outline-none ${
                                      touched.message && errors.message
                                        ? "border-nk-red"
                                        : " focus:border-nk-gray focus:ring-nk-gray"
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Select Department
                                    </option>
                                    {/* fetch departments and map over them */}
                                    {Departments?.map((department, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={`${department?.attributes?.Departments?.toLowerCase()}`}
                                        >
                                          {department?.attributes?.name}
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

                                {touched.Departments && errors.Departments && (
                                  <p className="text-nk-red mt-2 text-sm italic">
                                    {errors.Departments as string}
                                  </p>
                                )}
                              </div>
                            );
                          }
                          if (fieldType === "file") {
                            return (
                              <div
                                key={index}
                                className={`${
                                  fieldName === "resume" && "col-start-1 "
                                } `}
                              >
                                <label
                                  htmlFor={fieldName}
                                  className="font-metropolis-thin text-nk-black relative capitalize md:text-base"
                                >
                                  {getFieldLabel(fieldName)}
                                  {fieldName !== "cover_letter" && (
                                    <sup className="font-metropolis-thin text-nk-black top-[0.031rem] ml-[0.063rem] text-lg">
                                      *
                                    </sup>
                                  )}
                                </label>

                                <div
                                  className={`${
                                    fieldName === "cover_letter"
                                      ? "mt-2"
                                      : "mt-1"
                                  } bg-nk-white font-metropolis-light text-nk-black placeholder-nk-gray placeholder:font-metropolis-thin focus:border-nk-gray focus:ring-nk-gray  w-full rounded-lg border px-4 py-4 shadow-md  placeholder:text-base focus:outline-none`}
                                >
                                  <div className=" h-[4rem]">
                                    <label className="w-full cursor-pointer text-center">
                                      <input
                                        name={fieldName}
                                        accept=".pdf, .doc, .docx, .txt, .rtf"
                                        multiple={false}
                                        className="hidden"
                                        type="file"
                                      />

                                      <div className="aspect-w-1 aspect-h-1 relative  flex h-full w-full items-center justify-center">
                                        <div className="h-[3.5rem] w-[3.5rem]">
                                          <Image
                                            src={uploadIcon}
                                            alt="Preview"
                                            className="object-contain"
                                            style={{ objectFit: "contain" }}
                                          />
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                  <p className="text-light-gray font-metropolis-thin text-center text-[0.875rem] text-[#969696]">
                                    Drag & Drop here or enter to upload manually
                                  </p>
                                  <p className="text-light-gray font-metropolis-thin text-center text-[0.625rem] text-[#969696]">
                                    (File types: pdf, doc, docx, txt, rtf)
                                  </p>
                                </div>

                                {touched.Departments && errors.Departments && (
                                  <p className="text-nk-red mt-2 text-sm italic">
                                    {errors.Departments as string}
                                  </p>
                                )}
                              </div>
                            );
                          }

                          return (
                            <div
                              key={index}
                              className={`${
                                fieldName === "father_name" && "mt-1"
                              }`}
                            >
                              <Input
                                hasError={errors[fieldName]}
                                isTouched={touched[fieldName]}
                                label={getFieldLabel(fieldName)}
                                name={getFieldLabel(fieldName)}
                                placeholder={placeholders[fieldName]}
                                errorMessage={errors[fieldName]}
                                isRequired={
                                  fieldName === "father_name" ? false : true
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                      <button
                        type="submit"
                        className="bg-nk-red font-metropolis mx-auto mt-4 block h-12 w-full rounded-full py-3 text-center capitalize text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:delay-100 sm:w-[22.5rem] md:w-[25rem] md:text-lg"
                      >
                        {loading ? (
                          <Spinner
                            color="fill-white"
                            height="h-7"
                            width="w-10"
                          />
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
                    </Form>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
