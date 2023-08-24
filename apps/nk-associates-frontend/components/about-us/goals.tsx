"use client";
import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import AboutCard1 from "./about-card-1";
import AboutCard2 from "./about-card-2";
import { getAbout } from "../../utils/api-calls";
import { VisionMission, ValueGoals } from "../../utils/types/types";
import Spinner from "../spinner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Goals: FC = () => {
  // const [about, setAbout] = useState<About>();
  const [card1, setCard1] = useState<VisionMission[]>([]);
  const [card2, setCard2] = useState<ValueGoals[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await getAbout();
        if (resp?.data) {
          setCard1(resp?.data?.attributes?.card_1);
          setCard2(resp?.data?.attributes?.card_2);
        }
      } catch (error) {
        console.error("Error fetching information:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const isScreenWideEnough = window.innerWidth > 1024;
    if (isScreenWideEnough && card1.length > 0) {
      const cards = gsap.utils.toArray(".card");

      const textAbout: HTMLElement[] = gsap.utils.toArray(".text-about");
      const imagesAbout: HTMLElement[] = gsap.utils.toArray(".images-about");

      gsap.set(".card:not(:first-child) .text-about", { opacity: 0 });
      gsap.set(".card:not(:first-child) .images-about", {
        opacity: 0,
        y: "100%",
      });

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          id: "aboutTrigger",
          trigger: ".card-container",
          start: "top 15%",
          end: `+=${40 * cards.length}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      cards.forEach((card, index) => {
        if (imagesAbout[index + 1]) {
          pinnedTl
            .to(textAbout[index], {
              opacity: 0,
            })
            .to(
              textAbout[index + 1],
              {
                opacity: 1,
              },
              "<0.1",
            )
            .to(
              imagesAbout[index + 1],
              {
                opacity: 1,
                y: 0,
                rotate: 6,
              },
              "<0.1",
            );
        }
      });
    }
  }, [card1, card2]);

  return (
    <div className="card-container relative py-8 min-h-screen md:py-1 my-32">
      <div className="panel-container">
        <>
          {isLoading && card1.length === 0 ? (
            <div className="my-4 flex justify-center">
              <Spinner />
            </div>
          ) : card1.length > 0 ? (
            card1.map((card1, index) => (
              <AboutCard1 key={index} about={card1} />
            ))
          ) : (
            <div>
              <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
                No Information Available
              </p>
            </div>
          )}
        </>
        <>
          {isLoading && card2.length === 0 ? (
            <div className=" flex justify-center">
              <Spinner />
            </div>
          ) : card2.length > 0 ? (
            card2.map((card2, index) => (
              <AboutCard2 key={index} about={card2} />
            ))
          ) : (
            <div>
              <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
                No Information Available
              </p>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Goals;
