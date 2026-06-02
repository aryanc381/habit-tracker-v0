import mongoose from 'mongoose';
const skills = new mongoose.Schema({
    name: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true, default: null },
    createdAt: { type: Date, required: true }
});
export const Skills = mongoose.model("habit_tracker_skills", skills);
//# sourceMappingURL=skills.models.js.map