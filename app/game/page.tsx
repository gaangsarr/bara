"use client";

import { useState, useEffect } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

interface Answer {
  questionId: number;
  answer: string;
  isCorrect: boolean;
  points: number;
}

interface LeaderboardEntry {
  _id: string;
  rank: number;
  name: string;
  institution: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeElapsed: number;
  completedAt: string;
}

// Database soal quiz
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Siapa saja anggota tim BARA Project?",
    options: [
      "Abdul Akyas S., Rafael Laurent W., Gangsar Anjasmoro",
      "Lintang A., Gangsar Anjasmoro, Aisyah Nur Kusuma W.",
      "Rafael Laurent W., Selvia Ananda Wijaya, Abdul Akyas S.",
      "Gangsar Anjasmoro, Aisyah Nur Kusuma W., Abdul Akyas S.",
    ],
    correctAnswer: "Gangsar Anjasmoro, Aisyah Nur Kusuma W., Abdul Akyas S.",
    points: 10,
  },
  {
    id: 2,
    question: "Apa fungsi utama dari sistem BARA?",
    options: [
      "Mengubah air laut menjadi air bersih",
      "Mengolah limbah industri pabrik di pesisir",
      "Menghasilkan listrik dari pasir",
      "Menyimpan energi matahari",
    ],
    correctAnswer: "Mengubah air laut menjadi air bersih",
    points: 10,
  },
  {
    id: 3,
    question: "Media penyimpanan panas apa yang digunakan BARA?",
    options: ["Air", "Batu bara", "Pasir", "Garam"],
    correctAnswer: "Pasir",
    points: 10,
  },
  {
    id: 4,
    question:
      "BARA berkontribusi pada SDG 7 (Affordable and Clean Energy) melalui cara apa?",
    options: [
      "Menggunakan baterai lithium yang hemat energi",
      "Menggunakan diesel generator hijau",
      "Memanfaatkan energi nuklir bertenaga energi baru terbaruka",
      "Memanfaatkan energi termal dari pasir yang berkelanjutan",
    ],
    correctAnswer: "Memanfaatkan energi termal dari pasir yang berkelanjutan",
    points: 10,
  },
  {
    id: 5,
    question: "Berapa jumlah penduduk miskin di kawasan pesisir Indonesia?",
    options: ["17,74 juta", "10,74 juta", "10,54 juta", "15,74 juta"],
    correctAnswer: "17,74 juta",
    points: 10,
  },
  {
    id: 6,
    question: "BARA mendukung SDG 13 (Climate Action) dengan cara:",
    options: [
      "Menanam pohon di pesisir agar dapat menyerap limbah",
      "Membuat waduk air hujan untuk menghasilkan energi listrik untuk desalinasi",
      "Mengurangi emisi dengan menghilangkan ketergantungan pada energi kotor",
      "Menggunakan panel surya agar dapat menghasilkan panas",
    ],
    correctAnswer:
      "Mengurangi emisi dengan menghilangkan ketergantungan pada energi kotor",
    points: 10,
  },
  {
    id: 7,
    question: "Jenis proses desalinasi apa yang digunakan BARA?",
    options: [
      "Desalinasi Termal",
      "Reverse Osmosis",
      "Desalinasi Bayu",
      "Distilasi Membran",
    ],
    correctAnswer: "Desalinasi Termal",
    points: 10,
  },
  {
    id: 8,
    question:
      "Apa keunggulan utama BARA dibanding pabrik desalinasi konvensional?",
    options: [
      "Lebih cepat prosesnya dengan energi nuklir",
      "Menghilangkan ketergantungan energi kotor dan biaya operasional tinggi",
      "Menghasilkan air lebih banyak agar dapat dimanfaatkan oleh rakyat pesisir",
      "Lebih mudah perawatannya karena bersumber dari energi baru terbarukan",
    ],
    correctAnswer:
      "Menghilangkan ketergantungan energi kotor dan biaya operasional tinggi",
    points: 10,
  },
  {
    id: 9,
    question: "Untuk wilayah mana sistem BARA dirancang?",
    options: [
      "Ketahanan wilayah pegunungan",
      "Ketahanan wilayah perkotaan",
      "Ketahanan wilayah pesisir",
      "Ketahanan wilayah pedesaan",
    ],
    correctAnswer: "Ketahanan wilayah pesisir",
    points: 10,
  },
  {
    id: 10,
    question: "Bagaimana karakteristik operasional sistem BARA?",
    options: [
      "Beroperasi 8 jam per hari",
      "Beroperasi 12 jam per hari",
      "Beroperasi 24/7 berkelanjutan",
      "Beroperasi hanya saat siang hari",
    ],
    correctAnswer: "Beroperasi 24/7 berkelanjutan",
    points: 10,
  },
];

