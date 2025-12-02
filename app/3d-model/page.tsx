"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber"; // Tambah useThree & useFrame
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import type { Object3D } from "three";

// Type untuk area info
type AreaInfo = {
  name: string;
  title: string;
  description: string;
  specs: string[];
  color: string;
};

type AreaKey = "LeftArea" | "CenterArea" | "RightArea";

// Informasi untuk 3 area
const areaInfo: Record<AreaKey, AreaInfo> = {
  LeftArea: {
    name: "Renewable Energy Source",
    title: "Solar & Wind Power",
    description:
      "Pembangkit listrik tenaga surya dan angin yang menghasilkan energi bersih",
    specs: ["Solar: 2 MW", "Wind: 3 MW", "Total: 5 MW"],
    color: "#10b981",
  },
  CenterArea: {
    name: "Sand Battery",
    title: "Sand Battery Storage",
    description: "Sistem penyimpanan energi thermal berbasis sand battery",
    specs: ["Kapasitas: 8 MWh", "Suhu: 500-600°C", "Efisiensi: 95%"],
    color: "#4a9eff",
  },
  RightArea: {
    name: "Industrial Complex",
    title: "Energy Distribution",
    description:
      "Kompleks industri yang menggunakan energi dari sistem penyimpanan",
    specs: ["Konsumsi: 4 MW", "24/7 supply", "150+ buildings"],
    color: "#f59e0b",
  },
};

function CompleteScene() {
  const { scene } = useGLTF("/models/BARA.glb");
  const { camera } = useThree(); // Ambil camera reference
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);
  const [clickPosition, setClickPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [cameraDistance, setCameraDistance] = useState(8); // State untuk jarak kamera
  const groupRefs = useRef<Record<string, Object3D>>({});

  useEffect(() => {
    // Find dan simpan reference ke setiap group area
    scene.traverse((child) => {
      if (
        child.name &&
        (child.name.includes("Left") ||
          child.name.includes("Center") ||
          child.name.includes("Right"))
      ) {
        groupRefs.current[child.name] = child;
        console.log("Found area:", child.name);
      }
    });
  }, [scene]);

  // Update jarak kamera setiap frame
  useFrame(() => {
    const distance = camera.position.length();
    setCameraDistance(distance);
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    let clickedObject: Object3D | null = event.object;
    let areaName: AreaKey | null = null;

    while (clickedObject && !areaName) {
      if (clickedObject.name && clickedObject.name in areaInfo) {
        areaName = clickedObject.name as AreaKey;
        break;
      }
      clickedObject = clickedObject.parent;
    }

    if (!areaName) {
      const x = event.point.x;
      if (x < -2) areaName = "LeftArea";
      else if (x > 2) areaName = "RightArea";
      else areaName = "CenterArea";
    }

    console.log("Clicked area:", areaName, "Camera distance:", cameraDistance);

    setSelectedArea(areaName);
    setClickPosition([event.point.x, event.point.y, event.point.z]);
  };

  const info = selectedArea ? areaInfo[selectedArea] : null;

  return (
    <group onClick={handleClick}>
      <primitive object={scene} scale={0.5} position={[0, -1, 0]} />

      {info && (
        <Html
          position={clickPosition}
          center
          distanceFactor={4} // Fixed value (makin besar = makin kecil card)
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}dd 100%)`,
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              minWidth: "280px",
              maxWidth: "350px",
              pointerEvents: "auto",
              fontFamily: "system-ui, sans-serif",
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                opacity: 0.85,
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              {info.name}
            </div>

            <h3
              style={{
                margin: "0 0 10px 0",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {info.title}
            </h3>

            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "13px",
                lineHeight: "1.5",
                opacity: 0.95,
              }}
            >
              {info.description}
            </p>

            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              {info.specs.map((spec, idx) => (
                <div key={idx} style={{ fontSize: "12px", margin: "3px 0" }}>
                  • {spec}
                </div>
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedArea(null);
              }}
              style={{
                width: "100%",
                padding: "10px",
                background: "white",
                color: info.color,
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕ Tutup
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("/models/BARA.glb");

function Loader() {
  return (
    <Html center>
      <div style={{ color: "black", fontSize: "20px" }}>Loading...</div>
    </Html>
  );
}

export default function ThreeDPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(180deg, #f0f0f0 0%, #ffffff 100%)",
      }}
    >
      <Canvas
        camera={{ position: [5, 2, 5], fov: 27 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<Loader />}>
          <color attach="background" args={["#f8f9fa"]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <CompleteScene />
          <Environment preset="city" />
          <OrbitControls
            enableZoom
            enablePan
            enableRotate
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
