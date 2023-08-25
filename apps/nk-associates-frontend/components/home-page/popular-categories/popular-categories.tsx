"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../../spinner";
import { getPopularCategories } from "../../../utils/api-calls";
import CategoryCard from "./category-card";
import { PopularCategory } from "../../../utils/types/types";

const PopularCategories = () => {
  const [categories, setCategories] = useState<PopularCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const transformResponse = (response) => {
    const categoryKeys = Object.keys(response).filter(
      (key) => key.includes("category") && !key.includes("image"),
    );
    return categoryKeys.map((categoryKey) => {
      const imageKey = `${categoryKey}_image`;
      return {
        category_name: response[categoryKey],
        category_image: response[imageKey],
      };
    });
  };

  const fetchPopularCategories = async () => {
    setIsLoading(true);
    const resp = await getPopularCategories();
    if (resp?.data) {
      const transformedData = transformResponse(resp?.data?.attributes);
      setCategories(transformedData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPopularCategories();
  }, []);

  return (
    <>
      {categories.length > 0 || isLoading ? (
        <div className="xl:container my-12 md:my-20">
          <h6 className="text-[2rem] text-nk-black text-center font-metropolis-semibold px-4 md:px-8 md:text-4xl xl:px-0">
            Popular Categories
          </h6>

          {isLoading && categories.length === 0 ? (
            <div className="min-h-[50vh] flex flex-1">
              <Spinner />
            </div>
          ) : (
            <div className="property-carousel flex flex-nowrap overflow-x-scroll px-4 py-9 gap-8 md:py-8 md:px-8 xl:px-0">
              {categories?.map((category: PopularCategory, index: number) => (
                <CategoryCard key={index} category={category} />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default PopularCategories;
