import type mongoose from 'mongoose';
import { Goals } from '../db/models/goal.model.js';

interface IGetGoal {
    id: mongoose.Types.ObjectId
}

interface ICreateGoal {
    name: string, 
    description: string,
    startDate: Date,
    etaDate: Date,
    skillIds: string[]
}

interface IDeleteGoal {
    id: string
} 

// get a goal object by Id
export async function getGoalById(input: IGetGoal) {
    const goalObject = await Goals.findOne({ _id: input.id });
    if(!goalObject) { return { status: 404, msg: `Goal not found.`} }
    
    return { status: 200, msg: `Goal ${goalObject.name} found.`, goalObject: goalObject }
}

// get all the goal : {ids, names}
export async function getAllGoals() {
    const ids = await Goals.find({}, {_id: 1, name: 1}).lean();
    return { status: 200, goals: ids.map(doc => ({ id: doc._id, name: doc.name })) }
}

// create a goal
export async function createGoal(input: ICreateGoal) {
    const existingGoal = await Goals.findOne({ name: input.name });
    if(existingGoal) { return { status: 403, msg: `Goal ${existingGoal.name} already exists.`} }

    const newGoal = await Goals.create({ name:input.name, description: input.description, startDate: input.startDate, etaDate: input.etaDate, skillIds: input.skillIds });
    return { status: 200, msg: `Goal ${newGoal.name} is created.`, goal: newGoal };
}

// delete a goal
export async function deleteGoal(input: IDeleteGoal) {
    const existingGoal = await Goals.findOne({ _id: input.id });
    if(!existingGoal) { return { status: 404, msg: `Goal not found.`} }
    await Goals.deleteOne({ _id: input.id });
    return { status: 200, msg: `Goal ${existingGoal.name} was deleted.`};
}