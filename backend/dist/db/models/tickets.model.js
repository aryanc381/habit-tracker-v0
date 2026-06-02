import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true, default: null },
    goalId: { type: mongoose.Types.ObjectId, ref: "habit_tracker_goals", required: true },
    description: { type: String, required: true, default: null },
    evaluation: {
        status: { type: String, enum: ["pending", "in_progress", "average", "fail", "success"], required: true, default: "pending" },
        overallSlope: { type: String, enum: ["/", "-", "\\"], default: null },
        overallCompletionPercentage: { type: Number, required: true, default: null },
        skillMetrics: [{
                skillId: { type: mongoose.Types.ObjectId, ref: "habit_tracker_skills", required: true, default: null },
                totalTasks: { type: Number, required: true, default: null },
                completedTasks: { type: Number, required: true, default: null },
                missedTasks: { type: Number, required: true, default: null },
                completionPercentage: { type: Number, required: true, default: null },
                slope: { type: String, enum: ["/", "-", "\\"], required: true, default: null }
            }],
    },
    date: { type: Date, required: true, default: null },
    evaluatedAt: { type: Date, default: null }
});
export const Ticket = mongoose.model("habit_tracker_tickets", ticketSchema);
//# sourceMappingURL=tickets.model.js.map