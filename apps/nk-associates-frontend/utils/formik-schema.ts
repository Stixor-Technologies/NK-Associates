import * as Yup from "yup";

export const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 25 characters")
    .required("Please enter you name"),

  email: Yup.string().matches(
    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
    "Invalid email address"
  ).required("Please enter your email address"),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),
    // .matches(/^[0-9+]+$/, "Phone number must contain only numbers.")
    // .length(10, "Phone number must be exactly 10 digits i.e 3331234567")
    // .max(10, "Phone number cannot exceed 10 digits."),

  category: Yup.string().required("Please select category"),

  message: Yup.string()
    .required("Please enter your message")
    // .matches(/^[a-zA-Z]+$/, "department should contain only alphabets")
    .min(10, "Minimum 10 characters")
    .max(200, "Maximum 200 characters."),
});
