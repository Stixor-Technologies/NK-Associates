import React from "react";
import { Field, FormikErrors, FormikTouched } from "formik";

interface InputProps {
  hasError: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isTouched: boolean | FormikTouched<any> | FormikTouched<any>[];
  label: string;
  name: string;
  placeholder: string;
  errorMessage: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  isRequired?: boolean;
}

const Input: React.FC<InputProps> = ({
  hasError,
  isTouched,
  label,
  name,
  placeholder,
  errorMessage,
  isRequired = true,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-metropolis-thin text-nk-black relative capitalize md:text-base"
      >
        {label}
        {isRequired && (
          <sup className="font-metropolis-thin text-nk-black top-[0.031rem] ml-[0.063rem] text-lg">
            *
          </sup>
        )}
      </label>
      <Field
        name={name}
        readOnly={name === "inquiry" ? true : false}
        className={`font-metropolis-light text-nk-black placeholder-nk-gray placeholder:font-metropolis-thin mt-1 h-[3.625rem] w-full rounded-lg border px-4 py-4 shadow-md placeholder:text-base focus:outline-none ${
          isTouched && hasError
            ? "border-nk-red"
            : " focus:border-nk-gray focus:ring-nk-gray"
        } ${name === "inquiry" && "text-nk-gray"} `}
        placeholder={placeholder}
      />
      {isTouched && hasError && (
        <p className="text-nk-red mt-2 text-sm italic">
          {errorMessage as string}
        </p>
      )}
    </div>
  );
};

export default Input;
