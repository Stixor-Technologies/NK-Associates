"use client";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Viewer } from "@photo-sphere-viewer/core";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { GalleryPlugin } from "@photo-sphere-viewer/gallery-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/gallery-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

const baseUrl = "https://photo-sphere-viewer-data.netlify.app/assets/";
const caption = "Cape Florida Light, Key Biscayne <b>&copy; Pixexid</b>";

// import {
//   ReactPhotoSphereViewer,
//   CompassPlugin,
//   MarkersPlugin,
//   VirtualTourPlugin,
// } from "react-photo-sphere-viewer";

import TourIcon from "../../public/assets/icons/360-icon.svg";

type PropsType = {
  open: boolean;
  onClose: () => void;
};

const VRTourScreen = ({ open, onClose }: PropsType) => {
  const ScreenRef = useRef();

  const handleCloseModal = () => {
    const body = document.body;
    onClose();
    body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.classList.add("overflow-hidden");
    }
  }, [open]);

  const markerLighthouse = {
    id: "marker-1",
    image: baseUrl + "pictos/pin-red.png",
    tooltip: "Cape Florida Light, Key Biscayne",
    size: { width: 32, height: 32 },
    anchor: "bottom center",
    gps: [-80.155973, 25.666601, 29 + 3],
  };

  useEffect(() => {
    if (ScreenRef?.current && open) {
      const viewer = new Viewer({
        container: ScreenRef.current,
        panorama: `${baseUrl}tour/key-biscayne-1.jpg`,
        loadingImg: baseUrl + "loader.gif",
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: true,
        defaultYaw: "130deg",
        navbar: "zoom move gallery caption fullscreen",

        plugins: [
          MarkersPlugin,
          [
            GalleryPlugin,
            {
              thumbnailSize: { width: 100, height: 100 },
            },
          ],
          [
            VirtualTourPlugin,
            {
              positionMode: "gps",
              renderMode: "3d",
            },
          ],
        ],
      });

      const virtualTour = viewer.getPlugin(VirtualTourPlugin);

      virtualTour?.setNodes(
        [
          {
            id: "1",
            panorama: baseUrl + "tour/key-biscayne-1.jpg",
            thumbnail: baseUrl + "tour/key-biscayne-1-thumb.jpg",
            name: "One",
            caption: `[1] ${caption}`,
            links: [{ nodeId: "2" }],
            markers: [markerLighthouse],
            gps: [-80.156479, 25.666725, 3],
            panoData: { poseHeading: 327 },
          },
          {
            id: "2",
            panorama: baseUrl + "tour/key-biscayne-2.jpg",
            thumbnail: baseUrl + "tour/key-biscayne-2-thumb.jpg",
            name: "Two",
            caption: `[2] ${caption}`,
            links: [{ nodeId: "3" }, { nodeId: "1" }],
            markers: [markerLighthouse],
            gps: [-80.156168, 25.666623, 3],
            panoData: { poseHeading: 318 },
          },
          {
            id: "3",
            panorama: baseUrl + "tour/key-biscayne-3.jpg",
            thumbnail: baseUrl + "tour/key-biscayne-3-thumb.jpg",
            name: "Three",
            caption: `[3] ${caption}`,
            links: [{ nodeId: "4" }, { nodeId: "2" }, { nodeId: "5" }],
            gps: [-80.155932, 25.666498, 5],
            panoData: { poseHeading: 310 },
          },
          {
            id: "4",
            panorama: baseUrl + "tour/key-biscayne-4.jpg",
            thumbnail: baseUrl + "tour/key-biscayne-4-thumb.jpg",
            name: "Four",
            caption: `[4] ${caption}`,
            links: [{ nodeId: "3" }, { nodeId: "5" }],
            gps: [-80.156089, 25.666357, 3],
            panoData: { poseHeading: 78 },
          },
          {
            id: "5",
            panorama: baseUrl + "tour/key-biscayne-5.jpg",
            thumbnail: baseUrl + "tour/key-biscayne-5-thumb.jpg",
            name: "Five",
            caption: `[5] ${caption}`,
            links: [{ nodeId: "6" }, { nodeId: "3" }, { nodeId: "4" }],
            gps: [-80.156292, 25.666446, 2],
            panoData: { poseHeading: 190 },
          },
          {
            id: "6",
            panorama: baseUrl + "tour/key-biscayne-6.jpg",
            thumbnail: baseUrl + "tour/key-biscayne-6-thumb.jpg",
            name: "Six",
            caption: `[6] ${caption}`,
            links: [{ nodeId: "5" }, { nodeId: "7" }],
            gps: [-80.156465, 25.666496, 2],
            panoData: { poseHeading: 295 },
          },
          {
            id: "7",
            panorama: baseUrl + "tour/key-biscayne-7.jpg",
            thumbnail: baseUrl + "tour/key-biscayne-7-thumb.jpg",
            name: "Seven",
            caption: `[7] ${caption}`,
            links: [{ nodeId: "6" }],
            gps: [-80.15707, 25.6665, 3],
            panoData: { poseHeading: 250, posePitch: 3 },
          },
        ],
        "2",
      );
    }
  }, [ScreenRef.current, open]);

  const content = (
    <section className="fixed top-0 left-0 w-screen h-screen bg-nk-gray z-[1000] flex items-center justify-center">
      <button
        className="absolute top-0 right-0 p-1 m-4 md:m-6 text-nk-black hover:text-nk-red z-[1001]"
        onClick={handleCloseModal}
        title="Close Virtual Tour"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 31 31"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.980469"
            y="3.05347"
            width="4.06338"
            height="38.3123"
            rx="2.03169"
            transform="rotate(-45 0.980469 3.05347)"
          />
          <rect
            x="28.0713"
            y="0.180176"
            width="4.06338"
            height="38.3123"
            rx="2.03169"
            transform="rotate(45 28.0713 0.180176)"
          />
        </svg>
      </button>

      <div className="w-full h-full">
        <div ref={ScreenRef} style={{ width: "100vw", height: "100vh" }}></div>
        {/* <ReactPhotoSphereViewer
          src={`${baseUrl}tour/key-biscayne-1.jpg`}
          plugins={plugins}
          height={"100vh"}
          width={"100%"}
        ></ReactPhotoSphereViewer> */}
      </div>
    </section>
  );

  if (open) {
    return createPortal(content, document.querySelector("body"));
  }
  return null;
};

const VRTour = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <VRTourScreen open={open} onClose={() => setOpen(!open)} />
      <button
        onClick={() => setOpen(true)}
        className="group sticky top-[31.25rem] mb-4 z-30 ml-auto hidden w-[6rem] items-center gap-3 rounded-l-xl bg-nk-white px-4 py-3.5 shadow-3xl transition-all duration-500 ease-in-out hover:w-44 md:flex"
      >
        <Image
          src={TourIcon}
          width={56}
          height={35}
          alt="tour-button"
          className="transition-all delay-200 duration-500 group-hover:scale-110"
        />
        <span className="overflow-hidden whitespace-nowrap text-[1.375rem] text-nk-black transition-all duration-200 ease-in-out group-hover:w-auto group-hover:text-nk-red">
          View
        </span>
      </button>
    </>
  );
};

export default VRTour;
