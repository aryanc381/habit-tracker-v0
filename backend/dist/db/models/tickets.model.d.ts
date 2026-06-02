import mongoose from "mongoose";
export declare const Ticket: mongoose.Model<{
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
}, mongoose.Document<unknown, {}, {
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    date: NativeDate;
    name: string;
    description: string;
    goalId: mongoose.Types.ObjectId;
    evaluation?: {
        status: "success" | "in_progress" | "pending" | "average" | "fail";
        overallCompletionPercentage: number;
        skillMetrics: mongoose.Types.DocumentArray<{
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, mongoose.Types.Subdocument<mongoose.mongo.ObjectId, unknown, {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }, {}, {}> & {
            skillId: mongoose.Types.ObjectId;
            totalTasks: number;
            completedTasks: number;
            missedTasks: number;
            completionPercentage: number;
            slope: "/" | "-" | "\\";
        }>;
        overallSlope?: "/" | "-" | "\\" | null;
    } | null;
    evaluatedAt?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=tickets.model.d.ts.map