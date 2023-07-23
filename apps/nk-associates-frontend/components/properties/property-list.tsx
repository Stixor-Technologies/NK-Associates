"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "./property-card";
import { Properties } from "../../utils/types/types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../spinner";

const PropertyList = () => {
  const [properties, setProperties] = useState<Properties[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const name = ''

  const getProperties = async () => {
    setIsLoading(true);
    const resp = await fetch(
      `http://localhost:1337/api/properties?populate=*&pagination[start]=${properties.length}&pagination[limit]=9&sort[1]=id`
    );
    const data = await resp.json();
    setTimeout(() => {
      console.log(data.data);
      setProperties([...properties, ...data.data]);
      setTotal(data.meta.pagination.total);
      setIsLoading(false);
    }, 6000);
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      {properties.length > 0 ? (
        <InfiniteScroll
          dataLength={properties.length}
          next={() => getProperties()}
          hasMore={total !== properties.length}
          loader={isLoading && <Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid gap-x-7 gap-y-12 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties &&
              properties.map((property, index) => {
                console.log(property.id);
                // console.log(property.attributes.property_images.data)
                // console.log(properties);
                return <PropertyCard key={index} />;
              })}
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
