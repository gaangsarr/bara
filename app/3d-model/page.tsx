"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";

// Informasi untuk 3 area
const areaInfo = {
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
  const { scene } = useGLTF("/models/3DMODEL1-COMP.glb");
  const [selectedArea, setSelectedArea] = useState(null);
  const [clickPosition, setClickPosition] = useState([0, 0, 0]);
  const groupRefs = useRef({});

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
        console.log("Found area:", child.name); // Debug
      }
    });
  }, [scene]);

  const handleClick = (event) => {
    event.stopPropagation();

    // Cari parent group dari object yang di-klik
    let clickedObject = event.object;
    let areaName = null;

    // Traverse up untuk cari parent group
    while (clickedObject && !areaName) {
      if (clickedObject.name && areaInfo[clickedObject.name]) {
        areaName = clickedObject.name;
        break;
      }
      clickedObject = clickedObject.parent;
    }

    // Fallback: detect berdasarkan posisi X jika nama tidak ketemu
    if (!areaName) {
      const x = event.point.x;
      if (x < -2) areaName = "LeftArea";
      else if (x > 2) areaName = "RightArea";
      else areaName = "CenterArea";
    }

    console.log("Clicked area:", areaName, "at position:", event.point);

    setSelectedArea(areaName);
    setClickPosition(event.point.toArray());
  };

  const info = selectedArea ? areaInfo[selectedArea] : null;

  return (
    <group onClick={handleClick}>
      <primitive object={scene} scale={0.5} position={[0, -1, 0]} />

      {info && (
        <Html position={clickPosition} center distanceFactor={8}>
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

useGLTF.preload("/models/3DMODEL1-COMP.glb");

function Loader() {
  return (
    <Html center>
      <div style={{ color: "white", fontSize: "20px" }}>Loading Scene...</div>
    </Html>
  );
}

export default function ThreeDPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [4, 2, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <CompleteScene />
          <Environment preset="sunset" />
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
