"use client";
import React from "react";
import SearchBar from "../properties/search-bar";
import { FiltersProvider } from "../../utils/useFilters";
import useFilters from "../../utils/useFilters";
import LinkButton from "../button/link-button";

const HomeSearch = () => {
  return (
    <div className="container md:max-w-3xl lg:max-w-5xl w-full mx-auto mt-5 md:mt-4 md:mb-20">
      <div className="flex md:block gap-4 justify-center">
        <div className="w-[50%] md:w-full">
          <SearchBar actHome />
        </div>

        <LinkButton
          type="transparentRed"
          text="get in touch"
          navigateTo="/contact"
          className="w-[50%] py-2.5 md:hidden"
        />
      </div>
    </div>
  );
};

export default function SearchWithProvider() {
  return (
    <FiltersProvider>
      <HomeSearch />
    </FiltersProvider>
  );
}
