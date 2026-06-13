import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true, default: null },
    goalId: { type: mongoose.Types.ObjectId, ref: "habit_tracker_goals", required: true },
    description: { type: String, required: true, default: null },
    evaluation: {
        status: { type: String, enum: ["pending", "in_progress", "average", "fail", "success"], default: "pending" },
        overallSlope: { type: String, enum: ["/", "-", "\\"], default: null },
        overallCompletionPercentage: { type: Number, default: null },
        skillMetrics: [{
            skillId: { type: mongoose.Types.ObjectId, ref: "habit_tracker_skills", default: null },
            totalTasks: { type: Number, default: null },
            completedTasks: { type: Number, default: null },
            missedTasks: { type: Number, default: null },
            completionPercentage: { type: Number, default: null },
            slope: { type: String, enum: ["/", "-", "\\"], default: null }
        }],
    },
    createdAt: { type: Date, required: true, default: null },
    evaluatedAt: { type: Date, default: null }
});

export const Tickets = mongoose.model("habit_tracker_tickets", ticketSchema);