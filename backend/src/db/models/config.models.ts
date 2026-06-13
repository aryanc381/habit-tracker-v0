import mongoose from "mongoose";
import { maximum } from "zod/mini";

const configSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, default: null },
    evaluationThresholds: {
        failThresh: { type: Number, required: true, default: null },
        successThresh: { type: Number, required: true, default: null },
        averageThresh: {
            minimum: { type: Number, required: true, default: null },
            maximum: { type: Number, required: true, default: null }
        } 
    }
});

export const Config = mongoose.model("habit_tracker_configs", configSchema);