"use client";
import React from "react";
import SearchBar from "../properties/search-bar";
import { FiltersProvider } from "../../utils/useFilters";
import useFilters from "../../utils/useFilters";

const HomeSearch = () => {
  return (
    <div className=" max-w-5xl w-full mx-auto">
      <SearchBar actHome />
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
