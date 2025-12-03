"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  useProgress,
} from "@react-three/drei";
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

function CompleteScene() {
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
  }, [scene]);

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

// Loader dengan Progress Bar
function Loader3D() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          minWidth: "200px",
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
            fontSize: "18px",
            color: "#005792",
            fontWeight: "600",
            fontFamily: "var(--font-poppins), system-ui, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Loading 3D Model...
        </div>

        <div
          style={{
            width: "200px",
            height: "4px",
            background: "#E0E0E0",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #005792 0%, #FD5F00 100%)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#13334C",
            fontFamily: "var(--font-poppins), system-ui, sans-serif",
          }}
        >
          {progress.toFixed(0)}%
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

// Modal Tutorial Component
function TutorialModal({ onClose }: { onClose: () => void }) {
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("mobile");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
          fontFamily: "var(--font-poppins), system-ui, sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #005792 0%, #13334C 100%)",
            padding: "30px",
            borderRadius: "20px 20px 0 0",
            color: "white",
            position: "relative",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>
            Petunjuk Navigasi
          </h2>
          <p style={{ margin: "8px 0 0 0", opacity: 0.9, fontSize: "14px" }}>
            Pelajari cara menggunakan model 3D interaktif
          </p>
        </div>

        {/* Device Warning */}
        <div
          style={{
            background: "#FFF3CD",
            border: "2px solid #FFC107",
            borderRadius: "12px",
            padding: "16px 20px",
            margin: "20px 30px",
            display: "flex",
            alignItems: "start",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: "600",
                color: "#856404",
                marginBottom: "4px",
              }}
            >
              Rekomendasi Perangkat
            </div>
            <div
              style={{ fontSize: "14px", color: "#856404", lineHeight: "1.5" }}
            >
              Untuk pengalaman terbaik, gunakan{" "}
              <strong>Laptop atau Desktop</strong> dengan mouse untuk kontrol
              yang lebih presisi dan performa optimal.
            </div>
          </div>
        </div>

        {/* Device Toggle */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            margin: "20px 30px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setDeviceType("mobile")}
            style={{
              padding: "12px 32px",
              borderRadius: "12px",
              border: "2px solid #005792",
              background: deviceType === "mobile" ? "#005792" : "white",
              color: deviceType === "mobile" ? "white" : "#005792",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
          >
            Mobile
          </button>
          <button
            onClick={() => setDeviceType("desktop")}
            style={{
              padding: "12px 32px",
              borderRadius: "12px",
              border: "2px solid #005792",
              background: deviceType === "desktop" ? "#005792" : "white",
              color: deviceType === "desktop" ? "white" : "#005792",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
          >
            Desktop
          </button>
        </div>

        {/* Controls Tutorial */}
        <div style={{ padding: "0 30px 30px 30px" }}>
          {deviceType === "mobile" ? (
            // Mobile Controls dengan Custom Icon
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <ControlCard
                iconSrc="/assets/spin.png"
                title="Memutar Kamera"
                description="Geser dengan satu jari untuk memutar model"
              />
              <ControlCard
                iconSrc="/assets/move.png"
                title="Memindah Kamera"
                description="Geser dengan dua jari untuk memindahkan posisi kamera"
              />
              <ControlCard
                iconSrc="/assets/zoom.png"
                title="Mengatur Jarak Kamera"
                description="Pinch (cubit) untuk zoom in/out"
              />
            </div>
          ) : (
            // Desktop Controls dengan Custom Icon
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              <ControlCard
                iconSrc="/assets/mouse.png"
                title="Memutar Kamera"
                description="Klik kiri + drag untuk memutar model"
              />
              <ControlCard
                iconSrc="/assets/mouse.png"
                title="Memindah Kamera"
                description="Klik kanan + drag untuk pan kamera"
              />
              <ControlCard
                iconSrc="/assets/zoom.png"
                title="Zoom In/Out"
                description="Scroll mouse wheel untuk zoom"
              />
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div
          style={{
            padding: "20px 30px",
            borderTop: "1px solid #E0E0E0",
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "12px 32px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #FD5F00 0%, #FF8A3D 100%)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(253, 95, 0, 0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(253, 95, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(253, 95, 0, 0.3)";
            }}
          >
            Mulaii
          </button>
        </div>
      </div>
    </div>
  );
}

// Control Card Component - CENTERED IMAGE
function ControlCard({
  iconSrc,
  title,
  description,
}: {
  iconSrc: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "#F8F9FA",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        border: "2px solid #E0E0E0",
        transition: "all 0.2s",
      }}
    >
      {/* Custom Image Icon - CENTERED */}
      <div
        style={{
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80px", // Fixed height untuk alignment konsisten
        }}
      >
        <img
          src={iconSrc}
          alt={title}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            display: "block", // Remove inline spacing
          }}
        />
      </div>
      <div
        style={{
          fontWeight: "600",
          color: "#005792",
          marginBottom: "8px",
          fontSize: "16px",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
        {description}
      </div>
    </div>
  );
}

// Preload model
useGLTF.preload("/models/BARAPASIR-COMP.glb");

export default function ThreeDPage() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ErrorBoundary3D>
      {/* Tutorial Modal - Muncul setelah loading selesai */}
      {showTutorial && isLoaded && (
        <TutorialModal onClose={() => setShowTutorial(false)} />
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

        {/* Help Button - Buka tutorial lagi */}
        {!showTutorial && isLoaded && (
          <button
            onClick={() => setShowTutorial(true)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 1000,
              padding: "12px",
              background: "#FD5F00",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(253, 95, 0, 0.3)",
              transition: "all 0.3s ease",
              fontFamily: "var(--font-poppins), system-ui, sans-serif",
              fontSize: "20px",
            }}
            title="Lihat Tutorial"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ?
          </button>
        )}

        <Canvas
          camera={{ position: [5, 2, 5], fov: 27 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={() => setIsLoaded(true)}
        >
          <color attach="background" args={["#FFFFFF"]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />

          {/* Suspense untuk Model */}
          <Suspense fallback={<Loader3D />}>
            <CompleteScene />
          </Suspense>

          {/* Suspense TERPISAH untuk Environment */}
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            enableZoom
            enablePan
            enableRotate
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        </Canvas>
      </div>
    </ErrorBoundary3D>
  );
}
