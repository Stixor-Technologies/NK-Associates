"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow, OverlayView } from "@react-google-maps/api";
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
  const [mapLoaded, setMapLoaded] = useState(false);



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

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapLoaded(true)
  
  }, []);

  const onBoundsChanged = useCallback(async () => {
    const map = mapRef.current;
    if (map && mapLoaded) {
      const newBounds = map.getBounds();
      const bounds = newBounds.toJSON();
      setBounds(bounds);  // update mapBounds state
      const resp = await getMapProperties(
        bounds.south,
        bounds.north,
        bounds.west,
        bounds.east
      );
      if (resp?.data) {
        // console.log(resp?.data);
        setMapProperties(resp?.data);
        // setMapProperties((prevProperties) => [...prevProperties, ...resp.data]);
      }

      // console.log(newBounds.toJSON());
    }
  }, [mapLoaded]);

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
    if (isList && gridProperties.length === 0) {
      // console.log("Fetch Grid Data");
      fetchGridData();
    } else if (!isList && bounds && mapProperties.length === 0) {
      const fetchMapData = async () => {
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
    fetchMapData();
    }

    // if (isLoaded && mapRef.current) {
    //   const bounds = new google.maps.LatLngBounds();
    //   mapRef.current.fitBounds(bounds);
    // }

    // fetchGridData();
  }, [isList, bounds]);

  console.log(mapProperties);

  return (
    <>
      <button
        className={`fixed bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-center text-sm capitalize text-nk-white transition-all duration-300 ease-in-out hover:shadow-lg hover:delay-100 md:gap-4 md:px-6 md:py-3 md:text-2xl ${
          isList
            ? "bg-nk-gradient-red-one bg-gradient-to-b to-nk-gradient-red-two"
            : "bg-nk-black"
        }`}
        onClick={() => {
          console.log("map", mapProperties)
          console.log("bounds", bounds)
          setIsList(!isList)
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

      {isList ? (
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
            >
              <PropertyList properties={gridProperties} />
            </InfiniteScroll>
          ) : (
            <div className="flex flex-1 items-center justify-center text-nk-black">
              <p className="text-center">No Properties Available</p>
            </div>
          )}
        </>
      ) : (
        // <PropertyMap />
        <GoogleMap
          zoom={10}
          center={center}
          onLoad={onMapLoad}
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
              <div className=" bg-slate-500">
                {/* Replace this with the content you want to display. */}
                <h2>Property Information</h2>
                <h2>Property Information</h2>
                <h2>Property Information</h2>
               

                <p>{selectedProperty.name}</p>
              </div>
            </InfoWindow>
            
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default Properties;

// "use client";
// import React, { FC, useEffect, useRef, useMemo } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { MAP_KEY } from "../../utils/constants";
// import Spinner from "../spinner";

// interface Location {
//   lat: number;
//   lng: number;
// }

// interface IProps {
//   locations: Location | Location[];
// }

// const MapComponent: FC<IProps> = ({ locations }) => {
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: MAP_KEY,
//   });

//   const allLocations = useMemo(
//     () => (Array.isArray(locations) ? locations : [locations]),
//     [locations]
//   );

//   const mapOptions = {
//     disableDefaultUI: false,
//     mapTypeControl: true,
//     zoomControl: true,
//     streetViewControl: false,
//     fullscreenControl: true,
//     keyboardShortcuts: false,
//     // scrollwheel: true,
//   };

//   useEffect(() => {
//     if (isLoaded && mapRef.current) {
//       const bounds = new google.maps.LatLngBounds();

//       allLocations.forEach((location) => {
//         bounds.extend(new google.maps.LatLng(location.lat, location.lng));
//       });

//       mapRef.current.fitBounds(bounds);
//     }
//   }, [isLoaded, allLocations]);
//   return (
//     <div className="relative flex items-center my-3 h-96 w-full sm:pb-1/2">
//       {isLoaded ? (
//         <GoogleMap
//           id="google-map"
//           zoom={10}
//           center={allLocations[0]}
//           options={mapOptions}
//           onLoad={(map) => {
//             mapRef.current = map;
//           }}
//           mapContainerClassName="absolute top-0 left-0 h-full w-full rounded-2xl"
//         >
//           {allLocations.map((location, index) => (
//             <Marker key={index} position={location} />
//           ))}
//         </GoogleMap>
//       ) : (
//         <div className="absolute top-0 left-0 h-full w-full flex items-center">
//         <Spinner />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapComponent;
