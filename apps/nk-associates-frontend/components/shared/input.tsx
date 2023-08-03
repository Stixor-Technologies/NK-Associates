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
        <sup className="font-metropolis-bold text-sm text-nk-black">*</sup>
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
        <p className="mt-2 text-sm italic text-nk-red">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
