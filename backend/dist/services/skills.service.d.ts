interface ICreateSkill {
    name: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
}
interface IDeleteSkill {
    id: string;
}
interface IGetSkill {
    goalId: string;
}
interface ISkillId {
    id: string;
}
export declare function createSkill(input: ICreateSkill): Promise<{
    status: number;
    msg: string;
}>;
export declare function deleteSkill(input: IDeleteSkill): Promise<{
    status: number;
    msg: string;
}>;
export declare function getSkillByGoalId(input: IGetSkill): Promise<{
    status: number;
    msg: string;
    skills: {
        status: number;
        msg: string;
    }[];
}>;
export declare function getAllSkills(): Promise<{
    status: number;
    msg: string;
    skills: {
        id: import("mongoose").Types.ObjectId;
        name: string;
    }[];
}>;
export declare function getSkillById(input: ISkillId): Promise<{
    status: number;
    msg: string;
}>;
export {};
//# sourceMappingURL=skills.service.d.ts.map