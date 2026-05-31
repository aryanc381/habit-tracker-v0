import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
    ticketId: { type: mongoose.Types.ObjectId, required: true, default: null },
    etaTime: { type: Date, required: true, default: null }
});

const Task = mongoose.model("habit_tracker_tasks", taskSchema);