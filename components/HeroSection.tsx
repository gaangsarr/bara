"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function HeroSection() {
  // Tanpa return type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative w-full lg:h-[calc(100vh-72px)] h-[calc(100vh-150px)] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #CEDEFF 0%, #FFFFFF 100%)",
      }}
    >
      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start mt-25 md:mt-60 lg:mt-0 lg:justify-start lg:pt-10 px-4">
        <motion.div
          className="max-w-6xl text-center lg:mt-10 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title dengan animasi */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-3"
            style={{
              color: "#005792",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Coastal Resilience Engine
          </motion.h1>

          {/* Subtitle dengan animasi */}
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-xl lg:text-base max-w-xl md:max-w-5xl lg:max-w-5xl mx-auto mb-4 md:mb-5"
            style={{ color: "#13334C" }}
          >
            Harnessing industrial-scale sand thermal storage to drive 24/7
            seawater desalination for national water security.
          </motion.p>

          {/* Button dengan animasi */}
          <motion.div variants={itemVariants}>
            <Link href="/3d-model">
              <motion.button
                className="px-4 md:m-7 md:px-10 py-3 rounded-full font-semibold text-xs md:text-base text-white inline-flex items-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                style={{
                  background:
                    "linear-gradient(135deg, #005792 0%, #13334C 100%)",
                }}
              >
                3D Model
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 rotate-90"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Illustration dengan animasi */}
      <motion.div
        className="absolute inset-0 flex lg:items-start items-end justify-center pointer-events-none"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-full h-[60%] md:h-[70%] lg:h-[110%] max-w-10xl">
          <Image
            src="/bgHero.png"
            alt="Coastal Resilience Engine"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
