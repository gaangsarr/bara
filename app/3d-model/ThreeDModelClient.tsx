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
import * as THREE from "three";

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
      "Area pembangkit yang menggabungkan tenaga surya dan angin untuk menghasilkan listrik rendah emisi yang memasok sistem Sand Battery.",
    specs: [
      "Kapasitas PLTS: ±2 MW",
      "Kapasitas PLTB: ±3 MW",
      "Total daya terpasang: ±5 MW",
    ],
    color: "#00A3E0",
  },
  CenterArea: {
    name: "Sand Battery",
    title: "Sand Battery Storage",
    description:
      "Sand Battery menyimpan energi listrik dari sumber terbarukan dalam bentuk panas pada media pasir bersuhu tinggi sehingga dapat dimanfaatkan secara fleksibel saat dibutuhkan.",
    specs: [
      "Kapasitas penyimpanan: ~8 MWh",
      "Rentang operasi suhu: 500–600°C",
      "Perkiraan efisiensi siklus: hingga ±90–95%",
    ],
    color: "#005792",
  },
  RightArea: {
    name: "Sea Water Desalination",
    title: "Desalination Plant",
    description:
      "Fasilitas desalinasi yang memanfaatkan energi dari Sand Battery dan pembangkit terbarukan untuk mengubah air laut menjadi air tawar bagi kebutuhan industri dan pemukiman.",
    specs: [
      "Kebutuhan daya operasi: ~4 MW",
      "Operasi berkelanjutan: 24/7",
      "Cakupan layanan: >150 bangunan/konsumen",
    ],
    color: "#FD5F00",
  },
};

