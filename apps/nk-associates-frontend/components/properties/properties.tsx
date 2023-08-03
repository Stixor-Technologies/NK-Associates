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
import Map_Btn from "../../public/assets/icons/map-list-icon.svg";
import List_Icon from "../../public/assets/icons/list-icon.svg";

const libraries = ["places"];

//   `${BASE_URL}/api/properties?fields[0]=latitude&fields[1]=longitude&filters[latitude][$between]=33.163800244565024&filters[latitude][$between]=34.003526069126345&filters[longitude][$between]=72.54161586642486&filters[longitude][$between]=73.55235805392486&sort[1]=id`

const center = {
  lat: 33.58468464794478,
  lng: 73.04698696017488,
};
const Properties = () => {
  const [isList, setIsList] = useState<boolean>(true);
  const [gridProperties, setGridProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const [mapProperties, setMapProperties] = useState<Property[]>([]);
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

  const onBoundsChanged = useCallback(async () => {
    const map = mapRef.current;
    if (map) {
      const newBounds = map.getBounds();
      const bounds = newBounds.toJSON();
      setBounds(bounds); // update mapBounds state
      const resp = await getMapProperties(
        bounds.south,
        bounds.north,
        bounds.west,
        bounds.east
      );
      if (resp?.data) {
        setMapProperties(resp?.data);
      }
    }
  }, []);

  const mapOptions = {
    disableDefaultUI: false,
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    scrollwheel: true,
    // minZoom: 10,
    // maxZoom: 40,
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

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height + 40),
  });

  useEffect(() => {
    //   if (isList && gridProperties.length === 0) {
    //     fetchGridData();
    // } else if (!isList && bounds) {
    //   console.log("useEffect")
    //     fetchMapData(bounds);
    // }

    fetchGridData();
  }, []);

  console.log(mapProperties, bounds);

  
  return (
    <>
      {/* your button code here */}

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

      {/* keep the map component mounted, but hide or show it based on isList */}
      {(!isList || hasMapRendered) && (
        <div className={isList ? "hidden" : "block"}>
          <GoogleMap
            zoom={10}
            center={center}
            onLoad={(map) => {
              onMapLoad(map);
              setHasMapRendered(true); // mark the map as rendered
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
            {/* your marker code here */}
          </GoogleMap>
        </div>
      )}
    </>
  );
};

export default Properties;

