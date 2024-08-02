import mongoose from "mongoose";

export const habbitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  maxStreak: {
    type: Number,
    default: 0,
  },
  daysDone: {
    type: Number,
    default: 0,
  },
  status: [
    {
      date: { type: Date, default: Date.now() },
      state: {
        type: String,
        enum: ["Done", "Not Done", "None"],
        default: "None",
      },
    },
  ],
});
