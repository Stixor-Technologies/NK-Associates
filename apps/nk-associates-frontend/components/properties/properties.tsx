"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import PropertyList from "./property-list";
import PropertyMap from "./map-view-list";
import Spinner from "../spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGridProperties, getMapProperties } from "../../utils/api-calls";
import { Property } from "../../utils/types/types";
import { MAP_KEY } from "../../utils/constants";
import { debounce } from "lodash";
import Map_Btn from "../../public/assets/icons/map-list-icon.svg";
import List_Icon from "../../public/assets/icons/list-icon.svg";
import PropertyCard from "./property-card";
import "./map-info-window.css";

const libraries = ["places"];

const center = {
  lat: 33.58468464794478,
  lng: 73.04698696017488,
};
const Properties = () => {
  const [isList, setIsList] = useState<boolean>(true);
  const [gridProperties, setGridProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const [mapProperties, setMapProperties] = useState<Property[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);

  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hasMapRendered, setHasMapRendered] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAP_KEY,
  });

  const fetchGridData = async () => {
    setIsLoading(true);
    const resp = await getGridProperties(gridProperties.length, 12);
    if (resp?.data) {
      setGridProperties((prevProperties) => [...prevProperties, ...resp.data]);
      setTotal(resp.meta.pagination.total);
    }
    setIsLoading(false);
  };

  const fetchMapData = async (bounds) => {
    const resp = await getMapProperties(
      bounds.south,
      bounds.north,
      bounds.west,
      bounds.east
    );
    if (resp?.data) {
      setMapProperties(resp?.data);
    }
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onBoundsChanged = debounce(async () => {
    const map = mapRef.current;
    if (map) {
      const newBounds = map.getBounds();
      const bounds = newBounds.toJSON();
      console.log(bounds);
      setBounds(bounds);
      try {
        setIsLoadingMap(true);
        const resp = await getMapProperties(
          bounds.south,
          bounds.north,
          bounds.west,
          bounds.east
        );
        if (resp?.data) {
          setMapProperties(resp?.data);
        }
      } catch (error) {
        console.error("error loading");
      } finally {
        setTimeout(() => {
          setIsLoadingMap(false);
        }, 500)
      }
    }
  }, 500);
  console.log(mapProperties);
  const mapOptions = {
    disableDefaultUI: false,
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    scrollwheel: true,
    minZoom: 5,
    maxZoom: 40,
    // restriction: {
    //   latLngBounds: {
    //     north: 37.1330309108,
    //     south: 23.6919650335,
    //     east: 77.8374507995,
    //     west: 60.8742484882
    //   },
    //   strictBounds: true,
    // },
  };

  useEffect(() => {
    //   if (isList && gridProperties.length === 0) {
    //     fetchGridData();
    // } else if (!isList && bounds) {
    //   console.log("useEffect")
    //     fetchMapData(bounds);
    // }

    fetchGridData();
  }, []);

  return (
    <>
      <button
        className={`fixed bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-center text-sm capitalize text-nk-white transition-all duration-300 ease-in-out hover:shadow-lg hover:delay-100 md:gap-4 md:px-6 md:py-3 md:text-2xl ${
          isList
            ? "bg-nk-gradient-red-one bg-gradient-to-b to-nk-gradient-red-two"
            : "bg-nk-black"
        }`}
        onClick={() => {
          setIsList(!isList);
        }}
      >
        <span>{`${isList ? "Show Map" : "Show List"}`}</span>
        <Image
          src={isList ? Map_Btn : List_Icon}
          width={35}
          height={35}
          alt="properties-view"
          className={`mx-auto ${
            isList ? "w-[1.375rem] md:w-[2.188rem]" : " w-4 md:w-[1.7rem]"
          } `}
        />
      </button>

      {isList && (
        <>
          {isLoading && gridProperties.length === 0 ? (
            <div className="flex flex-1">
              <Spinner />
            </div>
          ) : gridProperties && gridProperties.length > 0 ? (
            <InfiniteScroll
              dataLength={gridProperties.length}
              next={fetchGridData}
              hasMore={total !== gridProperties.length}
              loader={isLoading && <Spinner />}
              className={isList ? "block" : "hidden"} // hide or show based on isList
            >
              <PropertyList properties={gridProperties} />
            </InfiniteScroll>
          ) : (
            <div className="flex flex-1 items-center justify-center text-nk-black">
              <p className="text-center">No Properties Available</p>
            </div>
          )}
        </>
      )}

      {(!isList || hasMapRendered) && (
        <div className={`relative ${isList ? "hidden" : "block"}`}>
          {isLoadingMap && (
            <div className="absolute left-1/2 top-16 z-10  mx-auto w-[72px] -translate-x-1/2 rounded-lg bg-nk-white py-4">
              <div className="after:content:[''] before:content:[''] relative left-[-9999px] mx-auto h-[6px] w-[6px] animate-dot-pulse rounded-full bg-nk-black text-nk-black shadow-pulse before:absolute before:top-0 before:inline-block before:h-[6px] before:w-[6px] before:animate-dot-pulse-before before:rounded-full before:bg-nk-black before:text-nk-black before:shadow-pulse-before after:absolute after:top-0 after:inline-block after:h-[6px] after:w-[6px] after:animate-dot-pulse-after after:rounded-full after:bg-nk-black after:text-nk-black after:shadow-pulse-after"></div>
            </div>
          )}

          <GoogleMap
            zoom={10}
            center={center}
            onLoad={(map) => {
              onMapLoad(map);
              setHasMapRendered(true);
            }}
            options={mapOptions}
            mapContainerClassName="h-screen w-full mt-6"
            onBoundsChanged={onBoundsChanged}
          >
            {mapProperties.map((location, index) => {
              const position = {
                lat: location.attributes.latitude,
                lng: location.attributes.longitude,
              };
              return (
                <Marker
                  key={index}
                  position={position}
                  icon={{
                    url: "assets/icons/area-marker.svg",
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                  onClick={() => setSelectedProperty(location)}
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
    </>
  );
};

export default Properties;
