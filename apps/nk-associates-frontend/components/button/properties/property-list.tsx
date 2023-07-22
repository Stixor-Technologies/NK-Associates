"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "./property-card";
import { Properties } from "../../../utils/types/types";
import { ImageData } from "../../../utils/types/types";

const PropertyList = () => {
  const [properties, setProperties] = useState<Properties[]>();
  const [imageData, setImage] = useState<ImageData[]>([]);

  useEffect(() => {
    const getProperties = async () => {
      const resp = await fetch(
        "http://localhost:1337/api/properties?populate=*&pagination[start]=0&pagination[limit]=12"
      );
      const data = await resp.json();
      setProperties(data.data);
      // console.log(data.attributes.property_images.data)
    };
    getProperties();
  }, []);
  const arr = [1, 2, 3, 4, 5];

  return (
    <div className="grid gap-x-7 gap-y-12 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {arr.map((a) => (
            <PropertyCard key={a} />
          ))} 
      {/* {properties && properties.map((property, index) => {
          console.log(property.attributes.property_images.data)
        return <PropertyCard key={index} />
      })} */}
    </div>
  );
};

export default PropertyList;
