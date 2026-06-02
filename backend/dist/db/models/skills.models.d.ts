import mongoose from 'mongoose';
export declare const Skills: mongoose.Model<{
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=skills.models.d.ts.map