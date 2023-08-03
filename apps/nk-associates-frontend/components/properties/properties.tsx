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

  const onBoundsChanged = debounce(async () => {
    const map = mapRef.current;
    if (map) {
      const newBounds = map.getBounds();
      const bounds = newBounds.toJSON();
      setBounds(bounds);
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

  const onMarkerClick = (location) => {
    setSelectedProperty(location);

    const position = {
      lat: location.attributes.latitude,
      lng: location.attributes.longitude,
    };

    // Get the pixel coordinates of the marker
    const projection = mapRef.current.getProjection();
    const point = projection.fromLatLngToPoint(position);

    // Calculate the pixel coordinates of the top-left corner of the info window
    // assuming its size is 200x100px
    const infoWindowPoint = new window.google.maps.Point(
      point.x - 200 / 2, // adjust for width
      point.y - 100 // adjust for height
    );

    // Convert back to lat/lng
    const infoWindowPosition = projection.fromPointToLatLng(infoWindowPoint);

    // Adjust map's center
    mapRef.current.setCenter(infoWindowPosition);
  };

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

      {(!isList || hasMapRendered) && (
        <div className={isList ? "hidden" : "block"}>
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
                  // onClick={() => setSelectedProperty(location)}
                  onClick={() => onMarkerClick(location)}
                />
              );
            })}

            {selectedProperty && (
              <OverlayView
                position={{
                  lat: selectedProperty.attributes.latitude,
                  lng: selectedProperty.attributes.longitude,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="info-window">
                  <button onClick={() => {
                    console.log("first")
                  }}>X</button>
                  <h2>Property Information</h2>
                  <p>{selectedProperty.attributes.latitude}</p>
                </div>
              </OverlayView>

              // <InfoWindow
              //   position={{
              //     lat: selectedProperty.attributes.latitude,
              //     lng: selectedProperty.attributes.longitude,
              //   }}
              //   onCloseClick={() => setSelectedProperty(null)}
              // >
              //   <div className=" bg-slate-500">
              //     {/* Replace this with the content you want to display. */}
              //     <h2>{selectedProperty.attributes.latitude}</h2>
              //     <h2>Property Information</h2>
              //     <h2>Property Information</h2>
              //   </div>
              // </InfoWindow>

              // <OverlayView
              //   position={{
              //     lat: selectedProperty.attributes.latitude,
              //     lng: selectedProperty.attributes.longitude,
              //   }}
              //   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              // >
              //   <div style={{ backgroundColor: "white", padding: "10px" }}>
              //     <div>Cusotom Div</div>
              //     <button onClick={() => {
              //       console.log("close")
              //     }}>Close</button>
              //   </div>
              // </OverlayView>

              //   <OverlayView
              //   position={{
              //     lat: selectedProperty.attributes.latitude,
              //     lng: selectedProperty.attributes.longitude,
              //   }}
              //   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              //   getPixelPositionOffset={getPixelPositionOffset}
              // >
              //   <div className=" absolute left-4 p-8 bg-slate-800">
              //     <h2 className="text-nk-red" >Property Information</h2>
              //     <p>{selectedProperty.name}</p>
              //   </div>
              // </OverlayView>
            )}
          </GoogleMap>
        </div>
      )}
    </>
  );
};

export default Properties;
