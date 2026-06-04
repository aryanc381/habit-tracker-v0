import api from "./api"

export interface IAllSkills { 
    id: string
    name: string
    level: string
}

export const getAllSkills = () => {
    return api.get('/skills/all');
}