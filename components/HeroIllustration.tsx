"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <section className="relative w-full py-8 md:py-12 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/bgHero.png"
            alt="Coastal Resilience Engine 3D Model"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
