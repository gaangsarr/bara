// app/components/FactInnovation.tsx
"use client";

import {
  Droplets,
  Wind,
  Sun,
  Battery,
  Waves,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Users,
  Leaf,
  Zap,
  ExternalLink,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fakta - Bara Project",
  description: "Fakta Bara Project",
  alternates: {
    canonical: "https://baraproject.site/about",
  },
};

// ============================================
// DATA SECTION - Mudah diubah
// ============================================
const SOURCES = {
  "1": {
    id: "1",
    title: "Kala Masyarakat Pesisir Riau Krisis Air Bersih",
    url: "https://mongabay.co.id/2024/03/10/kala-masyarakat-pesisir-riau-krisis-air-bersih-apa-upaya-pemerintah/",
    publisher: "Mongabay Indonesia",
    year: "2024",
  },
  "2": {
    id: "2",
    title:
      "FITRA Dorong Pemerintah Selesaikan Persoalan Air Bersih di Kawasan Pesisir",
    url: "https://www.tempo.co/ekonomi/fitra-dorong-pemerintah-selesaikan-persoalan-air-bersih-di-kawasan-pesisir-56046",
    publisher: "Tempo.co",
    year: "2024",
  },
  "3": {
    id: "3",
    title: "Mencari Cara Atasi Krisis Air Bersih Pulau-pulau Kecil di Lombok",
    url: "https://mongabay.co.id/2019/05/20/mencari-cara-atasi-krisis-air-bersih-pulau-pulau-kecil-di-lombok/",
    publisher: "Mongabay Indonesia",
    year: "2019",
  },
  "4": {
    id: "4",
    title: "Potret Krisis Air Bersih di Pesisir Tawabi",
    url: "https://www.dompetdhuafa.org/potret-krisis-air-bersih-di-pesisir-tawabi/",
    publisher: "Dompet Dhuafa",
    year: "2024",
  },
  "5": {
    id: "5",
    title: "Warga Pesisir Masih Kesulitan Akses Air Bersih",
    url: "https://mongabay.co.id/2017/03/24/warga-pesisir-masih-kesulitan-akses-air-bersih-kenapa-masih-terjadi/",
    publisher: "Mongabay Indonesia",
    year: "2017",
  },
  "11": {
    id: "11",
    title: "Mengenal Lebih Dekat Pembangkit Listrik Tenaga Bayu (PLTB)",
    url: "https://transisienergi.id/mengenal-lebih-dekat-pembangkit-listrik-tenaga-bayu-pltb/",
    publisher: "Transisi Energi",
    year: "2024",
  },
  "15": {
    id: "15",
    title: "Dari Potensi, Isu, dan Regulasi PLTS Fotovoltaik di Indonesia",
    url: "https://www.hukumonline.com/berita/a/dari-potensi--isu--dan-regulasi-plts-fotovoltaik-di-indonesia-lt64777d086d172/",
    publisher: "Hukum Online",
    year: "2023",
  },
  "18": {
    id: "18",
    title: "Energi Surya Indonesia",
    url: "https://renewableenergy.id/energi-surya/",
    publisher: "Renewable Energy Indonesia",
    year: "2025",
  },
  "13": {
    id: "13",
    title: "Rancang Bangun Thermal Energy Storage Menggunakan Pasir",
    url: "https://repositori.usu.ac.id/handle/123456789/95306",
    publisher: "Universitas Sumatera Utara Repository",
    year: "2023",
  },
  "45": {
    id: "45",
    title: "90% Efficient Thermal Energy Storage",
    url: "https://www.solarpaces.org",
    publisher: "SolarPACES",
    year: "2024",
  },
  "23": {
    id: "23",
    title: "Review Teknologi Desalinasi yang Dikopling",
    url: "https://ejournal.brin.go.id/MIPI/article/download/1562/945/4991",
    publisher: "BRIN E-Journal",
    year: "2023",
  },
  "26": {
    id: "26",
    title: "Uraian Umum Tentang Teknologi Desalinasi",
    url: "https://media.neliti.com/media/publications/139645-ID-none.pdf",
    publisher: "Neliti",
    year: "2022",
  },
  "37": {
    id: "37",
    title: "Optimalisasi PLTS-PLTB untuk Kelistrikan Berkelanjutan",
    url: "https://journal.aritekin.or.id/index.php/Konstruksi/article/download/854/1114/4805",
    publisher: "Journal Aritekin",
    year: "2024",
  },
};

