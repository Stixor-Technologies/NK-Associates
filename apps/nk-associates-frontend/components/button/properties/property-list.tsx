'use client'
import React, {useState, useEffect} from "react";
import PropertyCard from "./property-card";

const PropertyList = () => {
    const [first, setfirst] = useState("");


    useEffect(() => {
        const getProperties = async () => {
            const resp = await fetch('http://localhost:1337/api/properties?populate=*&pagination[start]=2&pagination[limit]=12')
            const data = await resp.json();
            console.log(data)
        }
        getProperties();
    }, [])

    const arr = [1, 2, 3, 4, 5];

  return (
    <div className="grid gap-x-7 gap-y-12 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {arr.map((a) => (
            <PropertyCard key={a} />
          ))} 
    </div>
  );
};

export default PropertyList;
