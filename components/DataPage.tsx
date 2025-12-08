"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BarraInnovationData = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Real data dari Polar Night Energy
  const data = {
    overview: {
      title: "Integrated Coastal Sand Battery System",
      stats: [
        {
          label: "Kapasitas PLTS + PLTB",
          value: "5 MW",
          power: "3 MW angin + 2 MW surya",
        },
        {
          label: "Kapasitas Sand Battery",
          value: "8 MWh",
          power: "Berbasis panas 500–600°C",
        },
        {
          label: "Daya ke Desalinasi",
          value: "4 MW",
          power: "Dari sand battery + langsung dari PLTS/PLTB",
        },
        {
          label: "Target Layanan",
          value: "150+ bangunan",
          power: "Pemukiman & fasilitas pesisir",
        },
      ],
    },
    capacity: {
      title: "Kapasitas Energi di Sistem Pesisir",
      datasets: {
        "Kapasitas sand battery (MWh)": [4, 8, 20, 50],
      },
    },

    performance: {
      title: "Performa Sand Battery",
      // Pola mengikuti karakteristik sand battery: suhu tinggi, efisiensi stabil [web:66][web:84]
      datasets: {
        "Efisiensi siklus (%)": [85, 88, 90, 89, 90, 91, 90],
        "Suhu penyimpanan (°C)": [520, 540, 560, 580, 590, 600, 580],
        "Durasi simpan (hari)": [1, 3, 7, 14, 21, 30, 45], // lama panas masih berguna
      },
    },
    savings: {
      title: "Dampak untuk Daerah Pesisir",
      // Terinspirasi studi desalinasi bertenaga terbarukan: penurunan emisi & biaya [web:87][web:90][web:95]
      datasets: {
        "Pengurangan emisi CO₂ (%)": [40, 50, 60, 70, 75, 78, 80],
        "Pengurangan diesel untuk genset (%)": [50, 60, 70, 80, 85, 88, 90],
        "Peningkatan ketersediaan air (%)": [30, 45, 60, 75, 85, 90, 95],
      },
    },
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-biru-tua mb-4">
            Sand Battery Simulation
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 -mx-1.5">
          {Object.keys(data).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab as keyof typeof data)}
              className={`px-8 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm ${
                activeTab === tab
                  ? "bg-biru-muda text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === "overview" && "Projects"}
              {tab === "capacity" && "Capacity"}
              {tab === "performance" && "Performance"}
              {tab === "savings" && "Impact"}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {activeTab === "overview" && <OverviewTab data={data.overview} />}
            {activeTab === "capacity" && (
              <ChartTab
                title={data.capacity.title}
                datasets={data.capacity.datasets}
                type="bar"
              />
            )}
            {activeTab === "performance" && (
              <ChartTab
                title={data.performance.title}
                datasets={data.performance.datasets}
                type="line"
              />
            )}
            {activeTab === "savings" && (
              <ChartTab
                title={data.savings.title}
                datasets={data.savings.datasets}
                type="line"
              />
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Overview Stats Cards
const OverviewTab = ({ data }: { data: any }) => (
  <div className="p-8">
    <div className="grid md:grid-cols-2 gap-6">
      {data.stats.map((stat: any, i: number) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group p-6 border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all duration-200 bg-gray-50/50"
        >
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-1">
            {stat.label}
          </div>
          {stat.power && (
            <div className="text-xs text-gray-500">{stat.power}</div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

// Chart Component - WARNA BERBEDA per dataset & LABEL SESUAI DATA
const ChartTab = ({
  title,
  datasets,
  type,
}: {
  title: string;
  datasets: any;
  type: "bar" | "line";
}) => {
  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f0f0f0" },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          padding: 20,
          font: { size: 12 },
          usePointStyle: true,
        },
      },
    },
  };

  const colorPalette = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
  ];

  // ✅ labels bar & line dipisah logika
  const labels =
    type === "bar"
      ? [
          "Skenario awal",
          "Desa pesisir menengah",
          "Kota pesisir kecil",
          "Kluster pesisir besar",
        ]
      : [
          "Titik 1",
          "Titik 2",
          "Titik 3",
          "Titik 4",
          "Titik 5",
          "Titik 6",
          "Titik 7",
        ];

  let chartData: any;

  if (type === "bar") {
    // ✅ capacity: 1 dataset dengan 4 nilai
    const [key, values] = Object.entries(datasets)[0] as [string, any];

    chartData = {
      labels,
      datasets: [
        {
          label: key,
          data: values,
          borderColor: colorPalette[0],
          backgroundColor: colorPalette[0] + "33", // ~20% opacity
          barPercentage: 0.8,
          categoryPercentage: 0.9,
        },
      ],
    };
  } else {
    // ✅ line charts (performance & savings) tetap multi-dataset
    chartData = {
      labels,
      datasets: Object.entries(datasets).map(
        ([key, values]: [string, any], index: number) => {
          const color = colorPalette[index % colorPalette.length];

          const hexToRgba = (hex: string, alpha: number) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          };

          return {
            label: key,
            data: values,
            borderColor: color,
            backgroundColor: hexToRgba(color, 0.1),
            tension: 0.4,
            fill: true,
          };
        }
      ),
    };
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">
          Simulasi kinerja sistem energi terbarukan–sand battery–desalinasi di
          wilayah pesisir.
        </p>
      </div>

      <div className="h-80 lg:h-96 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
        {type === "bar" ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default BarraInnovationData;
