"use client";
import React, {useEffect, useRef} from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";

// Define your API Key
const apiKey = "AIzaSyBzm-kJDWBl_N5GWrj2p50N_4bg8mNeTTk"; // Replace this with your actual Google Maps API key

// Define your API Key

interface Location {
  lat: number;
  lng: number;
}

interface IProps {
  locations: Location | Location[];
}

const MapComponent: React.FC<IProps> = ({ locations }) => {
    const mapRef = React.useRef<google.maps.Map | null>(null);
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: apiKey
    })
  
    // Ensure locations is always an array
    const allLocations = Array.isArray(locations) ? locations : [locations];
  
    const mapOptions = {
      disableDefaultUI: false,
      mapTypeControl: true,
      zoomControl: true,
      streetViewControl: true,
      fullscreenControl: true,
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
    <div className="relative h-[390px] w-full pb-1/2">
           {isLoaded && (
        <GoogleMap
          id='google-map'
          zoom={10}
          center={allLocations[0]} // Center map around the first location
          options={mapOptions}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          mapContainerClassName="absolute top-0 left-0 h-full w-full rounded-md"
        >
          {allLocations.map((location, index) => (
            <Marker key={index} position={location} />
          ))}
        </GoogleMap>
      )}

    </div>
  );
};

export default MapComponent;

