// components/TextMarquee.tsx
"use client";

import { motion } from "framer-motion";

const technologies = [
  "GANGSAR ANJASMORO",
  "ABDUL AKYAS SUGIANTO",
  "AISYAH NUR KUSUMA WARDANI",
];

export default function TextMarquee() {
  // Triple duplicate for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="py-8 bg-[#7dcbf8] overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedTech.map((tech, index) => (
          <span
            key={index}
            className="text-white text-2xl md:text-4xl font-bold inline-block px-6"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
