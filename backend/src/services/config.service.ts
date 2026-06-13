import mongoose from "mongoose";
import { User } from "../db/models/user.models.js";
import { toObjectId } from "../lib/objectIdConverter.js";
import { Config } from "../db/models/config.models.js";

interface ICreateConfig {
    id: string;
    successThresh: number;
    failureThresh: number;
    averageThresh: {
        minimum: number;
        maximum: number;
    }
}

interface IGetConfig {
    id: string
}

export async function createConfig(input: ICreateConfig) {
    const existingUser = await User.findOne({ _id: toObjectId(input.id) });
    if(!existingUser) { return { status: 404, msg: 'No user found to configure thresholds.'} }

    const existingUserId = existingUser._id;
    const newConfigs = await Config.findOneAndUpdate(
        { userId: existingUserId },
        {
            userId: existingUserId,
            evaluationThresholds: {
                successThresh: input.successThresh,
                failThresh: input.failureThresh,
                averageThresh: {
                    minimum: input.averageThresh.minimum,
                    maximum: input.averageThresh.maximum
                }
            }
        },
        { upsert: true, new: true }
    );

    return { status: 200, msg: `Configs set for ${existingUser.fullName}.`, configuration: newConfigs }
}

export async function updateConfig(input: ICreateConfig) {
    const existingUser = await User.findOne({ _id: toObjectId(input.id) });
    if(!existingUser) { return { status: 404, msg: 'No user found to configure thresholds.'} }

    const existingUserId = existingUser._id;
    const updatedConfigs = await Config.findOneAndUpdate(
        { userId: existingUserId },
        {
            evaluationThresholds: {
                successThresh: input.successThresh,
                failThresh: input.failureThresh,
                averageThresh: {
                    minimum: input.averageThresh.minimum,
                    maximum: input.averageThresh.maximum
                }
            }
        },
        { new: true }
    );

    if(!updatedConfigs) { return { status: 404, msg: 'No existing configs found for this user.'} }
    return { status: 200, msg: `Configs updated for ${existingUser.fullName}.`, configuration: updatedConfigs }
}

export async function getConfigsByUserId(input: IGetConfig) {
    const existingUser = await User.findOne({ _id: toObjectId(input.id)});
    if(!existingUser) { return { status: 404, msg: 'No user found to configure thresholds.'} }

    const existingUserId = existingUser._id;
    const configs = await Config.findOne({ userId: existingUserId });
    
    return { status: 200, msg: `Found configurations for ${existingUser.fullName}.`, configuration: configs }
}