// app/api/game/leaderboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import GameParticipant from "@/lib/models/GameParticipant";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const institution = searchParams.get("institution");

    let query = {};
    if (institution && institution.trim()) {
      query = { institution: new RegExp(institution.trim(), "i") };
    }

    // Sort: Score DESC, Time ASC, CompletedAt ASC (yang submit duluan menang)
    const leaderboard = await GameParticipant.find(query)
      .sort({
        score: -1, // Skor tertinggi
        timeElapsed: 1, // Waktu tercepat
        completedAt: 1, // Yang submit duluan (jika skor & waktu sama)
      })
      .select(
        "name institution score correctAnswers wrongAnswers timeElapsed completedAt"
      )
      .lean();

    // Tambah ranking
    const rankedLeaderboard = leaderboard.map((item, index) => ({
      ...item,
      rank: index + 1,
      _id: item._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      data: rankedLeaderboard,
      total: rankedLeaderboard.length,
    });
  } catch (error: any) {
    console.error("❌ Error fetching leaderboard:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil leaderboard",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Force dynamic untuk real-time data
export const dynamic = "force-dynamic";
export const revalidate = 0;