const FACTS_DATA = {
  problem: [
    {
      id: "crisis",
      icon: AlertTriangle,
      title: "Krisis Air Tawar di Pesisir",
      description:
        "Lebih dari 8 juta perempuan dari 17,74 juta penduduk miskin di kawasan pesisir Indonesia rentan terhadap penyakit akibat kurangnya akses air bersih.",
      stats: [
        {
          label: "Penduduk Terdampak",
          value: "17.74 Juta",
          source: [],
        },
        {
          label: "Biaya Air/Hari (Jakarta Utara)",
          value: "Rp 10.000",
          source: [],
        },
      ],
      sources: ["1", "2", "5"],
    },
    {
      id: "cost",
      icon: TrendingUp,
      title: "Beban Ekonomi Tinggi",
      description:
        "Masyarakat pesisir harus membeli air dengan harga mahal. Di Jakarta Utara, keluarga nelayan bayar Rp10.000 per 100 liter padahal pendapatan hanya Rp25.000/hari.",
      stats: [
        {
          label: "Biaya Bulanan (Lombok)",
          value: "Rp 250-400K",
          source: [],
        },
        {
          label: "Pendapatan Harian Nelayan",
          value: "Rp 25.000",
          source: [],
        },
      ],
      sources: ["2", "3", "5"],
    },
    {
      id: "health",
      icon: Users,
      title: "Dampak Kesehatan",
      description:
        "Penyakit kulit, diare, demam berdarah, dan TB paru menyerang masyarakat pesisir akibat kondisi sanitasi buruk dan air tidak layak konsumsi.",
      sources: ["2", "4"],
    },
  ],
  solution: [
    {
      id: "wind",
      icon: Wind,
      title: "Energi Bayu (PLTB)",
      description:
        "Potensi energi bayu onshore Indonesia mencapai 60.647 MW. Wilayah pesisir memiliki kecepatan angin konsisten >6 m/s, ideal untuk pembangkit listrik.",
      stats: [
        { label: "Potensi Nasional", value: "60.647 MW", source: [] },
        { label: "Kecepatan Angin Pesisir", value: ">6 m/s", source: [] },
      ],
      sources: ["11"],
    },
    {
      id: "solar",
      icon: Sun,
      title: "Energi Surya (PLTS)",
      description:
        "Indonesia memiliki potensi energi surya 207.898 MWp dengan radiasi matahari rata-rata 4,8 kWh/m² per hari. Tersedia sepanjang tahun di garis khatulistiwa.",
      stats: [
        {
          label: "Potensi Nasional",
          value: "207.898 MWp",
          source: [],
        },
        { label: "Radiasi Harian", value: "4.8 kWh/m²", source: [] },
      ],
      sources: ["15", "18"],
    },
    {
      id: "battery",
      icon: Battery,
      title: "Baterai Pasir (Thermal Storage)",
      description:
        "Teknologi thermal energy storage menggunakan pasir silika lokal. Mampu menyimpan panas berbulan-bulan dengan efisiensi >90% tanpa kehilangan energi signifikan.",
      stats: [
        { label: "Efisiensi", value: ">90%", source: [] },
        {
          label: "Durasi Penyimpanan",
          value: "Berbulan-bulan",
          source: [],
        },
      ],
      sources: ["13", "45"],
    },
    {
      id: "desalination",
      icon: Droplets,
      title: "Desalinasi Termal",
      description:
        "Sistem Multi-Stage Flash (MSF) memanfaatkan panas dari baterai pasir untuk mengubah air laut menjadi air tawar berkualitas tinggi (TDS <10 ppm).",
      stats: [
        { label: "Kualitas Air (TDS)", value: "<10 ppm", source: [] },
        { label: "Metode", value: "MSF Distillation", source: [] },
      ],
      sources: ["23", "26"],
    },
  ],
  tech: [
    {
      step: "01",
      title: "Pembangkitan Energi",
      description:
        "PLTB dan PLTS menghasilkan energi listrik dari angin dan matahari",
      icon: Zap,
      sources: ["11", "18", "37"],
    },
    {
      step: "02",
      title: "Konversi ke Panas",
      description:
        "Energi listrik dikonversi menjadi energi panas melalui elemen pemanas",
      icon: Sun,
      sources: ["13"],
    },
    {
      step: "03",
      title: "Penyimpanan Energi",
      description:
        "Energi panas disimpan dalam baterai pasir dengan kapasitas jangka panjang",
      icon: Battery,
      sources: ["13", "45"],
    },
    {
      step: "04",
      title: "Desalinasi Air Laut",
      description:
        "Panas dialirkan ke sistem MSF untuk mengubah air laut menjadi air tawar",
      icon: Waves,
      sources: ["23", "26"],
    },
    {
      step: "05",
      title: "Distribusi Air Minum",
      description:
        "Air tawar berkualitas tinggi siap untuk konsumsi masyarakat",
      icon: Droplets,
      sources: ["23"],
    },
  ],
  impact: {
    metrics: [
      {
        metric: "8+ Juta",
        label: "Penduduk Pesisir Terbantu",
        sources: [],
      },
      { metric: "90%", label: "Efisiensi Penyimpanan Energi", sources: [] },
      { metric: "<10 ppm", label: "Kualitas Air (TDS)", sources: [] },
      { metric: "0", label: "Emisi Karbon", sources: [] },
    ],
    social: {
      title: "Dampak Sosial",
      icon: Users,
      color: "blue",
      items: [
        "Akses air minum berkualitas tinggi dengan biaya terjangkau",
        "Peningkatan kesehatan masyarakat pesisir",
        "Kemerdekaan energi dan air dari sistem pusat",
        "Pemberdayaan ekonomi masyarakat lokal",
      ],
      sources: ["1", "2", "5", "37"],
    },
    environment: {
      title: "Dampak Lingkungan",
      icon: Leaf,
      color: "green",
      items: [
        "Zero emisi karbon dari seluruh proses",
        "Kontribusi pada SDG 6 (Air Bersih) dan SDG 7 (Energi Bersih)",
        "Penggunaan material lokal dan ramah lingkungan",
        "Model berkelanjutan untuk pulau-pulau terpencil",
      ],
      sources: ["18", "37"],
    },
  },
};

