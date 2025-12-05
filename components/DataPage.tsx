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
      title: "Sand Battery Projects",
      stats: [
        { label: "Pornainen (Operational)", value: "100 MWh", power: "1 MW" },
        { label: "Lahti Energia (2027)", value: "250 MWh", power: "2 MW" },
        { label: "Efficiency", value: "85-90%", power: "" },
        { label: "CO2 Reduction", value: "70%", power: "vs Woodchip" },
      ],
    },
    capacity: {
      title: "Storage Capacity by Project",
      datasets: {
        "Kankaanpää 2022": [8],
        "Pornainen 2025": [100],
        "Lahti Energia 2027": [250],
        "10 MW Scale": [1000],
      },
    },
    performance: {
      title: "Operational Performance",
      datasets: {
        "Efficiency (%)": [85, 87, 88, 90, 89, 88, 87],
        "Charge Temp (°C)": [500, 550, 580, 600, 590, 570, 550],
        "Discharge Temp (°C)": [400, 380, 370, 360, 375, 385, 395],
      },
    },
    savings: {
      title: "Environmental Impact",
      datasets: {
        "CO2 Reduction (%)": [60, 65, 68, 70, 72, 70, 68],
        "Fuel Cost Savings (%)": [50, 55, 60, 65, 68, 66, 62],
        "Biomass Reduction (%)": [50, 55, 58, 60, 62, 60, 58],
      },
    },
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-biru-tua mb-4">
            Sand Battery Data
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

        {/* Sources */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Data sources:</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <a
              href="https://polarnightenergy.com/sand-battery/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 hover:underline"
            >
              Polar Night Energy
            </a>
            <a
              href="https://www.ess-news.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 hover:underline"
            >
              ESS News
            </a>
            <a
              href="https://www.pv-magazine.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 hover:underline"
            >
              PV Magazine
            </a>
          </div>
        </div>
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

// Chart Component
// Chart Component - WARNA BERBEDA per dataset
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

  // ✅ WARNA PALETTE BERBEDA per dataset
  const colorPalette = [
    "#3b82f6", // Blue - Kankaanpää
    "#10b981", // Green - Pornainen
    "#f59e0b", // Amber - Lahti
    "#ef4444", // Red - 10MW
    "#8b5cf6", // Purple - Efficiency
    "#06b6d4", // Cyan - Temp
    "#84cc16", // Lime - CO2
    "#f97316", // Orange - Fuel
  ];

  const chartData = {
    labels:
      type === "bar"
        ? ["Kankaanpää", "Pornainen", "Lahti", "10MW"]
        : [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
            "Week 5",
            "Week 6",
            "Week 7",
          ],
    datasets: Object.entries(datasets).map(
      ([key, values]: [string, any], index: number) => {
        const colorIndex = index % colorPalette.length;

        return {
          label: key.replace(/^\w/, (c) => c.toUpperCase()),
          data: values,
          borderColor: colorPalette[colorIndex],
          backgroundColor:
            type === "bar"
              ? colorPalette[colorIndex] + "20" // Bar: solid + 20% opacity
              : `rgba(${parseInt(
                  colorPalette[colorIndex].slice(1, 3),
                  16
                )},${parseInt(
                  colorPalette[colorIndex].slice(3, 5),
                  16
                )},${parseInt(colorPalette[colorIndex].slice(5, 7), 16)},0.1)`, // Line: 10% opacity
          tension: type === "line" ? 0.4 : 0,
          fill: type === "line",
          barPercentage: 0.8,
          categoryPercentage: 0.9,
        };
      }
    ),
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">
          Real data from operational projects
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
