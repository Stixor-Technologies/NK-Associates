"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import ServiceCard from "./service-card";
import { Services } from "../../utils/types/types";
import { getServices } from "../../utils/api-calls";
import Spinner from "../spinner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ServicesList: FC = () => {
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getServices();
        if (resp?.data) {
          setServices(resp?.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const isScreenWideEnough = window.innerWidth > 768;
    if (isScreenWideEnough && services.length > 0) {
      const cards: HTMLDivElement[] = gsap.utils.toArray(".service-card");
      const spacer = 21;
      cards.forEach((card, index) => {
        gsap.to(card, {
          scale: () => 0.85 + index * 0.02,
          ease: "none",
          scrollTrigger: {
            id: "card_trigger",
            trigger: card,
            start: "top-=" + 40 * index + " 40%",
            end: "top 20%",
            scrub: true,
          },
        });
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: `top-=${index * spacer} 20%`,
            endTrigger: ".card-container",
            end: `bottom center+=${370 + cards.length * spacer}`,
            pin: true,
            pinSpacing: false,
            id: "card-" + index,
            scrub: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getById("card_trigger")?.kill();
    };
  }, [services]);

  return (
    <div ref={ref} className="card-container py-8 min-h-screen md:py-1">
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
