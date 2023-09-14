import * as Yup from "yup";
const FILE_SIZE = 5 * 1000 * 1000;

export const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only characters are allowed")
    .min(3, "Name should be atleast 3 characters long.")
    .max(20, "Name should be at most 20 characters long.")
    .required("Please enter your name"),

  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),

  subject: Yup.string()
    .min(3, "Subject should be atleast 3 characters long.")
    .max(20, "Subject should be at most 20 characters long.")
    .required("Please enter subject"),
  category: Yup.string().required("Please select category"),
  message: Yup.string()
    .required("Please enter your message")
    .min(10, "Message should be atleast 10 characters long.")
    .max(200, "Message should be at most 200 characters long."),
});

export const InquiriesSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only characters are allowed")
    .min(3, "Name should be atleast 3 characters long.")
    .max(20, "Name should be at most 20 characters long.")
    .required("Please enter your name"),

  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),

  subject: Yup.string()
    .min(3, "Subject should be atleast 3 characters long.")
    .max(20, "Subject should be at most 20 characters long.")
    .required("Please enter subject"),
  message: Yup.string()
    .required("Please enter your message")
    .min(10, "Message should be atleast 10 characters long")
    .max(200, "Message should be at most 200 characters long."),
});

export const JobFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should be atleast 3 characters long.")
    .max(20, "Name should be at most 20 characters long.")
    .required("Please enter your name"),

  father_name: Yup.string()
    .min(3, "Father name should be atleast 3 characters long.")
    .max(20, "Father name should be at most 20 characters long."),

  email: Yup.string()
    .matches(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, "Invalid email address")
    .required("Please enter your email address"),

  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(/^(\+92|0|92)[0-9]{10}$/, "Phone number is not valid"),

  current_address: Yup.string()
    .min(3, "Current Address should be atleast 3 characters long.")
    .max(100, "Current Address should be at most 100 characters long.")
    .required("Please enter your current address"),

  permanent_address: Yup.string()
    .min(3, "Permanent Address should be atleast 3 characters long.")
    .max(100, "Permanent Address should be at most 100 characters long.")
    .required("Please enter your permanent address"),

  department: Yup.string().required("Please select department"),

  resume: Yup.mixed()
    .test("fileRequired", "Please attach your resume", function (value) {
      return Boolean(value && value instanceof File);
    })
    .test("fileSize", "File should not exceed 5MB", function (value) {
      if (!value) return true;
      return value instanceof File && value.size <= FILE_SIZE;
    }),

  cover_letter: Yup.mixed().test(
    "fileSize",
    "File should not exceed 5MB",
    function (value) {
      if (!value) return true;
      return value instanceof File && value.size <= FILE_SIZE;
    },
  ),
});
