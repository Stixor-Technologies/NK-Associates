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
    <div className="relative my-3 flex h-96 w-full items-center sm:pb-1/2">
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
        <div className="absolute left-0 top-0 flex h-full w-full items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
