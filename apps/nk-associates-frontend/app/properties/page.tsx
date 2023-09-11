"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import PropertyList from "../../components/properties/property-list";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGridProperties, getMapProperties } from "../../utils/api-calls";
import { Property } from "../../utils/types/types";
import { debounce } from "lodash";
import MapBtn from "../../public/assets/icons/map-list-icon.svg";
import ListIcon from "../../public/assets/icons/list-icon.svg";
import PropertyCard from "../../components/properties/property-card";
import MapStyles from "../../utils/map-styles.json";
import "../../components/properties/map-info-window.css";
import SearchBar from "../../components/properties/search-bar/search-bar";
import PropertyListSkeleton from "../../components/skeletons/property/property-list-skeleton";
import { useSearchParams } from "next/navigation";

import useFilters, { FiltersProvider } from "../../utils/useFilters";

const center = {
  lat: 33.58468464794478,
  lng: 73.04698696017488,
};

const PropertyPage = () => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  const [filtersState, filtersDispatch] = useFilters();
  const [isList, setIsList] = useState<boolean>(true);
  const [gridProperties, setGridProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mapProperties, setMapProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );

  const [filtersInitialized, setFiltersInitialized] = useState(false);

  const [hasMapRendered, setHasMapRendered] = useState<boolean>(false);

  const mapRef = useRef<google.maps.Map | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fetchGridData = async ({
    dontApplyFilter = false,
    freshData = false,
    moreLoad = false,
  } = {}) => {
    setIsLoading(true);
    const resp = await getGridProperties(
      freshData,
      moreLoad,
      freshData ? 0 : gridProperties.length,
      12,
      dontApplyFilter ? undefined : filtersState,
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

  const onBoundsChanged = debounce(async (dontApplyFilter?: boolean) => {
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
          dontApplyFilter ? undefined : filtersState,
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

  const handleRefreshData = (dontApplyFilter?: boolean) => {
    if (isList) {
      fetchGridData({ dontApplyFilter: dontApplyFilter, freshData: true });
    } else {
      onBoundsChanged(dontApplyFilter);
    }

    if (Object.keys(queryParams).length > 0 && dontApplyFilter) {
      history.replaceState(null, "", "/properties");
    }
  };

  useEffect(() => {
    if (Object.keys(queryParams).length > 0) {
      const updatedFilters = {
        selectedCategoryId: queryParams?.selectedCategoryId
          ? Number(queryParams?.selectedCategoryId)
          : undefined,
        selectedTypeId: queryParams?.selectedTypeId
          ? Number(queryParams?.selectedTypeId)
          : undefined,
        minSelectedPrice: queryParams?.minSelectedPrice
          ? Number(queryParams?.minSelectedPrice)
          : undefined,
        maxSelectedPrice: queryParams?.maxSelectedPrice
          ? Number(queryParams?.maxSelectedPrice)
          : undefined,
        selectedProjectId: queryParams?.selectedProjectId
          ? Number(queryParams?.selectedProjectId)
          : undefined,
        selectedPurposeId: queryParams?.selectedPurposeId
          ? Number(queryParams?.selectedPurposeId)
          : undefined,
      };

      filtersDispatch({
        type: "homeSearch",
        payload: updatedFilters,
      });

      setFiltersInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (filtersInitialized || Object.keys(queryParams).length === 0) {
      fetchGridData({ freshData: true });
    }
  }, [filtersInitialized]);

  return (
    <section className="flex flex-col bg-right-top bg-no-repeat md:bg-nk-bg">
      {/* <Properties /> */}
      <div
        className={`pt-6 relative flex flex-col md:pt-0 z-10 ${
          isList && "mb-4"
        }`}
      >
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
          {isList && (
            <>
              {isLoading && gridProperties.length === 0 ? (
                <PropertyListSkeleton />
              ) : gridProperties && gridProperties.length > 0 ? (
                <InfiniteScroll
                  dataLength={gridProperties.length}
                  next={() => {
                    fetchGridData({ moreLoad: filtersState?.filterIsSelected });
                  }}
                  hasMore={total !== gridProperties.length}
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
          )}

          {(!isList || hasMapRendered) && (
            <div className={`${isList ? "hidden" : "block"} relative`}>
              <GoogleMap
                zoom={11}
                center={center}
                onLoad={(map) => {
                  onMapLoad(map);
                  setHasMapRendered(true);
                }}
                options={mapOptions}
                mapContainerClassName="h-[calc(100vh-5.5rem-4.25rem-1.5rem)] w-full mt-6"
                onBoundsChanged={onBoundsChanged}
              >
                {mapProperties.map((location, index) => {
                  const position = {
                    lat: location.attributes.latitude,
                    lng: location.attributes.longitude,
                  };

                  const isSelected =
                    selectedProperty && selectedProperty.id === location.id;
                  return (
                    <Marker
                      key={index}
                      position={position}
                      icon={{
                        url: isSelected
                          ? "assets/icons/marker-black.svg"
                          : "assets/icons/area-marker.svg",
                        scaledSize: isSelected
                          ? new window.google.maps.Size(40, 40)
                          : new window.google.maps.Size(30, 30),
                      }}
                      onClick={() => {
                        setSelectedProperty(location);
                      }}
                    />
                  );
                })}

                {selectedProperty && (
                  <InfoWindow
                    position={{
                      lat: selectedProperty.attributes.latitude,
                      lng: selectedProperty.attributes.longitude,
                    }}
                    onCloseClick={() => setSelectedProperty(null)}
                  >
                    <PropertyCard property={selectedProperty} actMap={true} />
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          )}

          {gridProperties.length > 0 && (
            <button
              ref={buttonRef}
              className={`self-center left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-center text-sm capitalize text-nk-white transition-all duration-300 ease-in-out md:gap-4 md:px-6 md:py-3 md:text-2xl bg-nk-gradient-red-one bg-gradient-to-b to-nk-gradient-red-two hover:scale-[1.1] ${
                isList ? "sticky bottom-10 top-0" : "absolute bottom-[2.5rem]"
              }`}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setIsList(!isList);
              }}
            >
              <span>{`${isList ? "Show Map" : "Show List"}`}</span>
              <Image
                src={isList ? MapBtn : ListIcon}
                width={35}
                height={35}
                alt="properties-view"
                className={`mx-auto ${
                  isList ? "w-[1.375rem] md:w-[2.188rem]" : " w-4 md:w-[1.7rem]"
                } `}
              />
            </button>
          )}
        </>
      </div>
    </section>
  );
};

export default function PropertiesWithProvider() {
  return (
    <FiltersProvider>
      <PropertyPage />
    </FiltersProvider>
  );
}
