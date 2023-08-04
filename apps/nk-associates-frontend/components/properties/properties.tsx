"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import PropertyList from "./property-list";
import Spinner from "../spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGridProperties, getMapProperties } from "../../utils/api-calls";
import { Property } from "../../utils/types/types";
import { MAP_KEY } from "../../utils/constants";
import { debounce } from "lodash";
import Map_Btn from "../../public/assets/icons/map-list-icon.svg";
import List_Icon from "../../public/assets/icons/list-icon.svg";
import PropertyCard from "./property-card";
import { useMapApi } from "../../app/context/map-context";
import "./map-info-window.css";

const center = {
  lat: 33.58468464794478,
  lng: 73.04698696017488,
};
const Properties = () => {
  const [isList, setIsList] = useState<boolean>(true);
  const [gridProperties, setGridProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mapProperties, setMapProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hasMapRendered, setHasMapRendered] = useState<boolean>(false);
  // const [center, setCenter] = useState(null);


  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded } = useMapApi();


  const fetchGridData = async () => {
    setIsLoading(true);
    const resp = await getGridProperties(gridProperties.length, 12);
    if (resp?.data) {
      setGridProperties((prevProperties) => [...prevProperties, ...resp.data]);
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
      try {
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
    scrollwheel: true,
    minZoom: 5,
    maxZoom: 40,
  };

  useEffect(() => {
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
              className={isList ? "block" : "hidden"} 
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
        <div className={`${isList ? "hidden" : "block"}`}>
          <GoogleMap
            zoom={11}
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
                    setSelectedProperty(location)
                  }  }
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