// Cinematic Camera Controller
function CinematicCamera({ onComplete }: { onComplete: () => void }) {
  const { camera } = useThree();
  const [cinematicTime, setCinematicTime] = useState(0);
  const cinematicDuration = 25;
  const hasCompleted = useRef(false);

  useFrame((state, delta) => {
    if (cinematicTime < cinematicDuration) {
      const t = cinematicTime / cinematicDuration;

      const easeInOut =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const keyframes = [
        // 1. Opening: Wide shot (0-5 detik)
        { pos: [8.8, 6.7, 7.9], lookAt: [0, 0, 0], time: 0 },

        // 2. LEFT Area (5-10 detik)
        { pos: [3.3, 0.9, 6.8], lookAt: [0.2, 0.3, 2.8], time: 0.2 },

        // 3. CENTER Area (10-15 detik)
        { pos: [5.7, 0.1, 4.8], lookAt: [1, -0.3, 0.7], time: 0.4 },

        // 4. RIGHT Area (15-20 detik)
        { pos: [4.9, 0.4, 2.6], lookAt: [0.8, -0.5, -2], time: 0.6 },

        // 5. Back View (20-22.5 detik)
        { pos: [-7.2, 2.5, -7.9], lookAt: [0.6, -0.2, 0.7], time: 0.8 },

        // 6. Final Overview (22.5-25 detik)
        { pos: [8, 4, 8], lookAt: [0, 0, 0], time: 1.0 },
      ];

      let current = keyframes[0];
      let next = keyframes[1];

      for (let i = 0; i < keyframes.length - 1; i++) {
        if (
          easeInOut >= keyframes[i].time &&
          easeInOut <= keyframes[i + 1].time
        ) {
          current = keyframes[i];
          next = keyframes[i + 1];
          break;
        }
      }

      const segmentProgress =
        (easeInOut - current.time) / (next.time - current.time);

      const smoothProgress =
        segmentProgress < 0.5
          ? 2 * segmentProgress * segmentProgress
          : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;

      camera.position.x = THREE.MathUtils.lerp(
        current.pos[0],
        next.pos[0],
        smoothProgress
      );
      camera.position.y = THREE.MathUtils.lerp(
        current.pos[1],
        next.pos[1],
        smoothProgress
      );
      camera.position.z = THREE.MathUtils.lerp(
        current.pos[2],
        next.pos[2],
        smoothProgress
      );

      const lookAtTarget = new THREE.Vector3(
        THREE.MathUtils.lerp(current.lookAt[0], next.lookAt[0], smoothProgress),
        THREE.MathUtils.lerp(current.lookAt[1], next.lookAt[1], smoothProgress),
        THREE.MathUtils.lerp(current.lookAt[2], next.lookAt[2], smoothProgress)
      );

      camera.lookAt(lookAtTarget);
      camera.updateProjectionMatrix();

      setCinematicTime(cinematicTime + delta);
    } else if (!hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  });

  return null;
}

function CompleteScene() {
  const { scene } = useGLTF("/models/BARA3D-4MB.glb");
  const { camera } = useThree();
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);
  const [clickPosition, setClickPosition] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
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

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    const point = event.point; // world coords (x, y, z)
    let clickedObject: Object3D | null = event.object;
    let areaName: AreaKey | null = null;

    // 1) Coba deteksi lewat nama parent di GLB
    while (clickedObject && !areaName) {
      if (clickedObject.name && clickedObject.name in areaInfo) {
        areaName = clickedObject.name as AreaKey;
        break;
      }
      clickedObject = clickedObject.parent;
    }

    // 2) Kalau belum ketemu → pakai bounding box per area (X–Z only)
    if (!areaName) {
      const x = point.x;
      const z = point.z;

      // === LEFT AREA BOUNDING BOX ===
      // Data ujung yang kamu kirim:
      // (-1.42, -0.39), (-1.12, 1.72), (-0.27, 0.88), (-2.06, 0.61)
      // Ambil min/max dan sedikit dilebarkan
      const leftXMin = -2.2;
      const leftXMax = -0.1;
      const leftZMin = -0.6; // agak dikurangi biar ngga kepotong depan
      const leftZMax = 1.9; // agak dilebarkan ke belakang

      // === RIGHT AREA BOUNDING BOX ===
      // Data ujung yang kamu kirim sebelumnya:
      // (0.25, -0.84), (1.50, -0.81), (1.42, -2.23), (0.27, -2.18)
      const rightXMin = 0.1;
      const rightXMax = 1.7;
      const rightZMin = -2.4;
      const rightZMax = -0.6;

      const inLeftArea =
        x >= leftXMin && x <= leftXMax && z >= leftZMin && z <= leftZMax;

      const inRightArea =
        x >= rightXMin && x <= rightXMax && z >= rightZMin && z <= rightZMax;

      if (inLeftArea) {
        // ✅ Semua objek di atas platform kiri (termasuk awan) → LeftArea
        areaName = "LeftArea";
      } else if (inRightArea) {
        areaName = "RightArea";
      } else {
        // 3) Fallback terakhir: partisi kasar berdasarkan X
        if (x < -2) areaName = "LeftArea";
        else if (x > 2) areaName = "RightArea";
        else areaName = "CenterArea";
      }
    }

    setSelectedArea(areaName);
    setClickPosition([point.x, point.y, point.z]);
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
        padding: "16px",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "420px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "var(--font-poppins), system-ui, sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #005792 0%, #13334C 100%)",
            padding: "20px 18px",
            color: "white",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            Petunjuk Navigasi
          </h2>
          <p
            style={{
              margin: "6px 0 0 0",
              opacity: 0.9,
              fontSize: "13px",
            }}
          >
            Pelajari cara menggunakan model 3D interaktif
          </p>
        </div>

        {/* Konten scrollable */}
        <div
          style={{
            padding: "16px 18px 8px 18px",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Rekomendasi perangkat */}
          <div
            style={{
              background: "#FFF7E0",
              border: "1px solid #FACC15",
              borderRadius: "10px",
              padding: "10px 12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: "12px",
                color: "#92400E",
                marginBottom: "4px",
              }}
            >
              Rekomendasi
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#92400E",
                lineHeight: 1.5,
              }}
            >
              Gunakan <strong>Laptop/Desktop</strong> untuk pengalaman terbaik.
            </div>
          </div>

          {/* Switch Mobile / Desktop */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <button
              onClick={() => setDeviceType("mobile")}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: "999px",
                border: "1px solid #005792",
                background: deviceType === "mobile" ? "#005792" : "white",
                color: deviceType === "mobile" ? "white" : "#005792",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Mobile
            </button>
            <button
              onClick={() => setDeviceType("desktop")}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: "999px",
                border: "1px solid #005792",
                background: deviceType === "desktop" ? "#005792" : "white",
                color: deviceType === "desktop" ? "white" : "#005792",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Desktop
            </button>
          </div>

          {/* Cards kontrol */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            {deviceType === "mobile" ? (
              <>
                <ControlCard
                  iconSrc="/assets/spin-min.png"
                  title="Putar"
                  description="1 jari geser"
                />
                <ControlCard
                  iconSrc="/assets/move-min.png"
                  title="Pindah"
                  description="2 jari geser"
                />
                <ControlCard
                  iconSrc="/assets/zoom-min.png"
                  title="Zoom"
                  description="Pinch (cubit)"
                />
              </>
            ) : (
              <>
                <ControlCard
                  iconSrc="/assets/mouse-min.png"
                  title="Putar"
                  description="Klik kiri + drag"
                />
                <ControlCard
                  iconSrc="/assets/mouse-min.png"
                  title="Pindah"
                  description="Klik kanan + drag"
                />
                <ControlCard
                  iconSrc="/assets/zoom-min.png"
                  title="Zoom"
                  description="Scroll wheel"
                />
              </>
            )}
          </div>
        </div>

        {/* Footer, selalu terlihat */}
        <div
          style={{
            padding: "12px 18px 16px 18px",
            borderTop: "1px solid #E5E7EB",
            background: "white",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#FD5F00",
              color: "white",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Mulai
          </button>
        </div>
      </div>
    </div>
  );
}

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
        background: "#F9FAFB",
        borderRadius: "10px",
        padding: "10px 8px",
        textAlign: "center",
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          marginBottom: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "40px",
        }}
      >
        <img
          src={iconSrc}
          alt={title}
          style={{
            width: "32px",
            height: "32px",
            objectFit: "contain",
          }}
        />
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: "13px",
          marginBottom: "2px",
          color: "#111827",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "#6B7280",
        }}
      >
        {description}
      </div>
    </div>
  );
}

