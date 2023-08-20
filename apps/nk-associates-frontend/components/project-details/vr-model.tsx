"use client";

import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import ThreeDModelLoading from "./threeD-model-loading";

type PropTypes = {
  modelURL: string;
};

const VRModel = ({ modelURL }: PropTypes) => {
  const gltf = useLoader(GLTFLoader, modelURL);
  const { progress } = useProgress();

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        className="bg-black"
      >
        <Suspense fallback={null}>
          <primitive object={gltf.scene} scale={0.05} />
          <Environment preset="city" />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <section
        className={`absolute top-0 left-0 w-full ${
          progress >= 100 ? "hidden" : ""
        }`}
      >
        <ThreeDModelLoading />
      </section>
    </>
  );
};

export default VRModel;
