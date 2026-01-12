import mongoose, { Schema, Document } from "mongoose";

export interface IGameParticipant extends Document {
  name: string;
  institution: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  answers: {
    questionId: number;
    answer: string;
    isCorrect: boolean;
    points: number;
  }[];
  completedAt: Date;
  createdAt: Date;
}

const GameParticipantSchema = new Schema<IGameParticipant>({
  name: {
    type: String,
    required: [true, "Nama wajib diisi"],
    trim: true,
    minlength: [2, "Nama minimal 2 karakter"],
    maxlength: [100, "Nama maksimal 100 karakter"],
  },
  institution: {
    type: String,
    required: [true, "Asal institusi wajib diisi"],
    trim: true,
    maxlength: [150, "Nama institusi maksimal 150 karakter"],
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
  },
  correctAnswers: {
    type: Number,
    default: 0,
    min: 0,
  },
  wrongAnswers: {
    type: Number,
    default: 0,
    min: 0,
  },
  answers: [
    {
      questionId: Number,
      answer: String,
      isCorrect: Boolean,
      points: Number,
    },
  ],
  completedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index untuk performa leaderboard
GameParticipantSchema.index({ score: -1, completedAt: 1 });

export default mongoose.models.GameParticipant ||
  mongoose.model<IGameParticipant>("GameParticipant", GameParticipantSchema);
