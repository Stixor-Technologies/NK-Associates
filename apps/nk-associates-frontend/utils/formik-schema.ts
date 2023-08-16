import * as Yup from "yup";

export const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 25 characters")
    .required("Please enter you name"),

  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),
  category: Yup.string().required("Please select category"),

  message: Yup.string()
    .required("Please enter your message")
    .min(10, "Minimum 10 characters")
    .max(200, "Maximum 200 characters."),
});

export const JobFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 25 characters")
    .required("Please enter you name"),

  father_name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 25 characters"),

  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),

  current_address: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters")
    .required("Please enter you current address"),

  permanent_address: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters")
    .required("Please enter you permanent address"),

  department: Yup.string().required("Please select category"),
});
