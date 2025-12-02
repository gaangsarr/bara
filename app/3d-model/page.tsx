"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import type { Object3D } from "three";
import { ErrorBoundary3D } from "@/components/ErrorBoundary3D";
import Link from "next/link";

// Type untuk area info
type AreaInfo = {
  name: string;
  title: string;
  description: string;
  specs: string[];
  color: string;
};

type AreaKey = "LeftArea" | "CenterArea" | "RightArea";

const areaInfo: Record<AreaKey, AreaInfo> = {
  LeftArea: {
    name: "Renewable Energy Source",
    title: "Solar & Wind Power",
    description:
      "Pembangkit listrik tenaga surya dan angin yang menghasilkan energi bersih",
    specs: ["Solar: 2 MW", "Wind: 3 MW", "Total: 5 MW"],
    color: "#00A3E0",
  },
  CenterArea: {
    name: "Sand Battery",
    title: "Sand Battery Storage",
    description: "Sistem penyimpanan energi thermal berbasis sand battery",
    specs: ["Kapasitas: 8 MWh", "Suhu: 500-600°C", "Efisiensi: 95%"],
    color: "#005792",
  },
  RightArea: {
    name: "Industrial Complex",
    title: "Energy Distribution",
    description:
      "Kompleks industri yang menggunakan energi dari sistem penyimpanan",
    specs: ["Konsumsi: 4 MW", "24/7 supply", "150+ buildings"],
    color: "#FD5F00",
  },
};

function CompleteScene({ onLoaded }: { onLoaded: () => void }) {
  const { scene } = useGLTF("/models/BARAPASIR-COMP.glb");
  const { camera } = useThree();
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);
  const [clickPosition, setClickPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const [cameraDistance, setCameraDistance] = useState(8);
  const groupRefs = useRef<Record<string, Object3D>>({});

  useEffect(() => {
    scene.traverse((child) => {
      if (
        child.name &&
        (child.name.includes("Left") ||
          child.name.includes("Center") ||
          child.name.includes("Right"))
      ) {
        groupRefs.current[child.name] = child;
      }
    });

    // Notify parent bahwa model sudah loaded
    onLoaded();
  }, [scene, onLoaded]);

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

    setSelectedArea(areaName);
    setClickPosition([event.point.x, event.point.y, event.point.z]);
  };

  const info = selectedArea ? areaInfo[selectedArea] : null;

  return (
    <group onClick={handleClick}>
      <primitive object={scene} scale={0.5} position={[0, -1, 0]} />

      {info && (
        <Html position={clickPosition} center distanceFactor={4}>
          <div
            style={{
              background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}dd 100%)`,
              color: "#F6F6E9",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              minWidth: "280px",
              maxWidth: "350px",
              pointerEvents: "auto",
              fontFamily: "var(--font-poppins), system-ui, sans-serif",
              border: "2px solid rgba(246,246,233,0.3)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                opacity: 0.9,
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#F6F6E9",
              }}
            >
              {info.name}
            </div>

            <h3
              style={{
                margin: "0 0 10px 0",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#F6F6E9",
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
                color: "#F6F6E9",
              }}
            >
              {info.description}
            </p>

            <div
              style={{
                background: "rgba(246,246,233,0.15)",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            >
              {info.specs.map((spec, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: "12px",
                    margin: "3px 0",
                    color: "#F6F6E9",
                  }}
                >
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
                background: "#F6F6E9",
                color: info.color,
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontFamily: "var(--font-poppins), system-ui, sans-serif",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F6F6E9";
                e.currentTarget.style.transform = "scale(1)";
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

// Loader Component
function Loader3D() {
  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid #005792",
            borderTop: "4px solid #FD5F00",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <div
          style={{
            fontSize: "16px",
            color: "#005792",
            fontWeight: "600",
            fontFamily: "var(--font-poppins), system-ui, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Loading 3D Model...
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  );
}

export default function ThreeDPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Timer minimal 1 detik
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 800); // 1000ms = 1 detik

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Loader hilang HANYA jika model sudah loaded DAN minimal 1 detik sudah lewat
    if (modelLoaded && minTimeElapsed) {
      setIsLoading(false);
    }
  }, [modelLoaded, minTimeElapsed]);

  const handleModelLoaded = () => {
    setModelLoaded(true);
  };

  return (
    <ErrorBoundary3D>
      {/* Full Screen Loader - Hilang setelah model loaded DAN minimal 1 detik */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              border: "5px solid #005792",
              borderTop: "5px solid #FD5F00",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              marginBottom: "20px",
            }}
          />
          <div
            style={{
              fontSize: "20px",
              color: "#005792",
              fontWeight: "600",
              fontFamily: "var(--font-poppins), system-ui, sans-serif",
            }}
          >
            Loading 3D Model...
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Back Button */}
        <Link href="/">
          <button
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 1000,
              padding: "12px 24px",
              background: "linear-gradient(135deg, #005792 0%, #13334C 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0, 87, 146, 0.3)",
              transition: "all 0.3s ease",
              fontFamily: "var(--font-poppins), system-ui, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(0, 87, 146, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 87, 146, 0.3)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </Link>

        <Canvas
          camera={{ position: [5, 2, 5], fov: 27 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<Loader3D />}>
            <color attach="background" args={["#FFFFFF"]} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />

            <CompleteScene onLoaded={handleModelLoaded} />
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
    </ErrorBoundary3D>
  );
}
