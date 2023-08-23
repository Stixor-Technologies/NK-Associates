"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../spinner";
import PropertyCard from "../properties/property-card";
import { Property } from "../../utils/types/types";
import { getFeaturedProperties } from "../../utils/api-calls";
import LinkButton from "../button/link-button";

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFeaturedProperties = async () => {
    setIsLoading(true);
    const resp = await getFeaturedProperties();
    if (resp?.data) {
      const propertyArray = Object.keys(resp?.data?.attributes)
        .filter((key) => !["createdAt", "updatedAt"]?.includes(key))
        .map((key) => resp?.data?.attributes[key]?.data);

      setFeaturedProperties(propertyArray);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  return (
    <>
      {featuredProperties.length > 0 || isLoading ? (
        <div className="xl:container my-12 md:my-20">
          <h6 className="text-[2rem] text-center font-metropolis-semibold px-4 md:px-8 md:text-4xl xl:px-0">
            Featured Properties
          </h6>

          {isLoading && featuredProperties.length === 0 ? (
            <div className="min-h-[50vh] flex flex-1">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 py-9 gap-8 md:py-8 md:px-8 xl:px-0">
                {featuredProperties?.map(
                  (property: Property, index: number) => (
                    <PropertyCard key={index} property={property} actFeatured />
                  ),
                )}
              </div>

              <LinkButton
                text="Explore all"
                type="gradient"
                navigateTo="/properties"
                className="self-center w-64 h-11 text-lg md:mx-0 md:w-[25rem] md:h-[3.125rem]"
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default FeaturedProperties;
