import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true, default: null },
    date: { type: Date, required: true, default: null },
    skillId: { type: mongoose.Types.ObjectId, ref: "habit_tracker_skills" , required: true, default: null },
    description: { type: String, required: true, default: null },
    evaluation: {
        status: { type: String, enum: ["pending", "today", "in_progress", "average", "fail", "success"], required: true, default: "pending" },
        metrics: {
            totalTasks: { type: Number, required: true, default: null },
            completedTasks: { type: Number, required: true, default: null },
            missedTasks: { type: Number, required: true, default: null },
            completionPercentage: { type: Number, required: true, default: null }
        },
        slope: { type: String, enum: ["/", "-", "\\"], default: null },
        evaluatedAt: { type: Date, default: null }
    }
});

const Ticket = mongoose.model("habit_tracker_tickets", ticketSchema);