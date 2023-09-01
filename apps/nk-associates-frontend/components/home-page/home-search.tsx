"use client";
import React from "react";
import SearchBar from "../properties/search-bar";
import { FiltersProvider } from "../../utils/useFilters";
import useFilters from "../../utils/useFilters";

const HomeSearch = () => {
  const [filtersState, filtersDispatch] = useFilters();

  console.log(filtersState);

  return <SearchBar actHome />;
};

export default function SearchWithProvider() {
  return (
    <FiltersProvider>
      <HomeSearch />
    </FiltersProvider>
  );
}