// Helper function untuk format waktu
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function GamePage() {
  const [gameState, setGameState] = useState<
    "home" | "registration" | "playing" | "finished"
  >("home");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Timer states
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/game/leaderboard");
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameState === "playing" && !timerInterval) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    }

    if (gameState !== "playing" && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [gameState]);

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && institution.trim()) {
      setTimeElapsed(0);
      setGameState("playing");
    }
  };

  const handleAnswer = () => {
    if (!selectedOption) return;

    const question = QUESTIONS[currentQuestion];
    const isCorrect = selectedOption === question.correctAnswer;

    const newAnswer: Answer = {
      questionId: question.id,
      answer: selectedOption,
      isCorrect,
      points: isCorrect ? question.points : 0,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption("");

      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishGame(updatedAnswers);
      }
    }, 800);
  };

  const finishGame = async (finalAnswers: Answer[]) => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    setIsSubmitting(true);

    const totalScore = finalAnswers.reduce((sum, ans) => sum + ans.points, 0);
    setFinalScore(totalScore);

    try {
      const response = await fetch("/api/game/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          institution: institution.trim(),
          answers: finalAnswers,
          timeElapsed,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGameState("finished");
        await fetchLeaderboard();
      } else {
        alert("Gagal menyimpan hasil: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting game:", error);
      alert("Terjadi kesalahan saat menyimpan hasil");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetGame = () => {
    setGameState("home");
    setName("");
    setInstitution("");
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption("");
    setFinalScore(0);
    setShowFeedback(false);
    setTimeElapsed(0);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const currentQ = QUESTIONS[currentQuestion];
  const isCorrect = selectedOption === currentQ?.correctAnswer;

  // Get top 3
  const top3 = leaderboard.slice(0, 3);
  const rank1 = top3.find((e) => e.rank === 1);
  const rank2 = top3.find((e) => e.rank === 2);
  const rank3 = top3.find((e) => e.rank === 3);
  const restLeaderboard = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 flex items-center py-6 px-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">
            BARA GAME
          </h1>
          <p className="text-sm text-slate-600">
            Uji pengetahuan Anda tentang BARA Project
          </p>
        </div>

        {/* HOME STATE */}
        {gameState === "home" && (
          <div className="space-y-5">
            {/* Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Leaderboard
                </h2>
                <button
                  onClick={fetchLeaderboard}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
                  title="Refresh"
                >
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>

              {leaderboard.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-slate-400 mb-3">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-sm">
                    Belum ada peserta. Jadilah yang pertama!
                  </p>
                </div>
              ) : (
                <>
                  {/* PODIUM TOP 3 - MOBILE & DESKTOP SAMA (responsive sizing) */}
                  {top3.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-end justify-center gap-2 md:gap-6 px-2 md:px-4">
                        {/* RANK 3 - Kiri (Bronze) */}
                        {rank3 && (
                          <div className="flex flex-col items-center flex-1 max-w-[100px] md:max-w-[180px]">
                            {/* Trophy Icon */}
                            <div className="mb-1 md:mb-2">
                              <svg
                                className="w-6 h-6 md:w-9 md:h-9 text-orange-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2L9 9H2l6 4.5L5 22l7-5.5L19 22l-3-8.5L22 9h-7z" />
                              </svg>
                            </div>
                            {/* Info Card */}
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-md md:rounded-lg p-2 md:p-3 mb-1 md:mb-2 w-full border border-orange-300 md:border-2 shadow-md">
                              <div className="text-[9px] md:text-xs font-black text-orange-600 mb-0.5 md:mb-1">
                                RANK 3
                              </div>
                              <div className="font-bold text-[10px] md:text-sm text-slate-800 truncate">
                                {rank3.name}
                              </div>
                              <div className="text-[8px] md:text-xs text-slate-600 truncate mb-1 md:mb-2">
                                {rank3.institution}
                              </div>
                              <div className="flex items-center justify-between text-[9px] md:text-xs">
                                <span className="font-bold text-orange-700">
                                  {rank3.score}
                                </span>
                                <span className="flex items-center gap-0.5 md:gap-1 text-emerald-600">
                                  <svg
                                    className="w-2 h-2 md:w-3 md:h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {formatTime(rank3.timeElapsed)}
                                </span>
                              </div>
                            </div>
                            {/* Podium SVG */}
                            <svg
                              width="80"
                              height="60"
                              viewBox="0 0 100 80"
                              className="drop-shadow-lg md:w-[110px] md:h-[80px]"
                            >
                              <ellipse
                                cx="50"
                                cy="10"
                                rx="35"
                                ry="8"
                                fill="#fb923c"
                              />
                              <rect
                                x="15"
                                y="10"
                                width="70"
                                height="70"
                                fill="#f97316"
                              />
                              <ellipse
                                cx="50"
                                cy="80"
                                rx="35"
                                ry="8"
                                fill="#ea580c"
                              />
                              <text
                                x="50"
                                y="50"
                                textAnchor="middle"
                                fontSize="28"
                                fontWeight="bold"
                                fill="white"
                              >
                                3
                              </text>
                            </svg>
                          </div>
                        )}

                        {/* RANK 1 - Tengah (Gold) */}
                        {rank1 && (
                          <div className="flex flex-col items-center flex-1 max-w-[100px] md:max-w-[180px]">
                            {/* Crown Icon */}
                            <div className="mb-1 md:mb-2">
                              <svg
                                className="w-7 h-7 md:w-11 md:h-11 text-amber-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3-5-2.6-5 2.6.9-5.3-4-3.9 5.5-.8L10 2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            {/* Info Card */}
                            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-md md:rounded-lg p-2 md:p-3 mb-1 md:mb-2 w-full border border-amber-400 md:border-2 shadow-lg">
                              <div className="text-[9px] md:text-xs font-black text-amber-600 mb-0.5 md:mb-1">
                                RANK 1
                              </div>
                              <div className="font-bold text-[10px] md:text-sm text-slate-800 truncate">
                                {rank1.name}
                              </div>
                              <div className="text-[8px] md:text-xs text-slate-600 truncate mb-1 md:mb-2">
                                {rank1.institution}
                              </div>
                              <div className="flex items-center justify-between text-[9px] md:text-xs">
                                <span className="font-bold text-amber-700">
                                  {rank1.score}
                                </span>
                                <span className="flex items-center gap-0.5 md:gap-1 text-emerald-600">
                                  <svg
                                    className="w-2 h-2 md:w-3 md:h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {formatTime(rank1.timeElapsed)}
                                </span>
                              </div>
                            </div>
                            {/* Podium SVG - TALLEST */}
                            <svg
                              width="80"
                              height="75"
                              viewBox="0 0 100 100"
                              className="drop-shadow-xl md:w-[110px] md:h-[100px]"
                            >
                              <ellipse
                                cx="50"
                                cy="10"
                                rx="35"
                                ry="8"
                                fill="#fbbf24"
                              />
                              <rect
                                x="15"
                                y="10"
                                width="70"
                                height="90"
                                fill="#f59e0b"
                              />
                              <ellipse
                                cx="50"
                                cy="100"
                                rx="35"
                                ry="8"
                                fill="#d97706"
                              />
                              <text
                                x="50"
                                y="60"
                                textAnchor="middle"
                                fontSize="32"
                                fontWeight="bold"
                                fill="white"
                              >
                                1
                              </text>
                            </svg>
                          </div>
                        )}

                        {/* RANK 2 - Kanan (Silver) */}
                        {rank2 && (
                          <div className="flex flex-col items-center flex-1 max-w-[100px] md:max-w-[180px]">
                            {/* Trophy Icon */}
                            <div className="mb-1 md:mb-2">
                              <svg
                                className="w-6 h-6 md:w-9 md:h-9 text-slate-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2L9 9H2l6 4.5L5 22l7-5.5L19 22l-3-8.5L22 9h-7z" />
                              </svg>
                            </div>
                            {/* Info Card */}
                            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-md md:rounded-lg p-2 md:p-3 mb-1 md:mb-2 w-full border border-slate-300 md:border-2 shadow-md">
                              <div className="text-[9px] md:text-xs font-black text-slate-600 mb-0.5 md:mb-1">
                                RANK 2
                              </div>
                              <div className="font-bold text-[10px] md:text-sm text-slate-800 truncate">
                                {rank2.name}
                              </div>
                              <div className="text-[8px] md:text-xs text-slate-600 truncate mb-1 md:mb-2">
                                {rank2.institution}
                              </div>
                              <div className="flex items-center justify-between text-[9px] md:text-xs">
                                <span className="font-bold text-slate-700">
                                  {rank2.score}
                                </span>
                                <span className="flex items-center gap-0.5 md:gap-1 text-emerald-600">
                                  <svg
                                    className="w-2 h-2 md:w-3 md:h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {formatTime(rank2.timeElapsed)}
                                </span>
                              </div>
                            </div>
                            {/* Podium SVG - MEDIUM */}
                            <svg
                              width="80"
                              height="68"
                              viewBox="0 0 100 90"
                              className="drop-shadow-lg md:w-[110px] md:h-[90px]"
                            >
                              <ellipse
                                cx="50"
                                cy="10"
                                rx="35"
                                ry="8"
                                fill="#cbd5e1"
                              />
                              <rect
                                x="15"
                                y="10"
                                width="70"
                                height="80"
                                fill="#94a3b8"
                              />
                              <ellipse
                                cx="50"
                                cy="90"
                                rx="35"
                                ry="8"
                                fill="#64748b"
                              />
                              <text
                                x="50"
                                y="55"
                                textAnchor="middle"
                                fontSize="28"
                                fontWeight="bold"
                                fill="white"
                              >
                                2
                              </text>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* REST OF LEADERBOARD */}
                  {restLeaderboard.length > 0 && (
                    <div className="space-y-2.5 max-h-[35vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                      {restLeaderboard.map((entry) => (
                        <div
                          key={entry._id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm text-sm bg-slate-300 text-slate-700">
                            #{entry.rank}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm text-slate-800 truncate">
                              {entry.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {entry.institution}
                            </div>
                          </div>

                          <div className="flex-shrink-0 text-right">
                            <div className="font-black text-lg text-[#005792]">
                              {entry.score}
                            </div>
                            <div className="text-xs text-slate-500">
                              {entry.correctAnswers}/
                              {entry.correctAnswers + entry.wrongAnswers}
                            </div>
                            <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {formatTime(entry.timeElapsed)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {leaderboard.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Menampilkan {leaderboard.length} peserta • Update setiap 5
                    detik
                  </p>
                </div>
              )}
            </div>

            {/* Start Button */}
            <button
              onClick={() => setGameState("registration")}
              className="w-full bg-[#005792] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#004170] transition-colors shadow-lg"
            >
              Mulai Quiz Sekarang
            </button>

            {/* Info */}
            <div className="bg-[#e6f4fb] border border-[#00a3e0]/30 rounded-lg p-4">
              <h3 className="font-bold text-[#005792] mb-2 text-sm">
                Informasi Quiz:
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#00a3e0] font-bold">•</span>
                  <span>Total {QUESTIONS.length} pertanyaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00a3e0] font-bold">•</span>
                  <span>Setiap jawaban benar: {QUESTIONS[0].points} poin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00a3e0] font-bold">•</span>
                  <span>Waktu tercatat dari mulai hingga selesai</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00a3e0] font-bold">•</span>
                  <span>Ranking: Skor tertinggi + Waktu tercepat</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* REGISTRATION FORM */}
        {gameState === "registration" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                Data Peserta
              </h2>
              <p className="text-slate-600 text-sm">
                Masukkan data Anda untuk memulai
              </p>
            </div>

            <form onSubmit={handleStartGame} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00a3e0] focus:border-[#00a3e0] transition-all outline-none text-slate-800"
                  placeholder="Masukkan nama lengkap"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Asal Institusi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#00a3e0] focus:border-[#00a3e0] transition-all outline-none text-slate-800"
                  placeholder="Contoh: SMK Negeri Hawkins"
                  required
                  maxLength={150}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setGameState("home")}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#005792] text-white py-3 rounded-lg font-semibold hover:bg-[#004170] transition-colors shadow-md"
                >
                  Mulai Quiz
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PLAYING STATE */}
        {gameState === "playing" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            {/* Progress & Timer */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-600">
                  Soal {currentQuestion + 1}/{QUESTIONS.length}
                </span>
                <div className="flex items-center gap-3">
                  {/* Timer Display */}
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formatTime(timeElapsed)}
                  </span>
                  <span className="text-sm font-bold text-[#005792] bg-[#e6f4fb] px-3 py-1 rounded-full border border-[#00a3e0]">
                    {currentQ.points} Poin
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#00a3e0] h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / QUESTIONS.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-5">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5 mb-5">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedOption === option;

                return (
                  <button
                    key={index}
                    onClick={() => !showFeedback && setSelectedOption(option)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-[#00a3e0] bg-[#e6f4fb]"
                        : "border-slate-200 hover:border-[#00a3e0]/50 hover:bg-slate-50"
                    } ${
                      showFeedback
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isSelected
                            ? "bg-[#005792] text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 font-medium text-slate-700 text-sm">
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className={`mb-5 p-3 rounded-lg text-center font-semibold text-sm ${
                  isCorrect
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {isCorrect
                  ? `Benar! +${currentQ.points} poin`
                  : "Jawaban Salah"}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleAnswer}
              disabled={!selectedOption || showFeedback || isSubmitting}
              className="w-full bg-[#005792] text-white py-4 rounded-lg font-semibold hover:bg-[#004170] transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed shadow-md"
            >
              {isSubmitting
                ? "Menyimpan..."
                : currentQuestion < QUESTIONS.length - 1
                ? "Lanjut"
                : "Selesai"}
            </button>
          </div>
        )}

        {/* FINISHED STATE */}
        {gameState === "finished" && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-slate-200">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                Quiz Selesai!
              </h2>
              <p className="text-slate-600">
                Terima kasih <strong className="text-slate-800">{name}</strong>
              </p>
              <p className="text-slate-500 text-sm">dari {institution}</p>
            </div>

            {/* Score Display */}
            <div className="bg-gradient-to-br from-[#e6f4fb] to-sky-50 rounded-xl p-6 mb-6 border-2 border-[#00a3e0]">
              <div className="text-6xl font-black text-[#005792] mb-2">
                {finalScore}
              </div>
              <div className="text-slate-600 font-semibold mb-3">
                Total Skor Anda
              </div>

              {/* Tampilkan waktu final */}
              <div className="text-2xl font-bold text-emerald-600 mb-5 flex items-center justify-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Waktu: {formatTime(timeElapsed)}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {answers.filter((a) => a.isCorrect).length}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    Benar
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {answers.filter((a) => !a.isCorrect).length}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    Salah
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-[#005792] text-white py-4 rounded-lg font-semibold hover:bg-[#004170] transition-colors shadow-md"
            >
              Kembali ke Home
            </button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
