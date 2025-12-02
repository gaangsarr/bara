"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/models/3DMODEL1.glb");
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
}

export default function ThreeDPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
          <Environment preset="sunset" />
          <OrbitControls enableZoom enablePan enableRotate />
        </Suspense>
      </Canvas>
    </div>
  );
}
