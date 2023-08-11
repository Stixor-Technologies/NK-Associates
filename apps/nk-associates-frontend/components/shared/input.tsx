import React from "react";
import { Field, FormikErrors, FormikTouched } from "formik";

interface InputProps {
  hasError: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isTouched: boolean | FormikTouched<any> | FormikTouched<any>[];
  label: string;
  name: string;
  placeholder: string;
  errorMessage: string | string[] | FormikErrors<any> | FormikErrors<any>[];
}

const Input: React.FC<InputProps> = ({
  hasError,
  isTouched,
  label,
  name,
  placeholder,
  errorMessage
}) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="font-metropolis-thin capitalize text-nk-black md:text-base relative"
      >
        {label}
        <sup className="font-metropolis-thin text-lg text-nk-black top-[0.031rem] ml-[0.063rem]">
          *
        </sup>
      </label>
      <Field
        name={name}
        className={`mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 font-metropolis-light text-nk-black placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base focus:outline-none ${
          isTouched && hasError
            ? "border-nk-red"
            : " focus:border-nk-gray focus:ring-nk-gray"
        }`}
        placeholder={placeholder}
      />
      {isTouched && hasError && (
        <p className="mt-2 text-sm italic text-nk-red">
          {errorMessage as string}
        </p>
      )}
    </div>
  );
};

export default Input;
