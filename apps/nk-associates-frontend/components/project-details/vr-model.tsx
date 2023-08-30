"use client";

import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import ThreeDModelLoading from "./threeD-model-loading";

type PropTypes = {
  modelURL: string;
};

const VRModel = ({ modelURL }: PropTypes) => {
  const gltf = useLoader(GLTFLoader, modelURL, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
    );
    loader.setDRACOLoader(dracoLoader);
  });
  const { progress } = useProgress();

  return (
    <>
      <Canvas shadows dpr={[1, 2]} className="bg-nk-gray">
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={25} />
        <Suspense fallback={null}>
          <primitive object={gltf.scene} scale={0.05} />
          <OrbitControls makeDefault minDistance={5} maxDistance={15} />
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
