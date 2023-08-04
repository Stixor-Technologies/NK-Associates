"use client";
import React, { FC, useEffect, useRef, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Spinner from "../spinner";
import { useMapApi } from "../../app/context/map-context";

interface Location {
  lat: number;
  lng: number;
}

interface IProps {
  locations: Location | Location[];
}

const MapComponent: FC<IProps> = ({ locations }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded } = useMapApi();


  const allLocations = useMemo(
    () => (Array.isArray(locations) ? locations : [locations]),
    [locations]
  );

  const mapOptions = {
    disableDefaultUI: false,
    mapTypeControl: true,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    keyboardShortcuts: false,
  };

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const bounds = new google.maps.LatLngBounds();

      allLocations.forEach((location) => {
        bounds.extend(new google.maps.LatLng(location.lat, location.lng));
      });

      mapRef.current.fitBounds(bounds);
    }
  }, [isLoaded, allLocations]);
  return (
    <div className="relative flex items-center my-3 h-96 w-full sm:pb-1/2">
      {isLoaded ? (
        <GoogleMap
          id="google-map"
          zoom={10}
          center={allLocations[0]}
          options={mapOptions}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          mapContainerClassName="absolute top-0 left-0 h-full w-full rounded-2xl"
        >
          {allLocations.map((location, index) => (
            <Marker key={index} position={location} />
          ))}
        </GoogleMap>
      ) : (
        <div className="absolute top-0 left-0 h-full w-full flex items-center">
        <Spinner />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
