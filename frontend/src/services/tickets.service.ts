import api from "./api";

export type TicketStatus = "pending" | "in_progress" | "average" | "fail" | "success";

export interface ICreateTicketPayload {
    name: string;
    goalId: string;
    description: string;
}

export const getTicketsByGoalId = (goalId: string) => {
    return api.get(`/tickets/all/${goalId}`);
}

export const createTicket = (payload: ICreateTicketPayload) => {
    return api.post('/tickets/create', payload);
}

export const updateTicketStatus = (id: string, status: TicketStatus) => {
    return api.patch('/tickets/status', { id, status });
}

export const deleteTicket = (id: string) => {
    return api.delete('/tickets/delete', { data: { id } });
}
