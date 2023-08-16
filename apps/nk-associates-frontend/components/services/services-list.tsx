import React, { FC } from "react";
import ServiceCard from "./service-card";
import { Service } from "../../utils/types/types";

interface ServiceListProps {
  services: Service[];
}

const ServicesList: FC<ServiceListProps> = ({ services }) => {
  return (
    <div className="p-4">
      {services.map((Service, index) => (
        <ServiceCard key={index} service={Service} />
      ))}
    </div>
  );
};

export default ServicesList;
