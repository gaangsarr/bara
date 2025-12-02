import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BARA PROJECT",
  description: "Sand Battery Energy Storage System - Renewable Energy Solution",
  keywords: ["sand battery", "renewable energy", "energy storage"],
  authors: [
    {
      name: "BARA Team | Gangsar Anjasmoro, Abdul Akyas Sugianto, Aisyah Nur Kusuma Wardhani",
    },
  ],
  openGraph: {
    title: "BARA PROJECT",
    description: "Sand Battery Energy Storage System",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
