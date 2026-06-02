import mongoose from "mongoose";
export declare const Goals: mongoose.Model<{
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    description: string;
    startDate: NativeDate;
    etaDate: NativeDate;
    userId: mongoose.Types.ObjectId;
    skillIds: mongoose.Types.ObjectId[];
    status: "planned" | "in_progress" | "off-track" | "failed" | "completed";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=goal.model.d.ts.map