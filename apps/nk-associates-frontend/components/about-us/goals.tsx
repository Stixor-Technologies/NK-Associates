"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { getAbout } from "../../utils/api-calls";
import { Vision, Mission, Values, Goals } from "../../utils/types/types";
import Spinner from "../spinner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MissionCard from "./mission";
import ValuesCard from "./values";
import VisionCard from "./vision";
import GoalsCard from "./goal";

const Goals: FC = () => {
  const [Vision, setVision] = useState<Vision>();
  const [Mission, setMission] = useState<Mission>();
  const [Values, setValues] = useState<Values>();
  const [Goals, setGoals] = useState<Goals>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const component = useRef(null);
  const [windowSize, setWindowSize] = useState<number>(0);
  const breakPoint = 1024;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    handleWindowResize();

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
          setVision(resp?.data?.attributes?.Vision);
          setMission(resp?.data?.attributes?.Mission);
          setValues(resp?.data?.attributes?.Values);
          setGoals(resp?.data?.attributes?.Goals);
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
    const cards = gsap.utils.toArray(".card");
    const textAbout: HTMLElement[] = gsap.utils.toArray(".text-about");
    const imagesAbout: HTMLElement[] = gsap.utils.toArray(".images-about");

    ScrollTrigger.getById("about-web-trigger")?.kill();
    const allTriggers = ScrollTrigger.getAll();

    allTriggers.forEach((trigger) => {
      if (trigger.vars.id === "about-mobile-trigger") {
        trigger.kill();
      }
    });

    if (windowSize >= breakPoint && Vision) {
      gsap.set(".card:not(:first-child) .text-about", { opacity: 0 });
      gsap.set(".images-about", {
        clearProps: true,
      });
      gsap.set(".card:not(:first-child) .images-about", {
        y: "150%",
        x: "0%",
      });

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          id: "about-web-trigger",
          trigger: ".card-container",
          start: "top 15%",
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
      gsap.set(".text-about", {
        clearProps: true,
      });

      gsap.set(".images-about", {
        clearProps: true,
      });

      let cards: HTMLElement[] = gsap.utils.toArray(".images-about");
      cards.forEach((card, index) => {
        gsap.from(card, {
          x: "150%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            id: "about-mobile-trigger",
            trigger: card,
            start: "top 40%",
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getById("about-web-trigger")?.kill();
      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach((trigger) => {
        if (trigger.vars.id === "about-mobile-trigger") {
          trigger.kill();
        }
      });
    };
  }, [Vision, Mission, Values, Goals, component, windowSize]);

  return (
    <div className=" container card-container cardTrigger relative min-h-[90vh] md:py-1 my-32">
      <>
        {isLoading && !Vision && !Mission && !Values && !Goals ? (
          <div className="my-4 flex justify-center">
            <Spinner />
          </div>
        ) : Mission ? (
          (() => {
            return (
              <div>
                <MissionCard about={Mission} />
                <VisionCard about={Vision} />
                <ValuesCard about={Values} />
                <GoalsCard about={Goals} />
              </div>
            );
          })()
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
