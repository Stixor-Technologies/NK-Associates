"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "./property-card";
import { Properties } from "../../../utils/types/types";
import InfiniteScroll from "react-infinite-scroll-component";

const PropertyList = () => {
  const [properties, setProperties] = useState<Properties[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const getProperties = async () => {
    const resp = await fetch(
      `http://localhost:1337/api/properties?populate=*&pagination[start]=${properties.length}&pagination[limit]=9&sort[1]=id`
    );
    const data = await resp.json();
    // setProperties(data.data);
    setTimeout(() => {
      console.log(data.data);
      setProperties([...properties, ...data.data]);
      setTotal(data.meta.pagination.total);
    }, 2000);

    // console.log(data.attributes.property_images.data)
  };

  useEffect(() => {
    getProperties();
  }, []);
  const arr = [1, 2, 3, 4, 5];

  return (
    <>
      {/* <div className="grid gap-x-7 gap-y-12 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> */}
      {/* {arr.map((a) => (
            <PropertyCard key={a} />
          ))}  */}
      {properties && (
        <InfiniteScroll
          dataLength={properties.length} //This is important field to render the next data
          next={() => getProperties()}
          hasMore={total !== properties.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid gap-x-7 gap-y-12 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties &&
              properties.map((property, index) => {
                console.log(property.id)
                // console.log(property.attributes.property_images.data)
                // console.log(properties);
                return <PropertyCard key={index} />;
              })}
          </div>
        </InfiniteScroll>
      )}
      {/* </div> */}
    </>
  );
};

export default PropertyList;
