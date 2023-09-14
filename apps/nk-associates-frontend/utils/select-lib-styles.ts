import { StylesConfig } from "react-select";

const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    border: "0px",
    boxShadow: "none",
    fontSize: "14px",
    padding: "10px 12px",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    ":hover": {
      cursor: "pointer",
      color: "#E74451",
    },
  }),
};

export default customStyles;
