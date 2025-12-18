import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://baraproject.site"),
  title: "BARA | Coastal Resilience Engine",
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
    url: "https://baraproject.site",
    siteName: "BARA PROJECT",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "googleb396185b540c853d",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="canonical" href="https://baraproject.site" />
      </head>
      <body className="min-h-screen">
        <LayoutWrapper>
          {children}
          <Footer />
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
