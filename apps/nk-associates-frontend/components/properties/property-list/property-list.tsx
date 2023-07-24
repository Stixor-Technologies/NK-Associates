"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "../property-card";
import { Properties } from "../../../utils/types/types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../spinner";
import { getProperties } from "../../../utils/api-calls";
import Link from "next/link";
import Image from "next/image";
import List_Icon from "../../../public/assets/icons/list-icon.svg"

const PropertyList = () => {
  const [properties, setProperties] = useState<Properties[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const fetchData = async () => {
    setIsLoading(true);
    const resp = await getProperties(properties.length, 9);
    setProperties([...properties, ...resp.data]);
    setTotal(resp.meta.pagination.total);
    setIsLoading(false);
  }

  useEffect( () => {   
    fetchData();
  }, []);

  return (
    <>
    <Link href={"/properties/property-map"} className="z-10 fixed flex items-center gap-2 bottom-16 left-1/2 -translate-x-1/2 rounded-full text-center capitalize text-sm py-2 px-4 transition-all ease-in-out duration-300 hover:shadow-lg hover:delay-100 bg-gradient-to-b bg-nk-gradient-red-one to-nk-gradient-red-two text-white md:text-2xl md:py-3 md:px-6 md:gap-4">
        <span>Show Map</span>
        <div className="relative max-w-[1.375rem] w-full md:max-w-[2.188rem]">
        <Image src={List_Icon} width={35} height={35} alt="" className="mx-auto" />
    </div>
    </Link>
      {properties.length > 0 ? (
        <InfiniteScroll
          dataLength={properties.length}
          next={() => fetchData()}
          hasMore={total !== properties.length}
          loader={isLoading && <Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid gap-x-7 gap-y-12 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden">
            {properties &&
              properties.map((property, index) => (
                 <PropertyCard key={index} property = {property} />
                 ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="flex flex-1">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default PropertyList;
