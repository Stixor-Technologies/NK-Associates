import React from "react";
import PlaceHolderImage from "../../public/assets/images/placeholder.svg";
import Image from "next/image";

const serviceCard = () => {
  return (
    <div>
      <Image src={PlaceHolderImage} alt="service-card" />
    </div>
  );
};

export default serviceCard;
