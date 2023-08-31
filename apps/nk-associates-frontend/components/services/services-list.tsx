"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import ServiceCard from "./service-card";
import { Services } from "../../utils/types/types";
import { getServices } from "../../utils/api-calls";
import Spinner from "../spinner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouseFollower from "mouse-follower";
MouseFollower.registerGSAP(gsap);
import CursorUtility from "../../utils/cursor-utility";

gsap.registerPlugin(ScrollTrigger);

const ServicesList: FC = () => {
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement | null>(null);

  let cursor = useRef<MouseFollower | null>(null);
  let cursorUtilityRef = useRef<CursorUtility | null>(null); // Create a ref to hold the instance

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
      cursorUtilityRef.current = new CursorUtility(".card-container");

      // cursor.current = new MouseFollower({
      //   el: null,
      //   container: ".card-container",
      //   className: "mf-cursor",
      //   initialPos: [200, 200],
      //   visible: false,
      // });

      // console.log(cursor.current);
      const cards = gsap.utils.toArray(".service-card");
      const spacer = 21;
      const minScale = 0.95;

      const distributor = gsap.utils.distribute({
        base: minScale,
        amount: 0.05,
      });
      cards.forEach((card: HTMLDivElement, index: number) => {
        const scaleVal = distributor(index, cards[index], cards);

        const tween = gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: `top top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
          scale: scaleVal,
        });

        gsap.to(card, {
          duration: 1.5,
          scrollTrigger: {
            trigger: card,
            start: `top-=${index * spacer} 20%`,
            endTrigger: ".card-container",
            end: `bottom center+=${370 + cards.length * spacer}`,
            pin: true,
            pinSpacing: false,
            id: `pin-${index}`,
            scrub: 0,
            invalidateOnRefresh: true,
          },
        });
      });
    }
  }, [services]);

  const handleMouseEnter = () => {
    // console.log(cursor.current);
    cursorUtilityRef.current.setImage("/assets/icons/cursor-icon.svg");
    cursorUtilityRef.current.showCursor();
  };

  const handleMouseLeave = () => {
    // console.log("leave");
    cursorUtilityRef.current.removeImage();
    // cursor.current.removeImg();
    // cursor.current.hide();
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text
      className="card-container py-8 min-h-screen md:py-1"
    >
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
