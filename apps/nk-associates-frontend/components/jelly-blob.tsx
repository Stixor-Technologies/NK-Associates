import { gsap } from "gsap";
import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";

// Gsap Ticker Function
function useTicker(callback, paused) {
  useLayoutEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

const EMPTY = {};
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

// Function for Mouse Move Scale Change
function getScale(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

// Function For Mouse Movement Angle in Degrees
function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

// Jelly Blob Function
const JellyBlob = () => {
  // React Refs for Jelly Blob and Text
  const jellyRef = useRef(null);
  const textRef = useRef(null);

  // Save pos and velocity Objects
  const pos = { x: 0, y: 0 };
  const vel = { x: 0, y: 0 };
  // const set = useInstance();
  const set: {
    x: (value: any) => any;
    y: (value: any) => any;
    r: (value: any) => any;
    sx: (value: any) => any;
    sy: (value: any) => any;
    rt: (value: any) => any;
  } = {
    x: () => {},
    y: () => {},
    r: () => {},
    sx: () => {},
    sy: () => {},
    rt: () => {},
  };
  // Set GSAP quick setter Values on useLayoutEffect Update
  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.rt = gsap.quickSetter(textRef.current, "rotate", "deg");
  }, []);

  // Start Animation loop
  const loop = useCallback(() => {
    // Calculate angle and scale based on velocity
    var rotation = getAngle(vel.x, vel.y); // Mouse Move Angle
    var scale = getScale(vel.x, vel.y); // Blob Squeeze Amount

    // Set GSAP quick setter Values on Loop Function
    set.x(pos.x);
    set.y(pos.y);
    set.r(rotation);
    set.sx(1 + scale);
    set.sy(1 - scale);
    set.rt(-rotation);
  }, []);

  // Run on Mouse Move
  useLayoutEffect(() => {
    // Caluclate Everything Function
    const setFromEvent = (e) => {
      // Mouse X and Y
      const x = e.clientX;
      const y = e.clientY;

      // Animate Position and calculate Velocity with GSAP
      gsap.to(pos, {
        x: x,
        y: y,
        duration: 0.35,
        ease: "none",
        onUpdate: () => {
          vel.x = x - pos.x;
          vel.y = y - pos.y;
        },
      });

      loop();
    };

    window.addEventListener("pointermove", setFromEvent);
    return () => {
      window.removeEventListener("pointermove", setFromEvent);
    };
  }, []);

  useTicker(loop, false);

  // Return UI
  return (
    <div className="container-div">
      <div ref={jellyRef} id={"jelly-id"} className="jelly-blob">
        <div ref={textRef} id={"text-id"} className="inside-text">
          <Image
            src={"/assets/icons/cursor-icon.svg"}
            width={470}
            height={470}
            alt="akk"
          />
        </div>
      </div>
    </div>
  );
};

export default JellyBlob;
