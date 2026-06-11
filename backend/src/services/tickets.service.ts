import { Tickets } from "../db/models/tickets.model.js";

interface ICreateTicket {
    name: string;
    goalId: string;
    description: string;
    createdAt: string;
}

interface IDeleteTicket {
    id: string;
}

interface IUpdateStatus {
    id: string;
    status: "pending" | "in_progress" | "average" | "fail" | "success";
}

// get a ticket by Id
export async function getTicketByGoalId(goalId: string) {
    const res = await Tickets.find({goalId: goalId}, { _id: 1, name: 1, goalId: 1, description: 1, evaluation: 1, createdAt: 1, evaluatedAt: 1 });
    if(!res) { return { status: 404, msg: `No tickets found for the goal ${goalId}.`} }
    const tickets = res.map(doc => ({ 
        id: doc._id, 
        name: doc.name, 
        goalId: doc.goalId, 
        description: doc.description, 
        level: doc.evaluation, 
        createdAt: doc.createdAt, 
        evaluatedAt: doc.evaluatedAt 
    }));
    return { status: 200, msg: `All tickets found for ${goalId}`, tickets: tickets }
}

// create a ticket
export async function createTicket(input: ICreateTicket) {
    const existingTicket = await Tickets.findOne({ name: input.name });
    if(existingTicket) { return { status: 409, msg: `Ticket "${input.name}" already exists.`} }

    const newTicket = await Tickets.create({ name: input.name, goalId: input.goalId, description: input.description, createdAt: Date() });
    return { status: 200, msg: `Ticket ${newTicket.name} created.`, ticket: newTicket }
}

// delete a ticket
export async function deleteTicket(input: IDeleteTicket) {
    const existingTicket = await Tickets.findOne({ _id: input.id });
    if(!existingTicket) { return { status: 404, msg: 'No ticket found, please check ID.'} }

    await Tickets.deleteOne({ _id: input.id });
    return { status: 200, msg: `Ticket was deleted successfully.` }
}

export async function updateTicketStatus(input: IUpdateStatus) {
    const existing = await Tickets.findOne({ _id: input.id });
    if(!existing) return { status: 404, msg: "Ticket not found." };

    existing.evaluation!.status = input.status;
    await existing.save();
    return { status: 200, msg: `Ticket status updated to ${input.status}.`, ticket: existing };
}
