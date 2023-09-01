"use client";
import React from "react";
import SearchBar from "../properties/search-bar";
import { FiltersProvider } from "../../utils/useFilters";
import useFilters from "../../utils/useFilters";

const HomeSearch = () => {
  return <SearchBar actHome />;
};

export default function SearchWithProvider() {
  return (
    <FiltersProvider>
      <HomeSearch />
    </FiltersProvider>
  );
}
