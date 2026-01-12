import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import GameParticipant from "@/lib/models/GameParticipant";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, institution, answers } = body;

    // Validasi input
    if (!name || !institution || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Hitung score dan statistik
    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    answers.forEach((ans) => {
      if (ans.isCorrect) {
        score += ans.points;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    // Simpan ke database
    const participant = await GameParticipant.create({
      name: name.trim(),
      institution: institution.trim(),
      score,
      correctAnswers,
      wrongAnswers,
      answers,
      completedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Hasil quiz berhasil disimpan",
        data: {
          id: participant._id,
          score: participant.score,
          correctAnswers: participant.correctAnswers,
          wrongAnswers: participant.wrongAnswers,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error saving game result:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal menyimpan hasil game",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
