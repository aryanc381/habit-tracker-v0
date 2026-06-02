import type mongoose from 'mongoose';
interface IGetGoal {
    id: mongoose.Types.ObjectId;
}
interface ICreateGoal {
    name: string;
    description: string;
    startDate: Date;
    etaDate: Date;
    skillIds: string[];
}
interface IDeleteGoal {
    id: string;
}
export declare function getGoalById(input: IGetGoal): Promise<{
    status: number;
    msg: string;
    goalObject?: never;
} | {
    status: number;
    msg: string;
    goalObject: mongoose.Document<unknown, {}, {
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
    };
}>;
export declare function getAllGoals(): Promise<{
    status: number;
    goals: {
        id: mongoose.Types.ObjectId;
        name: string;
    }[];
}>;
export declare function createGoal(input: ICreateGoal): Promise<{
    status: number;
    msg: string;
    goal?: never;
} | {
    status: number;
    msg: string;
    goal: mongoose.Document<unknown, {}, {
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
    };
}>;
export declare function deleteGoal(input: IDeleteGoal): Promise<{
    status: number;
    msg: string;
}>;
export {};
//# sourceMappingURL=goals.service.d.ts.map