// ============================================
// COMPONENTS
// ============================================
// ============================================
// COMPONENTS
// ============================================
export default function FactInnovation() {
  const [activeTab, setActiveTab] = useState<
    "problem" | "solution" | "tech" | "impact"
  >("problem");
  const [showAllReferences, setShowAllReferences] = useState(false);

  const tabs = [
    { id: "problem", label: "Masalah", icon: AlertTriangle },
    { id: "solution", label: "Solusi", icon: Lightbulb },
    { id: "tech", label: "Teknologi", icon: Zap },
    { id: "impact", label: "Dampak", icon: TrendingUp },
  ];

  const renderSourceBadges = (sourceIds: string[]) => (
    <div className="flex flex-wrap gap-1">
      {sourceIds.map((id) => (
        <a
          key={id}
          href={SOURCES[id as keyof typeof SOURCES]?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs rounded transition-colors"
          title={SOURCES[id as keyof typeof SOURCES]?.title}
        >
          <BookOpen className="w-3 h-3" />[{id}]
        </a>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12" id="fact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mt-20 text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-biru-tua mb-4">
            Fakta Tentang BARA
          </h1>
          <p className="text-center text-gray-600 mb-8 md:mb-12">
            Informasi lebih lanjut mengenai Inovasi Bara
          </p>
        </div>

        {/* Tab Navigation - Semua Device */}
        <div className="mb-12">
          {/* Desktop Version */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-8 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm ${
                    activeTab === tab.id
                      ? "bg-[#005792] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Version */}
          <div className="md:hidden grid grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-all shadow-sm ${
                    activeTab === tab.id
                      ? "bg-[#005792] text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-tight">
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {activeTab === "problem" && (
              <ProblemTab
                data={FACTS_DATA.problem}
                renderSourceBadges={renderSourceBadges}
              />
            )}
            {activeTab === "solution" && (
              <SolutionTab
                data={FACTS_DATA.solution}
                renderSourceBadges={renderSourceBadges}
              />
            )}
            {activeTab === "tech" && (
              <TechTab
                data={FACTS_DATA.tech}
                renderSourceBadges={renderSourceBadges}
              />
            )}
            {activeTab === "impact" && (
              <ImpactTab
                data={FACTS_DATA.impact}
                renderSourceBadges={renderSourceBadges}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* References Section */}
        <div className="mt-16 pt-8 border-t-2 border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Daftar Referensi
            </h2>
            {/* Toggle Button - Mobile Only */}
            <button
              onClick={() => setShowAllReferences(!showAllReferences)}
              className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-[#005792] text-white rounded-lg text-sm font-medium hover:bg-[#004570] transition-colors"
            >
              {showAllReferences ? (
                <>
                  Sembunyikan
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Lihat ({Object.keys(SOURCES).length})
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Desktop - Always Show All */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(SOURCES).map((source) => (
              <ReferenceCard key={source.id} source={source} />
            ))}
          </div>

          {/* Mobile - Collapsible */}
          {/* Mobile - Alternative with Max-Height */}
          <div className="md:hidden">
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showAllReferences
                  ? "max-h-[5000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3 pb-4">
                {Object.values(SOURCES).map((source) => (
                  <ReferenceCard key={source.id} source={source} />
                ))}
              </div>
            </div>

            {!showAllReferences && (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm mb-1 font-medium">
                  {Object.keys(SOURCES).length} Referensi Tersedia
                </p>
                <p className="text-gray-500 text-xs">
                  Klik "Lihat" untuk melihat daftar lengkap
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reference Card Component - IMPROVED
const ReferenceCard = ({ source }: { source: any }) => (
  <a
    href={source.url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-50 hover:bg-gray-100 rounded-xl p-3 md:p-4 border border-gray-200 hover:border-[#005792] transition-all group block"
  >
    <div className="flex items-start gap-2 md:gap-3">
      <span className="text-xs md:text-sm font-bold text-[#005792] shrink-0 mt-0.5">
        [{source.id}]
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#005792] line-clamp-2 leading-snug">
          {source.title}
        </h4>
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-gray-500">
          <span className="truncate">{source.publisher}</span>
          <span>•</span>
          <span className="shrink-0">{source.year}</span>
        </div>
      </div>
      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-[#005792] shrink-0 mt-1" />
    </div>
  </a>
);

// Problem Tab
const ProblemTab = ({ data, renderSourceBadges }: any) => (
  <div className="p-6 md:p-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Masalah yang Dihadapi Masyarakat Pesisir
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((fact: any, i: number) => {
        const Icon = fact.icon;
        return (
          <motion.div
            key={fact.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all duration-200 bg-gray-50/50"
          >
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {fact.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {fact.description}
            </p>
            {fact.stats && (
              <div className="space-y-3 pt-4 border-t border-gray-100">
                {fact.stats.map((stat: any, j: number) => (
                  <div key={j} className="bg-white rounded p-3">
                    <div className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {stat.label}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {stat.source.map((src: string) => (
                        <span key={src} className="text-xs text-biru-muda">
                          [{src}]
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-3 border-t border-gray-100 mt-3">
              <div className="text-xs text-gray-500 mb-1">Sumber:</div>
              {renderSourceBadges(fact.sources)}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

// Solution Tab
const SolutionTab = ({ data, renderSourceBadges }: any) => (
  <div className="p-6 md:p-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Komponen Solusi BARA
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((fact: any, i: number) => {
        const Icon = fact.icon;
        return (
          <motion.div
            key={fact.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all duration-200 bg-gray-50/50"
          >
            <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 mb-4">
              <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {fact.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {fact.description}
            </p>
            {fact.stats && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                {fact.stats.map((stat: any, j: number) => (
                  <div key={j} className="bg-white rounded-lg p-3">
                    <div className="text-xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      {stat.label}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {stat.source.map((src: string) => (
                        <span key={src} className="text-xs text-biru-muda">
                          [{src}]
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-3 border-t border-gray-100 mt-4">
              <div className="text-xs text-gray-500 mb-1">Sumber:</div>
              {renderSourceBadges(fact.sources)}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

// Tech Tab
const TechTab = ({ data, renderSourceBadges }: any) => (
  <div className="p-6 md:p-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
      Alur Proses Teknologi BARA
    </h2>
    <p className="text-sm text-gray-600 mb-8">
      Proses terintegrasi dari pembangkitan energi hingga distribusi air minum
    </p>
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Connection Line - Desktop */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {data.map((process: any, index: number) => {
          const Icon = process.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex gap-3 mb-6 last:mb-0"
            >
              {/* Step Number & Icon - Mobile */}
              <div className="lg:hidden flex flex-col items-center gap-2 shrink-0">
                <div className="w-10 h-10 rounded-lg bg-[#005792] text-white flex items-center justify-center font-bold text-sm">
                  {process.step}
                </div>
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Step Number - Desktop */}
              <div className="hidden lg:flex w-16 h-16 rounded-full bg-[#005792] text-white items-center justify-center font-bold text-xl z-10 shrink-0">
                {process.step}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-gray-50/50 rounded-xl p-4 md:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all min-w-0">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {process.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {process.description}
                    </p>
                    <div className="text-xs text-gray-500 mb-1">Sumber:</div>
                    {renderSourceBadges(process.sources)}
                  </div>
                  <div className="hidden lg:block text-gray-700 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

// Impact Tab
const ImpactTab = ({ data, renderSourceBadges }: any) => (
  <div className="p-6 md:p-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Dampak & Pencapaian
    </h2>

    {/* Metrics */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {data.metrics.map((impact: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-gray-50/50 rounded-xl p-4 md:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
        >
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="text-3xl md:text-4xl font-bold text-biru-muda mb-2">
              {impact.metric}
            </div>
            <div className="text-xs md:text-sm text-gray-600 mb-2 leading-tight">
              {impact.label}
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {impact.sources.map((src: string) => (
                <span key={src} className="text-xs text-gray-500">
                  [{src}]
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Impact Details */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[data.social, data.environment].map((category: any, i: number) => {
        const Icon = category.icon;
        const colorClass =
          category.color === "blue" ? "bg-[#005792]" : "bg-[#007850]";
        const checkColor =
          category.color === "blue" ? "text-biru-muda" : "text-[#007850]";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50/50 rounded-xl p-6 md:p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${colorClass} text-white flex items-center justify-center shrink-0`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {category.title}
              </h3>
            </div>
            <ul className="space-y-3 mb-4">
              {category.items.map((item: string, j: number) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 ${checkColor} shrink-0 mt-0.5`}
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-1">Sumber:</div>
              {renderSourceBadges(category.sources)}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);
