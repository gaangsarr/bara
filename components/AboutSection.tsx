"use client";

import Image from "next/image";
import { useState } from "react";

type SDGGoal = {
  number: number;
  title: string;
  color: string;
  image: string;
  description: string;
  connection: string[];
};

export default function AboutSection() {
  const [selectedSDG, setSelectedSDG] = useState<SDGGoal | null>(null);

  const sdgGoals: SDGGoal[] = [
    {
      number: 6,
      title: "Clean Water and Sanitation",
      color: "#00ABED",
      image: "/sdg/sdg-6.png",
      description:
        "Ensure availability and sustainable management of water and sanitation for all",
      connection: [
        "BARA mengurangi kebutuhan air untuk memasak dengan sistem flameless",
        "Teknologi sand battery tidak menghasilkan limbah air seperti sistem konvensional",
        "Membantu komunitas di daerah krisis air dengan solusi energi bersih",
      ],
    },
    {
      number: 7,
      title: "Affordable and Clean Energy",
      color: "#FCC30B",
      image: "/sdg/sdg-7.png",
      description:
        "Ensure access to affordable, reliable, sustainable and modern energy",
      connection: [
        "Menyediakan energi bersih dan terjangkau untuk memasak dan listrik",
        "Mengurangi ketergantungan pada bahan bakar fosil",
        "Teknologi thermal storage yang efisien dan ramah lingkungan",
        "Solusi portabel untuk disaster relief dan daerah terpencil",
      ],
    },
    {
      number: 9,
      title: "Industry Innovation and Infrastructure",
      color: "#FD6925",
      image: "/sdg/sdg-9.png",
      description:
        "Build resilient infrastructure, promote sustainable industrialization",
      connection: [
        "Inovasi teknologi sand battery untuk penyimpanan energi thermal",
        "Infrastruktur energi portabel yang dapat dipindahkan",
        "Mendukung industrialisasi berkelanjutan dengan energi bersih",
        "Teknologi modern untuk disaster relief",
      ],
    },
    {
      number: 12,
      title: "Responsible Consumption and Production",
      color: "#BF8B2E",
      image: "/sdg/sdg-12.png",
      description: "Ensure sustainable consumption and production patterns",
      connection: [
        "Menggunakan pasir sebagai media penyimpanan yang sustainable",
        "Mengurangi konsumsi bahan bakar tradisional (gas, kayu bakar)",
        "Efisiensi energi 95% mengurangi pemborosan",
        "Zero waste operation - tidak ada emisi berbahaya",
      ],
    },
    {
      number: 13,
      title: "Climate Action",
      color: "#3F7E44",
      image: "/sdg/sdg-13.png",
      description:
        "Take urgent action to combat climate change and its impacts",
      connection: [
        "Mengurangi emisi gas rumah kaca dengan energi bersih",
        "Menghilangkan asap beracun dari bahan bakar tradisional",
        "Mendukung transisi ke energi terbarukan",
        "Solusi adaptasi untuk dampak perubahan iklim dan bencana",
      ],
    },
  ];

  return (
    <section className="w-full pt-24 md:pt-28 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* What is BARA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/baraAbout.png"
              alt="BARA Facility"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Apa itu <span style={{ color: "#FD5F00" }}>BARA</span>?
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 text-justify">
              BARA adalah sistem desalinasi termal terintegrasi yang
              memanfaatkan panas tersimpan dalam pasir untuk mengubah air laut
              menjadi air bersih secara berkelanjutan. Dirancang untuk ketahanan
              wilayah pesisir, inovasi ini menghilangkan ketergantungan pada
              energi kotor dan biaya operasional tinggi yang melekat pada pabrik
              penyulingan air konvensional.
            </p>
          </div>
        </div>

        {/* SDG Section */}
        <div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6"
            style={{ color: "#005792" }}
          >
            Sustainable Development Goals
          </h2>

          <p className="text-center text-gray-600 mb-8 md:mb-12">
            Click on each goal to learn how BARA contributes
          </p>

          {/* SDG Icons Grid - LAYOUT 3-2 DI MOBILE */}
          <div className="w-full max-w-md md:max-w-none mx-auto">
            {/* Baris 1: 3 SDG (Mobile Only) */}
            <div className="grid grid-cols-3 gap-3 md:hidden mb-3">
              {sdgGoals.slice(0, 3).map((goal) => (
                <button
                  key={goal.number}
                  onClick={() => setSelectedSDG(goal)}
                  className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg 
                  hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: goal.color }}
                >
                  <Image
                    src={goal.image}
                    alt={`SDG ${goal.number}: ${goal.title}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Baris 2: 2 SDG Center (Mobile Only) */}
            <div className="flex justify-center gap-3 md:hidden">
              {sdgGoals.slice(3, 5).map((goal) => (
                <button
                  key={goal.number}
                  onClick={() => setSelectedSDG(goal)}
                  className="relative w-[calc(33.333%-0.5rem)] aspect-square rounded-lg overflow-hidden 
                  shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: goal.color }}
                >
                  <Image
                    src={goal.image}
                    alt={`SDG ${goal.number}: ${goal.title}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Desktop: All in one row */}
            <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-6">
              {sdgGoals.map((goal) => (
                <button
                  key={goal.number}
                  onClick={() => setSelectedSDG(goal)}
                  className="relative w-[150px] h-[150px] lg:w-[180px] lg:h-[180px] 
                  rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl 
                  transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: goal.color }}
                >
                  <Image
                    src={goal.image}
                    alt={`SDG ${goal.number}: ${goal.title}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedSDG && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSDG(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="p-6 md:p-8 text-white rounded-t-2xl"
              style={{ backgroundColor: selectedSDG.color }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-2 opacity-90">
                    SDG {selectedSDG.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {selectedSDG.title}
                  </h3>
                  <p className="text-sm md:text-base opacity-90">
                    {selectedSDG.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSDG(null)}
                  className="ml-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-[#005792]">
                How BARA Contributes
              </h4>
              <ul className="space-y-3">
                {selectedSDG.connection.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1"
                      style={{ backgroundColor: `${selectedSDG.color}20` }}
                    >
                      <svg
                        className="w-4 h-4"
                        style={{ color: selectedSDG.color }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedSDG(null)}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: selectedSDG.color }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
