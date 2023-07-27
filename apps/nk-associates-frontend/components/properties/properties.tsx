"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import PropertyList from "./property-list";
import PropertyMap from "./map-view-list";
import Spinner from "../spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { getProperties } from "../../utils/api-calls";
import { Property } from "../../utils/types/types";
import List_Icon from "../../public/assets/icons/list-icon.svg";

const Properties = () => {
  const [isList, setIsList] = useState<boolean>(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const resp = await getProperties(properties.length, 12);
    if (resp?.data) {
      setProperties((prevProperties) => [...prevProperties, ...resp.data]);
      setTotal(resp.meta.pagination.total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button
        className="fixed bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-nk-gradient-red-one bg-gradient-to-b to-nk-gradient-red-two px-4 py-2 text-center text-sm capitalize text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:delay-100 md:gap-4 md:px-6 md:py-3 md:text-2xl"
        onClick={() => setIsList(!isList)}
      >
        <span>Show Map</span>
        <div className="relative w-full max-w-[1.375rem] md:max-w-[2.188rem]">
          <Image
            src={List_Icon}
            width={35}
            height={35}
            alt="map-properties"
            className="mx-auto"
          />
        </div>
      </button>

      {isList ? (
        <>
          {isLoading && properties.length === 0 ? (
            <div className="flex flex-1">
              <Spinner />
            </div>
          ) : properties && properties.length > 0 ? (
            <InfiniteScroll
              dataLength={properties.length}
              next={fetchData}
              hasMore={total !== properties.length}
              loader={isLoading && <Spinner />}
            >
              <PropertyList properties={properties} />
            </InfiniteScroll>
          ) : (
            <div className="flex flex-1 items-center justify-center text-nk-black">
              <p className="text-center">No Properties Available</p>
            </div>
          )}
        </>
      ) : (
        <PropertyMap />
      )}
    </>
  );
};

export default Properties;
