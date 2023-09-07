"use client";
import React, { FC, useEffect, useRef } from "react";
import { Events } from "../../utils/types/types";
import MobileCarousel from "./mobile-carousel";
import Carousel from "./carousel";
import EventCard from "./EventCard";
import CursorUtility from "../../utils/cursor-utility";

interface AllEventsProps {
  data: Events[];
  images: string[];
}

const AllEvents: FC<AllEventsProps> = ({ data, images }) => {
  let cursorUtilityRef = useRef<CursorUtility | null>(null);
  const eventsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    cursorUtilityRef.current = new CursorUtility(eventsContainerRef.current);
    return () => {
      if (cursorUtilityRef.current) {
        cursorUtilityRef.current.destroy();
        cursorUtilityRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={eventsContainerRef}
      className="container w-full rounded-lg py-4 md:rounded-lg md:py-20"
    >
      {data && (
        <div className="flex items-center justify-center md:hidden ">
          <MobileCarousel images={images} />
        </div>
      )}

      <div className="text-center font-metropolis-extrabold text-3xl text-nk-black md:text-5xl">
        Unveiling Our Journey
      </div>

      <div className="mt-7 text-center font-metropolis-light text-base text-nk-black md:text-3xl">
        <span>
          Explore the Remarkable Journey that has Propelled us to the Forefront
          of the Industry
        </span>
      </div>

      <div className="hidden items-center justify-center md:flex">
        <Carousel images={images} cursorUtilityRef={cursorUtilityRef} />
      </div>

      <div className="mt-8 text-center font-metropolis-extrabold text-3xl text-black md:mt-16 md:text-left">
        Latest News & Events
      </div>

      {!data ? (
        <div className="flex h-[10rem] items-center justify-center md:h-[20rem]">
          <h1 className="font-metropolis-medium text-2xl text-nk-black">
            No events available at the moment.
          </h1>
        </div>
      ) : (
        <div className="card-component mt-8 grid w-full grid-flow-row gap-8 lg:grid-cols-2">
          {data
            ?.sort((a, b) => {
              const dateA = new Date(a?.attributes?.event_date);
              const dateB = new Date(b?.attributes?.event_date);
              return dateB.getTime() - dateA.getTime();
            })
            .map((dataItem: Events, index: number) => (
              <EventCard
                key={index}
                dataItem={dataItem}
                cursorUtilityRef={cursorUtilityRef}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
