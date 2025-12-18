import type { Metadata } from "next";
import ThreeDModelClient from "./ThreeDModelClient";

export const metadata: Metadata = {
  title: "3D Model Visualization | BARA PROJECT",
  description:
    "Interactive 3D visualization of BARA sand battery thermal energy storage system with detailed component exploration",
  keywords: [
    "3D model",
    "sand battery visualization",
    "BARA 3D",
    "interactive model",
  ],
  openGraph: {
    title: "3D Model | BARA PROJECT",
    description: "Explore BARA's thermal storage system in interactive 3D",
    type: "website",
  },
  alternates: {
    canonical: "/3d-model",
  },
};

export default function ThreeDModelPage() {
  return <ThreeDModelClient />;
}
