import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, default: null },
    email: { type: String, required: true, default: null },
    password: { type: String, required: true, default: null }
});

export const User = mongoose.model("habit_tracker_users", userSchema);