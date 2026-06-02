import mongoose from "mongoose";
export declare const Task: mongoose.Model<{
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
}, mongoose.Document<unknown, {}, {
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    description: string;
    title: string;
    status: boolean;
    skillId: mongoose.Types.ObjectId;
    ticketId: mongoose.Types.ObjectId;
    etaTime: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=tasks.model.d.ts.map