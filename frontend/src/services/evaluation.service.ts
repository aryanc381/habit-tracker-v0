import api from "./api";

export const getEvaluationHistory = (goalId: string) => {
    return api.get(`/evaluation/history/${goalId}`);
}

