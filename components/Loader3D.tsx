"use client";

import { Html, useProgress } from "@react-three/drei";

export default function Loader3D() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          minWidth: "250px",
        }}
      >
        {/* Spinner */}
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "3px solid black",
            borderTop: "3px solid white",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />

        {/* Loading Text */}
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Please wait...
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
