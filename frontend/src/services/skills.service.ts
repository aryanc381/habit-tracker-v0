import api from "./api"

export interface ISkills { 
    name: string
    description: string
    level: string
}

export interface ISkillResponse extends ISkills { 
    id: string
}

export const getAllSkills = () => {
    return api.get('/skills/all');
}

export const createSkill = (input: ISkills) => {
    return api.post('/skills/create', input);
}