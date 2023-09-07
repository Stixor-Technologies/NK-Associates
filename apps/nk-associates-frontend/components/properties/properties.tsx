"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import PropertyList from "./property-list";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGridProperties, getMapProperties } from "../../utils/api-calls";
import { Property } from "../../utils/types/types";
import { debounce } from "lodash";
import MapBtn from "../../public/assets/icons/map-list-icon.svg";
import ListIcon from "../../public/assets/icons/list-icon.svg";
import PropertyCard from "./property-card";
import MapStyles from "../../utils/map-styles.json";
import "./map-info-window.css";
import SearchBar from "./search-bar";
import PropertyListSkeleton from "../skeletons/property/property-list-skeleton";

import useFilters, { FiltersProvider } from "../../utils/useFilters";

const center = {
  lat: 33.58468464794478,
  lng: 73.04698696017488,
};

const Properties = () => {
  const [filtersState, filtersDispatch] = useFilters();

  const [isList, setIsList] = useState<boolean>(true);
  const [gridProperties, setGridProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mapProperties, setMapProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [hasMapRendered, setHasMapRendered] = useState<boolean>(false);

  const mapRef = useRef<google.maps.Map | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fetchGridData = async (freshData?: boolean, moreLoad?: boolean) => {
    setIsLoading(true);

    const resp = await getGridProperties(
      freshData,
      moreLoad,
      freshData ? 0 : gridProperties.length,
      12,
      filtersState,
    );

    if (resp?.data) {
      if (freshData) {
        setGridProperties(resp.data);
      } else {
        setGridProperties((prevProperties) => [
          ...prevProperties,
          ...resp.data,
        ]);
      }
      setTotal(resp.meta.pagination.total);
    }
    setIsLoading(false);
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onBoundsChanged = debounce(async () => {
    const map = mapRef.current;
    if (map) {
      const newBounds = map.getBounds();
      const bounds = newBounds.toJSON();

      if (selectedProperty) {
        const selectedLatLng = {
          lat: selectedProperty?.attributes?.latitude,
          lng: selectedProperty?.attributes?.longitude,
        };

        if (selectedLatLng && !newBounds.contains(selectedLatLng)) {
          setSelectedProperty(null);
        }
      }

      try {
        const resp = await getMapProperties(
          bounds.south,
          bounds.north,
          bounds.west,
          bounds.east,
          filtersState,
        );
        if (resp?.data) {
          setMapProperties(resp?.data);
        }
      } catch (error) {
        console.error("error loading");
      }
    }
  }, 500);

  const mapOptions = {
    disableDefaultUI: false,
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    minZoom: 5,
    maxZoom: 40,

    styles: MapStyles,
  };

  const handleRefreshData = () => {
    if (isList) {
      fetchGridData(true);
    } else {
      onBoundsChanged();
    }
  };

  useEffect(() => {
    fetchGridData();
  }, []);

  return (
    <div className="pt-6 flex flex-col md:pt-0 z-10">
      {isList && (
        <div className="container mx-auto px-4 text-center">
          <h2 className="pb-3 font-metropolis-bold text-3xl text-nk-black md:pb-6 md:text-5xl">
            Property
          </h2>
          <p className="py-2 font-metropolis-light text-sm text-nk-black md:text-xl">
            Unlock Your Perfect Property, Find, Buy, Rent with Ease
          </p>
        </div>
      )}
      <SearchBar onFilter={handleRefreshData} isListView={isList} />

      <>
        {isLoading && gridProperties?.length === 0 ? (
          <PropertyListSkeleton />
        ) : gridProperties?.length > 0 ? (
          <InfiniteScroll
            dataLength={gridProperties.length}
            next={() => {
              fetchGridData(false, filtersState?.filterIsSelected);
            }}
            hasMore={total !== gridProperties?.length}
            loader={isLoading && <PropertyListSkeleton />}
            className={isList ? "block" : "hidden"}
          >
            <PropertyList properties={gridProperties} />
          </InfiniteScroll>
        ) : (
          <div className="min-h-[50vh] flex flex-1 items-center justify-center text-nk-black">
            <p className="text-center">No Properties Available</p>
          </div>
        )}
      </>
    </div>
  );
};

export default function PropertiesWithProvider() {
  return (
    <FiltersProvider>
      <Properties />
    </FiltersProvider>
  );
}
