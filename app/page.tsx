import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FactInnovation from "@/components/FactInnovation";
import OurTeams from "@/components/OurTeam";
import ContactHome from "@/components/ContactHome";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BARA | Coastal Resilience Engine",
  description: "Sand Battery Energy Storage System - Renewable Energy Solution",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FactInnovation />
      <OurTeams />
      <ContactHome />
    </div>
  );
}
