"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { value: "8 MWh", label: "Energy Storage" },
    { value: "95%", label: "Efficiency" },
    { value: "24/7", label: "Operation" },
  ];

  return (
    <section
      className="relative w-full min-h-[calc(100vh-72px)] overflow-hidden py-12"
      style={{
        background: "linear-gradient(180deg, #CEDEFF 0%, #FFFFFF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 mt-7 lg:mt-20">
        {/* Text Content */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{
              color: "#005792",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              lineHeight: "1.1",
            }}
          >
            Coastal Resilience Engine
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl mb-8 max-w-7xl mx-auto"
            style={{
              color: "#13334C",
              lineHeight: "1.3",
            }}
          >
            Harnessing industrial-scale sand thermal storage to drive 24/7
            seawater desalination for national water security.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/3d-model">
              <motion.button
                className="px-5 py-3 rounded-full font-semibold text-sm 
                text-white inline-flex items-center gap-2 shadow-lg md:px-6 md:py-4 md:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background:
                    "linear-gradient(135deg, #005792 0%, #13334C 100%)",
                }}
              >
                View 3D Model
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 md:gap-8 mb-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 text-center shadow-lg 
      h-[100px] md:h-[140px] flex flex-col items-center justify-center"
            >
              <div
                className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 md:mb-2 whitespace-nowrap"
                style={{ color: "#005792" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] sm:text-xs md:text-sm leading-tight"
                style={{ color: "#13334C" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image dengan Floating Animation + Clickable */}
        <Link href="/3d-model">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative max-w-5xl mx-auto cursor-pointer"
          >
            <Image
              src="/bgHero.png"
              alt="Coastal Resilience Engine"
              width={1920}
              height={1080}
              className="w-full h-auto drop-shadow-2xl transition-shadow hover:drop-shadow-[0_25px_50px_rgba(0,87,146,0.3)]"
              priority
            />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
