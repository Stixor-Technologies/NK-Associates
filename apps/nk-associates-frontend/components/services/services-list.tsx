import React, { FC, useState, useEffect } from "react";
import ServiceCard from "./service-card";
import { Service } from "../../utils/types/types";
import { getServices } from "../../utils/api-calls";

interface ServiceListProps {
  services: Service[];
}

const ServicesList: FC<ServiceListProps> = ({ services }) => {
  const [jobs, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const resp = await getServices();
    if (resp?.data) {
      setServices(resp.data);
      setTotal(resp.meta.pagination.total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="p-4">
      {services.map((Service, index) => (
        <ServiceCard key={index} service={Service} />
      ))}
    </div>
  );
};

export default ServicesList;
