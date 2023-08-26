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
        .map((key) => resp?.data?.attributes[key]?.data)
        .filter((property) => property !== null);

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
        <div className="xl:container py-10 md:py-16 min-h-[41.125rem] h-full">
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold mb-7 md:mb-9 md:text-4xl xl:px-0">
            Featured Properties
          </h6>

          {isLoading && featuredProperties.length === 0 ? (
            <div className="min-h-[50vh] flex flex-1">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 gap-6 md:px-8 xl:px-0">
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
                className="self-center w-64 h-11 text-lg mt-12 md:mx-0 md:w-[25rem] md:h-[3.125rem]"
              />
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default FeaturedProperties;
