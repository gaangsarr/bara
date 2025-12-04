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

  return (
    <section
      className="relative w-full min-h-[calc(100vh-72px)] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #CEDEFF 0%, #FFFFFF 100%)",
      }}
    >
      {/* MOBILE LAYOUT: Flex Column (Text + Image) */}
      <div className="md:hidden flex flex-col min-h-[calc(100vh-72px)]">
        {/* Text Section - Centered */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center px-6 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-4xl font-bold mb-4 text-center"
            style={{
              color: "#005792",
              textShadow: "0 2px 8px rgba(0, 87, 146, 0.2)",
              lineHeight: "1.1",
            }}
          >
            Coastal Resilience Engine
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base mb-6 text-center max-w-md"
            style={{
              color: "#13334C",
              lineHeight: "1.4",
            }}
          >
            Harnessing industrial-scale sand thermal storage to drive 24/7
            seawater desalination for national water security.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/3d-model">
              <motion.button
                className="px-6 py-3 rounded-full font-semibold text-sm
                text-white inline-flex items-center gap-2 shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background:
                    "linear-gradient(135deg, #005792 0%, #003D5C 100%)",
                }}
              >
                <span className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-sm">
                  <svg
                    className="w-3 h-3 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                3D Model
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="px-4 pb-6"
        >
          <Link href="/3d-model">
            <Image
              src="/bgHero2.png"
              alt="Coastal Resilience Engine System"
              width={1920}
              height={1080}
              className="w-full h-auto -translate-y-20"
              priority
            />
          </Link>
        </motion.div>
      </div>

      {/* DESKTOP LAYOUT: Overlay */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 relative py-8 lg:py-12">
          <div className="relative w-full">
            {/* Background Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative w-full"
            >
              <Link href="/3d-model">
                <Image
                  src="/bgHero2.png"
                  alt="Coastal Resilience Engine System"
                  width={1920}
                  height={1080}
                  className="w-full h-auto -translate-y-10"
                  priority
                />
              </Link>
            </motion.div>

            {/* Text Overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-start pt-8 md:pt-12 lg:pt-16 xl:pt-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-5 lg:mb-6 px-4 text-center"
                style={{
                  color: "#005792",
                  textShadow:
                    "0 4px 12px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 87, 146, 0.3)",
                  lineHeight: "1.1",
                }}
              >
                Coastal Resilience Engine
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-sm md:text-base lg:text-lg xl:text-xl mb-4 md:mb-6 max-w-2xl lg:max-w-4xl mx-auto px-4 text-center"
                style={{
                  color: "#13334C",
                  lineHeight: "1.4",
                  textShadow: "0 2px 8px rgba(255, 255, 255, 0.9)",
                }}
              >
                Harnessing industrial-scale sand thermal storage to drive 24/7
                seawater desalination for national water security.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link href="/3d-model">
                  <motion.button
                    className="px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base
                    text-white inline-flex items-center gap-2 md:gap-3 shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background:
                        "linear-gradient(135deg, #005792 0%, #003D5C 100%)",
                    }}
                  >
                    <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-orange-500 rounded-sm">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    3D Model
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
