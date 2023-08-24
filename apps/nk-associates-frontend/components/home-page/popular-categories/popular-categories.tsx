"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../../spinner";
import { getPopularCategories } from "../../../utils/api-calls";
import CategoryCard from "./category-card";

const PopularCategories = () => {
  const [popularCategories, setPopularCategories] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPopularCategories = async () => {
    setIsLoading(true);
    const resp = await getPopularCategories();
    console.log(resp);
    if (resp?.data) {
      const propertyArray = Object.keys(resp?.data?.attributes)
        .filter((key) => !["createdAt", "updatedAt"]?.includes(key))
        .map((key) => resp?.data?.attributes[key]?.data);

      setPopularCategories(propertyArray);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPopularCategories();
  }, []);

  return (
    <>
      {/* <CategoryCard /> */}

      {popularCategories.length > 0 || isLoading ? (
        <div className="xl:container my-12 md:my-20">
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold px-4 md:px-8 md:text-4xl xl:px-0">
            Popular Categories
          </h6>

          {isLoading && popularCategories.length === 0 ? (
            <div className="min-h-[50vh] flex flex-1">
              <Spinner />
            </div>
          ) : (
            <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 py-9 gap-8 md:py-8 md:px-8 xl:px-0">
              {popularCategories?.map((category, index: number) => (
                <CategoryCard />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default PopularCategories;
