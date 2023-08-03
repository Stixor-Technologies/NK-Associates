import React, { FC } from "react";
import Link from "next/link";

interface BaseProps {
  text: string;
  type?: "transparent" | "inverted" | "solid" | "gradient";
  className?: string;
  buttonType?: "submit" | "button";
}

interface LinkProps extends BaseProps {
  navigateTo: string;
}

interface ButtonProps extends BaseProps {
  clickEvent: () => void;
}

type Props = LinkProps | ButtonProps;

const LinkButton: FC<Props> = (props) => {
   const {text, type, buttonType, className} = props
  const typeStyles = {
    transparent: "bg-transparent text-nk-gray border border-nk-red",
    inverted: "bg-nk-white text-nk-red",
    solid: "bg-nk-red text-nk-white",
    gradient: "bg-gradient-to-b from-nk-gradient-red-one to-nk-gradient-red-two text-nk-white",
  };

  const classes = `rounded-full text-center capitalize font-metropolis transition-all ease-in-out duration-500 hover:shadow-lg hover:delay-200 
  ${typeStyles[type || "gradient"]} 
  py-2 block ${className || ""}`;

  if ("clickEvent" in props) {
    return (
      <button type={buttonType || "button"} className={classes} onClick={props.clickEvent}>
        {text}
      </button>
    );
  }

  if ("navigateTo" in props) {
    return (
      <Link className={classes} href={props.navigateTo}>
        {text}
      </Link>
    );
  }
};

export default LinkButton;
