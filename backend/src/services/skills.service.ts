import { Skills } from "../db/models/skills.models.js";
import { getGoalById } from "./goals.service.js";
import { toObjectId } from "../lib/objectIdConverter.js";

export interface ICreateSkill {
    name: string,
    description: string, 
    level: "beginner" | "intermediate" | "advanced"
}

interface IDeleteSkill {
    id: string,
}

interface IGetSkill {
    goalId: string,
}

interface ISkillId {
    id: string
}

export async function createSkill(input: ICreateSkill) {
    const existingSkill = await Skills.findOne({ name: input.name });
    if(existingSkill) { return { status: 409, msg: `Skill ${input.name} already exists.`} };
    
    const newSkill = await Skills.create({ name: input.name, description: input.description, level: input.level, createdAt: new Date });
    return { status: 200, msg: `Skill ${newSkill.name} has been added.`}
}

export async function deleteSkill(input: IDeleteSkill) {
    const skillCheck = await Skills.findOne({ _id: toObjectId(input.id) });
    if(!skillCheck) { return { status: 404, msg: `Skill not found.`} };

    await Skills.deleteOne({ _id: toObjectId(input.id) });
    return { status: 200, msg: `Skill was deleted.`}
}

export async function getSkillByGoalId(input: IGetSkill) {
    const goal = getGoalById({ id: input.goalId });
    const skillIds = (await goal).goalObject?.skillIds;
    if(!skillIds) return { status: 404, msg: `No skill found for the goal.` }
    
    const skills = await Promise.all(
        skillIds?.map((id) => getSkillById({ id: id.toString() })) ?? []);
    return { status: 200, msg: `Skills found for ${(await goal).goalObject?.name}.`, skills: skills }
}

export async function getAllSkills() {
    const skills = await Skills.find({}, { _id: 1, name: 1, level: 1 }).lean();
    return { status: 200, msg: `Skills found`, skills: skills.map(doc => ({ id: doc._id, name: doc.name, level: doc.level })) }
}

export async function getSkillById(input: ISkillId) {
    const skill = await Skills.findOne({ _id: toObjectId(input.id) });
    if(!skill) { return { status: 404, msg: `Skill not found.`} }

    return { status: 200, msg: `Skill ${skill.name} found.`, skill: skill }
}
