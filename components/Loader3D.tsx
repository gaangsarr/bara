"use client";

import { Html } from "@react-three/drei";

export default function Loader3D() {
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
            border: "3px solid #005792",
            borderTop: "3px solid #FD5F00",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />

        {/* Loading Text */}
        <div
          style={{
            fontSize: "16px",
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
    </Html>
  );
}
