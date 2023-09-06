"use client";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Viewer } from "@photo-sphere-viewer/core";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import gsap from "gsap";

import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import { fetchVRTourDetailsById } from "../../utils/api-calls";
import { BASE_URL } from "../../utils/constants";

const baseUrl = "https://photo-sphere-viewer-data.netlify.app/assets/";

import TourIcon from "../../public/assets/icons/360-icon.svg";

type PropsType = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  slides: any;
};

const VRTourScreen = ({ open, onClose, loading, slides }: PropsType) => {
  const ScreenRef = useRef();

  const handleCloseModal = () => {
    onClose();
    gsap.to("[data-vr-tour-container]", {
      duration: 0.8,
      translateX: "100%",
      ease: "ease-in-out",
    });
  };

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.classList.add("overflow-hidden");
    }
  }, [open]);

  const markerLighthouse = {
    id: "marker-1",
    imageLayer: baseUrl + "pictos/pin-red.png",
    tooltip: "Cape Florida Light, Key Biscayne",
    size: { width: 32, height: 32 },
    anchor: "bottom center",
    gps: [-80.155973, 25.666601, 29 + 3],
  };

  useEffect(() => {
    if (ScreenRef?.current && open && !loading) {
      const viewer = new Viewer({
        container: ScreenRef.current,
        loadingImg: baseUrl + "loader.gif",
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: true,
        defaultYaw: "130deg",
        navbar: "zoom move caption fullscreen",

        plugins: [
          MarkersPlugin,
          [
            VirtualTourPlugin,
            {
              positionMode: "gps",
              renderMode: "3d",
            },
          ],
        ],
      });

      const virtualTour =
        viewer.getPlugin<VirtualTourPlugin>(VirtualTourPlugin);

      virtualTour.setNodes(slides);
    }
  }, [ScreenRef.current, open, loading]);

  useLayoutEffect(() => {
    if (open) {
      gsap.to("[data-vr-tour-container]", {
        duration: 0.8,
        translateX: "0%",
        ease: "ease-in-out",
      });
    }
  }, [open, ScreenRef.current]);

  const content = (
    <section
      data-vr-tour-container
      className="fixed top-0 right-0 translate-x-full w-screen h-screen bg-nk-gray z-[1000] flex items-center justify-center"
    >
      <button
        className="absolute top-0 right-0 m-4 md:m-6 text-nk-black hover:text-nk-red z-[1001] bg-white/70 p-3 rounded-full"
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
      </div>
    </section>
  );

  if (open) {
    return createPortal(content, document.querySelector("body"));
  }
  return null;
};

const VRTour = ({ vrTourId }: { vrTourId: number | undefined }) => {
  const buttonRef = useRef();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([]);

  const handleOpenClick = async () => {
    setLoading(true);
    try {
      if (!vrTourId) {
        setLoading(false);
        return;
      }
      setOpen(true);
      const resp = await fetchVRTourDetailsById(vrTourId);

      const sanitizedSlides = resp.data.attributes.slides.map((slide) => {
        const panoData = {};
        if (slide?.pano_data?.fullWidth) {
          panoData["fullWidth"] = slide?.pano_data?.fullWidth;
        }
        if (slide?.pano_data?.fullHeight) {
          panoData["fullHeight"] = slide?.pano_data?.fullHeight;
        }
        if (slide?.pano_data?.croppedWidth) {
          panoData["croppedWidth"] = slide?.pano_data?.croppedWidth;
        }
        if (slide?.pano_data?.croppedHeight) {
          panoData["croppedHeight"] = slide?.pano_data?.croppedHeight;
        }
        if (slide?.pano_data?.croppedX) {
          panoData["croppedX"] = slide?.pano_data?.croppedX;
        }
        if (slide?.pano_data?.croppedY) {
          panoData["croppedY"] = slide?.pano_data?.croppedY;
        }
        if (slide?.pano_data?.poseHeading) {
          panoData["poseHeading"] = slide?.pano_data?.poseHeading;
        }
        if (slide?.pano_data?.posePitch) {
          panoData["posePitch"] = slide?.pano_data?.posePitch;
        }
        if (slide?.pano_data?.poseRoll) {
          panoData["poseRoll"] = slide?.pano_data?.poseRoll;
        }
        const slideLinks = slide?.vr_slide_links.map((link) => {
          return {
            nodeId: link?.nodeID,
          };
        });
        return {
          id: slide.id,
          name: slide.name,
          caption: slide.caption,
          panorama: `${BASE_URL}${slide.panorama?.data?.attributes?.url}`,
          panoData: panoData,
          links: slideLinks,
          gps: [
            slide.gps_position.longitude,
            slide.gps_position.latitude,
            slide.gps_position.altitude,
          ],
        };
      });

      setSlides(sanitizedSlides);
      setLoading(false);
    } catch (err) {
      console.error(
        "An error occured while fetching and sanatizing VR Tour Slides",
        err,
      );
    }
  };

  const handleCloseVRTour = async () => {
    // gsap.to(buttonRef.current, {
    //   duration: 0.6,
    //   translateX: -window.innerWidth,
    //   ease: "ease-in-out",
    // });
    setTimeout(() => {
      const body = document.body;
      setOpen(!open);
      body.classList.remove("overflow-hidden");
    }, 1000);
  };

  // useLayoutEffect(() => {
  //   if (open) {
  //     gsap.to(buttonRef.current, {
  //       duration: 0.6,
  //       translateX: -window.innerWidth,
  //       ease: "ease-in-out",
  //     });
  //   }
  // }, [open]);

  return (
    <>
      <VRTourScreen
        open={open}
        onClose={handleCloseVRTour}
        loading={loading}
        slides={slides}
      />

      <button
        ref={buttonRef}
        onClick={handleOpenClick}
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
