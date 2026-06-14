import api from "./api";

export const getEvaluationHistory = (goalId: string) => {
    return api.get(`/evaluation/history/${goalId}`);
}

export const getEvaluationHistoryWithSkills = (goalId: string) => {
    return api.get(`/evaluation/history/${goalId}?includeSkills=true`);
}

export const getAllEvaluationHistory = (userId: string) => {
    return api.get(`/evaluation/history/all/${userId}`);
}
