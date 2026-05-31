import mongoose from "mongoose";

const goals = new mongoose.Schema({
    name: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
    startDate: { type: Date, required: true, default: null },
    etaDate: { type: Date, required: true, default: null },
    skillIds: { type: [mongoose.Types.ObjectId], ref: "habit_tracker_skills", required: true, default: [] },
    status: { type: String, enum: ["planned", "in_progress", "off-track", "failed", "completed"], required: true, default: null }
});

export const Goals = mongoose.model("habit_tracker_goals", goals);