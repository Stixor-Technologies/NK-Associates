"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { getAbout } from "../../utils/api-calls";
import { Vision, Mission, Values, Goals } from "../../utils/types/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MissionCard from "./mission";
import ValuesCard from "./values";
import VisionCard from "./vision";
import GoalsCard from "./goal";

interface GoalProps {
  mission: Mission;
  vision: Vision;
  values: Values;
  goals: Goals;
}

const Goals: FC<GoalProps> = ({ mission, vision, values, goals }) => {
  // console.log(mission);
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
          // setVision(resp?.data?.attributes?.Vision);
          // setMission(resp?.data?.attributes?.Mission);
          // setValues(resp?.data?.attributes?.Values);
          // setGoals(resp?.data?.attributes?.Goals);
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
    const cards: HTMLDivElement[] = gsap.utils.toArray(".card");
    const textAbout: HTMLElement[] = gsap.utils.toArray(".text-about");
    const imagesAbout: HTMLElement[] = gsap.utils.toArray(".images-about");

    ScrollTrigger.getById("about-web-trigger")?.kill();
    const allTriggers = ScrollTrigger.getAll();

    allTriggers.forEach((trigger) => {
      if (trigger.vars.id === "about-mobile-trigger") {
        trigger.kill();
      }
    });

    if (windowSize >= breakPoint) {
      console.log("intializeTrigger Goal");

      gsap.set(".images-about", {
        clearProps: true,
      });

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          id: "about-web-trigger",
          trigger: ".card-container",
          start: "top 20%",
          end: `+=${40 * cards.length}%`,

          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      cards.forEach((card, index) => {
        if (imagesAbout[index + 1]) {
          pinnedTl
            .to(textAbout[index], {
              opacity: 0,
            })
            .to(textAbout[index + 1], {
              opacity: 1,
            })
            .to(
              imagesAbout[index + 1],
              {
                opacity: 1,
                y: 0,
                // rotate: 6,
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
        gsap.to(card, {
          x: "0",
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
  }, [component, windowSize]);

  return (
    <div className="container card-container cardTrigger relative md:py-1 h-[60vh] lg:flex lg:flex-col justify-center my-20">
      {/* <>
        {isLoading && !Vision && !Mission && !Values && !Goals ? (
          <div className="my-4 flex justify-center">
            <Spinner />
          </div>
        ) : Mission ? (
          (() => {
            return (
              <>
                <MissionCard about={Mission} />
                <VisionCard about={Vision} />
                <ValuesCard about={Values} />
                <GoalsCard about={Goals} />
              </>
            );
          })()
        ) : (
          <div>
            <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
              No Information Available
            </p>
          </div>
        )}
      </> */}

      <>
        <MissionCard about={mission} />
        <VisionCard about={vision} />
        <ValuesCard about={values} />
        <GoalsCard about={goals} />
      </>
    </div>
  );
};

export default Goals;
