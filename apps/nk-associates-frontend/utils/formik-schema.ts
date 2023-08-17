import * as Yup from "yup";

export const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .required("Please enter your name"),

  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),

  subject: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .required("Please enter subject"),

  category: Yup.string().required("Please select category"),

  message: Yup.string()
    .required("Please enter your message")
    .min(10, "Minimum 10 characters")
    .max(200, "Maximum 200 characters."),
});
