"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { getAbout } from "../../utils/api-calls";
import { Vision, Mission, Values, Goals } from "../../utils/types/types";
import Spinner from "../spinner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MissionCard from "./mission";
import ValuesCard from "./values";
import VisionCard from "./vision";
import GoalsCard from "./goal";

gsap.registerPlugin(ScrollTrigger);

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
    ScrollTrigger.getById("aboutTrigger")?.kill();
    ScrollTrigger.getById("mobileTrigger")?.kill();

    const cards = gsap.utils.toArray(".card");
    const textAbout: HTMLElement[] = gsap.utils.toArray(".text-about");
    const imagesAbout: HTMLElement[] = gsap.utils.toArray(".images-about");

    if (windowSize >= breakPoint && Vision) {
      gsap.set(".card:not(:first-child) .text-about", { opacity: 0 });
      gsap.set(".card:not(:first-child) .images-about", {
        y: "150%",
        x: "0%",
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

      let cards: HTMLElement[] = gsap.utils.toArray(".images-about");
      cards.forEach((card, index) => {
        gsap.from(card, {
          x: "150%",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            id: "mobileTrigger",
            trigger: card,
            start: "top 40%",
          },
        });
      });
    }
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
                <MissionCard key={0} about={Mission} />
                <VisionCard key={1} about={Vision} />
                <ValuesCard key={2} about={Values} />
                <GoalsCard key={3} about={Goals} />
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
