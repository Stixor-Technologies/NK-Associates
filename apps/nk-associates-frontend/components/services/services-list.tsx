"use client";
import React, { FC, useState, useEffect } from "react";
import ServiceCard from "./service-card";
import { Service } from "../../utils/types/types";
import { getServices } from "../../utils/api-calls";
import Spinner from "../spinner";

const ServicesList: FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getServices();
        if (resp?.data) {
          setServices(resp.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {isLoading && services.length === 0 ? (
        <div className="my-4 flex justify-center">
          <Spinner />
        </div>
      ) : services.length > 0 ? (
        services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))
      ) : (
        <div>
          <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
            No Services Available
          </p>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
