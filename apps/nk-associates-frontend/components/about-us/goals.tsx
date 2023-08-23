"use client";
import React, { FC, useState, useEffect } from "react";
import AboutCard1 from "./about-card-1";
import AboutCard2 from "./about-card-2";
import { getAboutCard1, getAboutCard2 } from "../../utils/api-calls";
import { About1, About2 } from "../../utils/types/types";
import Spinner from "../spinner";

const Goals: FC = () => {
  const [about, setAbout] = useState<About1[]>([]);
  const [about2, setAbout2] = useState<About2[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp2 = await getAboutCard2();
        const resp = await getAboutCard1();
        if (resp?.data) {
          setAbout(resp?.data);
        }
        if (resp2?.data) {
          setAbout2(resp2?.data);
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
        {isLoading && about.length === 0 ? (
          <div className="my-4 flex justify-center">
            <Spinner />
          </div>
        ) : about.length > 0 ? (
          about.map((about, index) => <AboutCard1 key={index} about={about} />)
        ) : (
          <div>
            <p className="font-metropolis text-nk-dark-gray py-10 text-center text-base">
              No Information Available
            </p>
          </div>
        )}
      </div>
      <div className="card-container py-8 min-h-screen md:py-1">
        {isLoading && about2.length === 0 ? (
          <div className="my-4 flex justify-center">
            <Spinner />
          </div>
        ) : about2.length > 0 ? (
          about2.map((about2, index) => (
            <AboutCard2 key={index} about={about2} />
          ))
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