useGLTF.preload("/models/BARA3D-4MB.glb");
function PageLoader({ onLoaded }: { onLoaded: () => void }) {
  const { progress, active } = useProgress();

  useEffect(() => {
    if (!active && progress === 100) {
      onLoaded();
    }
  }, [active, progress, onLoaded]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9998,
      }}
    >
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
            fontWeight: 600,
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
    </div>
  );
}

export default function ThreeDPage() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [cinematicComplete, setCinematicComplete] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const orbitControlsRef = useRef<any>(null);

  // Ketika assetsLoaded true, baru tampilkan tutorial
  useEffect(() => {
    if (assetsLoaded) {
      setShowTutorial(true);
    }
  }, [assetsLoaded]);

  // Skip button hanya muncul saat cinematic jalan
  useEffect(() => {
    if (started && !cinematicComplete) {
      const timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [started, cinematicComplete]);

  const handleSkipCinematic = () => {
    setCinematicComplete(true);
    setShowSkipButton(false);
  };

  const handleCinematicComplete = () => {
    setCinematicComplete(true);
    setShowSkipButton(false);
  };

  const handleStart = () => {
    setShowTutorial(false);
    setStarted(true); // ✅ mulai cinematic + tampilkan Canvas
    setCinematicComplete(false);
    setShowSkipButton(false);
  };

  return (
    <ErrorBoundary3D>
      {/* Loader fullscreen, hanya tampil sebelum assetsLoaded */}
      {!assetsLoaded && <PageLoader onLoaded={() => setAssetsLoaded(true)} />}

      {/* Tutorial muncul setelah load selesai, sebelum user klik Mulai */}
      {assetsLoaded && showTutorial && <TutorialModal onClose={handleStart} />}

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

        {/* Skip Button */}
        {started && showSkipButton && !cinematicComplete && (
          <button
            onClick={handleSkipCinematic}
            style={{
              position: "fixed", // ← Ubah ke fixed, bukan absolute
              bottom: "24px", // ← Naikkan dari 40px ke 24px
              right: "24px", // ← Sedikit lebih kecil margin
              zIndex: 1001, // ← Lebih tinggi dari canvas
              padding: "12px 24px",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              fontFamily: "var(--font-poppins), system-ui, sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.9)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Skip Intro
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4l12 8-12 8V4z" />
              <path d="M18 4h2v16h-2V4z" />
            </svg>
          </button>
        )}

        {/* Help Button */}
        {!showTutorial && assetsLoaded && cinematicComplete && started && (
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

        {/* Canvas hanya dirender setelah user klik Mulai */}
        {started && (
          <Canvas
            camera={{ position: [8, 4, 8], fov: 27 }}
            gl={{ antialias: true, alpha: true }}
          >
            <color attach="background" args={["#FFFFFF"]} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />

            {/* Model langsung tanpa Suspense loader, karena sudah dimuat sebelumnya */}
            <Suspense fallback={null}>
              <CompleteScene />
              <Environment preset="city" />
            </Suspense>

            {/* Cinematic hanya saat belum complete */}
            {!cinematicComplete && (
              <CinematicCamera onComplete={handleCinematicComplete} />
            )}

            <OrbitControls
              ref={orbitControlsRef}
              enabled={cinematicComplete}
              enableZoom
              enablePan
              enableRotate
              maxPolarAngle={Math.PI / 2}
              minDistance={3}
              maxDistance={15}
            />
          </Canvas>
        )}
      </div>
    </ErrorBoundary3D>
  );
}
