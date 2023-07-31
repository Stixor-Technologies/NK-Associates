import React from "react";
import { Field } from "formik";
const Input = ({
  hasError,
  isTouched,
  label,
  name,
  placeholder,
  errorMessage,
}) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="font-metropolis-light capitalize text-nk-black md:text-base"
      >
        {label}
        <sup className="text-nk-black">*</sup>
      </label>
      <Field
        name={name}
        className={`mt-1 w-full rounded-lg px-4 py-4 placeholder-nk-gray shadow-md placeholder:font-metropolis-thin placeholder:text-base border focus:outline-none ${
          isTouched && hasError
            ? "border-nk-red"
            : " focus:border-nk-gray focus:ring-nk-gray"
        }`}
        placeholder={placeholder}
      />
      {isTouched&& hasError && (
        <p className="text-sm text-nk-red italic mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
