import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, default: null },
    skillId: { type: mongoose.Types.ObjectId, ref: "habit_tracker_skills", required: true },
    description: { type: String, required: true, default: null },
    ticketId: { type: mongoose.Types.ObjectId, ref: "habit_tracker_tickets", required: true, default: null },
    etaTime: { type: Date, required: true, default: null },
    status: { type: Boolean, required: true, default: false }
});
export const Task = mongoose.model("habit_tracker_tasks", taskSchema);
//# sourceMappingURL=tasks.model.js.map