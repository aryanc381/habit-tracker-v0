import api from "./api";

export interface ICreateTaskPayload {
    title: string;
    skillId: string;
    ticketId: string;
    description?: string;
}

export const getTasksByTicketId = (ticketId: string) => {
    return api.get(`/tasks/all/${ticketId}`);
}

export const createTask = (payload: ICreateTaskPayload) => {
    return api.post('/tasks/create', payload);
}

export const updateTaskStatus = (id: string, status: boolean) => {
    return api.patch('/tasks/status', { id, status });
}

export const deleteTask = (id: string) => {
    return api.delete('/tasks/delete', { data: { id } });
}
