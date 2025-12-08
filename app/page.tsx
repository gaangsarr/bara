import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BarraInnovationData from "../components/DataPage";
import FactInnovation from "@/components/FactInnovation";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FactInnovation />
    </div>
  );
}
