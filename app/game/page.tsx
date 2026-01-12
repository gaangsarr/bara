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
  completedAt: string;
}

// Database soal quiz
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Siapa saja anggota tim BARA Project?",
    options: [
      "Abdul Akyas S., Rafael Laurent W., Gangsar Anjasmoro",
      "Gangsar Anjasmoro, Aisyah Nur Kusuma W., Abdul Akyas S.",
      "Lintang A., Gangsar Anjasmoro, Aisyah Nur Kusuma W.",
      "Rafael Laurent W., Selvia Ananda Wijaya, Abdul Akyas S.",
    ],
    correctAnswer: "Gangsar Anjasmoro, Aisyah Nur Kusuma W., Abdul Akyas S.",
    points: 10,
  },
  {
    id: 2,
    question: "Apa fungsi utama dari sistem BARA?",
    options: [
      "Menghasilkan listrik dari pasir",
      "Mengubah air laut menjadi air bersih",
      "Menyimpan energi matahari",
      "Mengolah limbah industri",
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
      "Menggunakan baterai lithium",
      "Memanfaatkan energi termal dari pasir yang berkelanjutan",
      "Menggunakan diesel generator",
      "Memanfaatkan energi nuklir",
    ],
    correctAnswer: "Memanfaatkan energi termal dari pasir yang berkelanjutan",
    points: 10,
  },
  {
    id: 5,
    question: "Berapa jumlah penduduk miskin di kawasan pesisir Indonesia?",
    options: ["5,74 juta", "10,74 juta", "17,74 juta", "25,74 juta"],
    correctAnswer: "17,74 juta",
    points: 10,
  },
  {
    id: 6,
    question: "BARA mendukung SDG 13 (Climate Action) dengan cara:",
    options: [
      "Menanam pohon di pesisir",
      "Mengurangi emisi dengan menghilangkan ketergantungan pada energi kotor",
      "Membuat waduk air hujan",
      "Menggunakan panel surya saja",
    ],
    correctAnswer:
      "Mengurangi emisi dengan menghilangkan ketergantungan pada energi kotor",
    points: 10,
  },
  {
    id: 7,
    question: "Jenis proses desalinasi apa yang digunakan BARA?",
    options: [
      "Reverse Osmosis",
      "Desalinasi Termal",
      "Elektrodialisis",
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
      "Lebih cepat prosesnya",
      "Menghilangkan ketergantungan energi kotor dan biaya operasional tinggi",
      "Menghasilkan air lebih banyak",
      "Lebih mudah perawatannya",
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
      "Ketahanan wilayah pesisir",
      "Ketahanan wilayah perkotaan",
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

  const fetchLeaderboard = async () => {
    try {
      // Hapus limit untuk menampilkan semua peserta
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

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && institution.trim()) {
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
  };

  const currentQ = QUESTIONS[currentQuestion];
  const isCorrect = selectedOption === currentQ?.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center py-6 px-4">
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

              {/* Scrollable Leaderboard Container */}
              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
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
                  leaderboard.map((entry) => (
                    <div
                      key={entry._id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        entry.rank === 1
                          ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300"
                          : entry.rank === 2
                          ? "bg-gradient-to-r from-slate-50 to-gray-100 border-2 border-slate-300"
                          : entry.rank === 3
                          ? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300"
                          : "bg-slate-50 border border-slate-200"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm text-sm ${
                          entry.rank === 1
                            ? "bg-amber-500 text-white"
                            : entry.rank === 2
                            ? "bg-slate-400 text-white"
                            : entry.rank === 3
                            ? "bg-orange-500 text-white"
                            : "bg-slate-300 text-slate-700"
                        }`}
                      >
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
                        <div className="font-black text-lg text-indigo-600">
                          {entry.score}
                        </div>
                        <div className="text-xs text-slate-500">
                          {entry.correctAnswers}/
                          {entry.correctAnswers + entry.wrongAnswers}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

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
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Mulai Quiz Sekarang
            </button>

            {/* Info */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <h3 className="font-bold text-indigo-900 mb-2 text-sm">
                Informasi Quiz:
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Total {QUESTIONS.length} pertanyaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Setiap jawaban benar: {QUESTIONS[0].points} poin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Hasil langsung masuk leaderboard</span>
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-800"
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
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-800"
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
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
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
            {/* Progress */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-600">
                  Soal {currentQuestion + 1}/{QUESTIONS.length}
                </span>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  {currentQ.points} Poin
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
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
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
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
                            ? "bg-indigo-600 text-white"
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
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed shadow-md"
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
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
              <div className="text-6xl font-black text-indigo-600 mb-2">
                {finalScore}
              </div>
              <div className="text-slate-600 font-semibold mb-5">
                Total Skor Anda
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
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
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
