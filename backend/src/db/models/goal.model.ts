import mongoose from "mongoose";

const goals = new mongoose.Schema({
    name: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
    startDate: { type: Date, required: true, default: null },
    etaDate: { type: Date, required: true, default: null },
    skillIds: { type: [mongoose.Types.ObjectId], required: true, default: []}
});

export const goalsSchema = mongoose.model("habit_tacker_goals", goals);