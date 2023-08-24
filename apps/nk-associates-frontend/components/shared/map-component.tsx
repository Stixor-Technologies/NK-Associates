"use client";
import React, { FC, useEffect, useState, useRef, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Spinner from "../spinner";
import { useMapApi } from "../../app/context/map-context";
import MapStyles from "../../utils/map-styles.json";

interface Location {
  lat: number;
  lng: number;
}

interface IProps {
  locations: Location | Location[];
  selectedOfficeIndex?: number | null;
}

const MapComponent: FC<IProps> = ({ locations, selectedOfficeIndex }) => {
  const [mapCenter, setMapCenter] = useState<Location | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(10);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded } = useMapApi();

  const allLocations = useMemo(
    () => (Array.isArray(locations) ? locations : [locations]),
    [locations],
  );

  const mapOptions = {
    disableDefaultUI: false,
    mapTypeControl: true,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    styles: MapStyles,
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

  useEffect(() => {
    if (
      isLoaded &&
      mapRef.current &&
      selectedOfficeIndex !== null &&
      selectedOfficeIndex !== undefined
    ) {
      const selectedLocation = allLocations[selectedOfficeIndex];

      console.log(
        "Attempting pan to index:",
        selectedOfficeIndex,
        "Location:",
        selectedLocation,
      );
      setMapZoom(12);
      mapRef.current.panTo(selectedLocation);
    }
  }, [isLoaded, allLocations, selectedOfficeIndex]);

  return (
    <div className="relative my-3 flex h-96 w-full items-center sm:pb-1/2">
      {isLoaded ? (
        <GoogleMap
          id="google-map"
          zoom={mapZoom}
          center={mapCenter || allLocations[1]}
          // zoom={10}
          // center={allLocations[0]}
          options={mapOptions}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          mapContainerClassName="absolute top-0 left-0 h-full w-full rounded-2xl"
        >
          {allLocations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              icon={{
                url:
                  index === selectedOfficeIndex
                    ? "/assets/icons/marker-black.svg"
                    : "/assets/icons/area-marker.svg",

                scaledSize:
                  index === selectedOfficeIndex
                    ? new window.google.maps.Size(40, 40)
                    : new window.google.maps.Size(30, 30),
              }}
            />
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
