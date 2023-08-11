"use client";
import { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { MAP_KEY } from "../../utils/constants";

const MapApiContext = createContext(null);

export function useMapApi() {
  return useContext(MapApiContext);
}

export function MapApiProvider({ children }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_KEY
  });

  return (
    <MapApiContext.Provider value={{ isLoaded }}>
      {children}
    </MapApiContext.Provider>
  );
}
