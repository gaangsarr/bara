import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BarraInnovationData from "../components/DataPage";
import FactInnovation from "@/components/FactInnovation";
import ContactForm from "@/components/ContactForm";
import OurTeams from "@/components/OurTeam";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BARA | Coastal Resilience Engine",
  description: "Sand Battery Energy Storage System - Renewable Energy Solution",
  alternates: {
    canonical: "https://baraproject.site",
  },
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FactInnovation />
      <OurTeams />
    </div>
  );
}
