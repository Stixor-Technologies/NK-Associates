"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import AboutCard1 from "./about-card-1";
import AboutCard2 from "./about-card-2";
import { getAbout } from "../../utils/api-calls";
import { VisionMission, ValueGoals } from "../../utils/types/types";
import Spinner from "../spinner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Goals: FC = () => {
  const [card1, setCard1] = useState<VisionMission[]>([]);
  const [card2, setCard2] = useState<ValueGoals[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const component = useRef(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const breakPoint = 1024;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
    ScrollTrigger.getById("aboutTrigger")?.kill();
    ScrollTrigger.getById("mobileTrigger")?.kill();

    const isScreenWideEnough = window.innerWidth > 1024;
    const cards = gsap.utils.toArray(".card");
    const textAbout: HTMLElement[] = gsap.utils.toArray(".text-about");
    const imagesAbout: HTMLElement[] = gsap.utils.toArray(".images-about");

    if (windowSize >= breakPoint && card1.length > 0) {
      gsap.set(".card:not(:first-child) .text-about", { opacity: 0 });
      gsap.set(".card:not(:first-child) .images-about", {
        y: "150%",
        x: "0%",
      });

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          id: "aboutTrigger",
          trigger: ".card-container",
          // markers: true,
          start: "top 5%",
          end: `+=${40 * cards.length}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
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
    } else {
      gsap.set(".text-about", { opacity: 1 });
      gsap.set(".images-about", { opacity: 1, y: 0, x: "0%", rotate: 0 });

      let ctx = gsap.context(() => {
        let cards: HTMLElement[] = gsap.utils.toArray(".images-about");
        cards.forEach((card, index) => {
          gsap.from(card, {
            x: 600,
            scrollTrigger: {
              id: "mobileTrigger",
              trigger: card,
              start: "top 40%",
              // markers: true,
            },
          });
        });
      });
    }
  }, [card1, card2, component, windowSize]);

  let spin = 0;
  let spin2 = -8;
  return (
    <div className="card-container container cardTrigger relative py-8 min-h-screen md:py-1 my-32">
      <>
        {isLoading && card1.length === 0 && card2.length === 0 ? (
          <div className="my-4 flex justify-center">
            <Spinner />
          </div>
        ) : card1.length > 0 ? (
          card1.map((card, index) => {
            const cardSpin = spin;
            spin += 2;
            if (window.innerWidth < 1024) {
              spin = 0;
            }
            return (
              <AboutCard1
                key={index}
                about={card}
                className=""
                spin={cardSpin}
              />
            );
          })
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
          <></>
        ) : card2.length > 0 ? (
          card2.map((card2, index) => {
            let cardSpin = spin2;
            cardSpin += 7;
            if (window.innerWidth < 1024) {
              cardSpin = 0;
            }
            return (
              <AboutCard2
                key={index}
                about={card2}
                className=""
                spin={cardSpin}
              />
            );
          })
        ) : (
          <div>
            <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
              No Information Available
            </p>
          </div>
        )}
      </>
    </div>
  );
};

export default Goals;
