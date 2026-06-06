import api from "./api";

export interface ICreateGoalPayload {
    name: string;
    description: string;
    startDate: Date;   
    etaDate: Date;     
    skillIds: string[];
    userId: string;
}

export const createGoal = (payload: ICreateGoalPayload) => {
    return api.post('/goals/create', payload);
}

export const getAllGoals = (id: string) => {
    return api.get(`/goals/all/${id}`);
}

export const getGoalById = (id: string) => {
    return api.get(`/goals/${id}`);
}

export const deleteGoal = (id: string) => {
    return api.delete('goals/delete', { data: {id} })
}