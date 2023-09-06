"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import PropertyList from "./property-list";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGridProperties, getMapProperties } from "../../utils/api-calls";
import { Property } from "../../utils/types/types";
import { debounce, property } from "lodash";
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

  const fetchGridData = async (freshData?: boolean) => {
    setIsLoading(true);

    const resp = await getGridProperties(
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
    <div className="pt-6 flex flex-col md:pt-0">
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
      <>
        <SearchBar onFilter={handleRefreshData} isListView={isList} />

        {isList && (
          <>
            {isLoading && gridProperties.length === 0 ? (
              <PropertyListSkeleton />
            ) : gridProperties && gridProperties.length > 0 ? (
              <InfiniteScroll
                dataLength={gridProperties.length}
                next={fetchGridData}
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
            {/* <button
              className="hidden absolute right-14 z-20 top-8 md:flex items-center justify-center ml-4 bg-white hover:text-nk-red rounded-full px-5 py-1.5 cursor-pointer shadow-3xl"
              // onClick={() => setOpenFilter(true)}
            >
              Filters
              <svg
                className="w-6 h-6 ml-2"
                viewBox="0 0 38 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.57098 0.811743C5.75474 1.20538 5.02048 1.88476 4.57264 2.66124C3.91624 3.79837 3.76337 3.88838 2.48632 3.88838C0.73928 3.88838 0.106926 4.12635 0.106926 4.78446C0.106926 5.66267 0.796881 6.04613 2.37745 6.04613C3.70513 6.04613 3.94345 6.14909 4.34129 6.89382C5.42749 8.92734 7.56223 9.91959 9.79541 9.42917C11.044 9.15483 12.6704 7.83429 13.1072 6.73969L13.3838 6.04613H25.0387C33.6814 6.04613 36.7916 5.95057 37.0733 5.67623C37.6094 5.15406 37.5449 4.29681 36.9524 4.07549C36.6771 3.97254 31.2679 3.88838 24.9323 3.88838H13.4126L12.7837 2.68775C12.3508 1.86133 11.726 1.28521 10.7784 0.838252C9.06083 0.0284806 8.20661 0.0232409 6.57098 0.811743ZM10.4072 3.10389C11.7722 4.43306 11.3662 6.56738 9.61374 7.2742C8.48829 7.72825 6.94064 7.27111 6.42476 6.33249C5.48129 4.61554 6.74916 2.34713 8.65224 2.34713C9.26876 2.34713 9.91757 2.62672 10.4072 3.10389ZM23.9354 9.73434C23.3764 10.0663 22.5931 10.8345 22.1947 11.4414L21.4702 12.5446L11.5007 12.5564C6.01743 12.5625 1.20073 12.6948 0.796881 12.8498C0.275617 13.0502 0.0917348 13.3341 0.163895 13.8276L0.265173 14.523L10.8677 14.6041L21.4702 14.6854L22.1032 15.8121C22.9796 17.3721 24.1629 18.1314 25.9568 18.2839C27.9089 18.4504 29.4436 17.6721 30.3978 16.0322L31.0963 14.8312L34.1957 14.6771C37.1157 14.5319 37.3009 14.4829 37.3961 13.8276C37.5341 12.8825 36.6217 12.5903 33.5726 12.6041C32.2215 12.6103 31.0821 12.5591 31.0406 12.4904C30.9992 12.4217 30.7476 11.9522 30.482 11.4476C29.3442 9.28429 26.1157 8.43969 23.9354 9.73434ZM28.1957 11.992C28.6752 12.4195 28.9078 12.9802 28.9078 13.7092C28.9078 16.7023 24.7861 17.1746 23.7461 14.3004C23.4059 13.3597 24.1759 11.8674 25.2314 11.4229C26.373 10.9418 27.1946 11.0996 28.1957 11.992ZM7.44481 18.0768C6.26461 18.3351 5.0132 19.3533 4.34983 20.5949C3.96782 21.3103 3.67823 21.4395 2.27617 21.5196C-0.700447 21.6898 -0.641263 23.6164 2.34073 23.6164C3.78869 23.6164 3.89978 23.6777 4.57581 24.8494C5.33127 26.1582 7.25935 27.3154 8.68515 27.3154C10.0784 27.3154 12.2432 26.0173 12.9249 24.7732L13.5579 23.6179L25.0048 23.6173C31.3008 23.6167 36.6771 23.5322 36.9524 23.4293C37.5449 23.2079 37.6094 22.3507 37.0733 21.8285C36.7916 21.5542 33.6951 21.4586 25.0997 21.4586H13.5057L12.7407 20.3267C11.3912 18.3308 9.65457 17.5932 7.44481 18.0768ZM9.89542 20.3683C12.1928 21.5255 11.25 25.1576 8.65224 25.1576C5.97439 25.1576 5.1553 21.5462 7.54451 20.2734C8.39809 19.8184 8.83928 19.8363 9.89542 20.3683Z"
                  fill="#E74451"
                />
              </svg>
            </button> */}

            <GoogleMap
              zoom={11}
              center={center}
              onLoad={(map) => {
                onMapLoad(map);
                setHasMapRendered(true);
              }}
              options={mapOptions}
              mapContainerClassName="h-[calc(100vh-5.5rem-4.25rem-1.5rem)] w-full my-6"
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
            className={` self-center sticky top-0 mb-4 bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-center text-sm capitalize text-nk-white transition-all duration-300 ease-in-out md:gap-4 md:px-6 md:py-3 md:text-2xl ${
              isList
                ? "bg-nk-gradient-red-one bg-gradient-to-b to-nk-gradient-red-two hover:scale-[1.1] hover:bg-nk-black"
                : "bg-nk-black hover:scale-[1.1] hover:bg-nk-red"
            }`}
            onClick={() => {
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
  );
};

export default function PropertiesWithProvider() {
  return (
    <FiltersProvider>
      <Properties />
    </FiltersProvider>
  );
}
