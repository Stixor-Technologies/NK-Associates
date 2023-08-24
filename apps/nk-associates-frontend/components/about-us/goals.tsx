"use client";
import React, { FC, useState, useEffect } from "react";
import AboutCard1 from "./about-card-1";
import AboutCard2 from "./about-card-2";
import { getAbout } from "../../utils/api-calls";
import { VisionMission, ValueGoals } from "../../utils/types/types";
import Spinner from "../spinner";

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
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card-container py-8 min-h-screen md:py-1">
      <div className="card-container py-8 min-h-screen md:py-1">
        {isLoading && card1.length === 0 ? (
          <div className="my-4 flex justify-center">
            <Spinner />
          </div>
        ) : card1.length > 0 ? (
          card1.map((card1, index) => <AboutCard1 key={index} about={card1} />)
        ) : (
          <div>
            <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
              No Information Available
            </p>
          </div>
        )}
      </div>
      <div className="card-container py-8 min-h-screen md:py-1">
        {isLoading && card2.length === 0 ? (
          <div className="my-4 flex justify-center">
            <Spinner />
          </div>
        ) : card2.length > 0 ? (
          card2.map((card2, index) => <AboutCard2 key={index} about={card2} />)
        ) : (
          <div>
            <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
              No Information Available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
