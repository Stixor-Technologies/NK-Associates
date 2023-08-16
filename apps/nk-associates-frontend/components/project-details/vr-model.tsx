"use client";

import { useLayoutEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import SampleGLB from "../../../public/assets/sample.glb";

const VRModel = () => {
  const gltf = useLoader(GLTFLoader, SampleGLB.src);
  return (
    <section>
      <Canvas style={{ background: "#171717" }}>
        <primitive
          object={gltf.scene}
          position={[0, 1, 0]}
          children-0-castShadow
        />
      </Canvas>
    </section>
  );
};

export default VRModel;
