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

// get a ticket by Id
export async function getTicketById(goalId: string) {
    const res = await Tickets.find({goalId: goalId}, { _id: 1, name: 1, goalId: 1, evaluation: 1, createdAt: 1, evaluatedAt: 1 });
    if(!res) { return { status: 404, msg: `No tickets found for the goal ${goalId}.`} }
    const tickets = res.map(doc => ({ 
        id: doc._id, 
        name: doc.name, 
        goalId: doc.goalId, 
        level: doc.evaluation, 
        createdAt: doc.createdAt, 
        evaluatedAt: doc.evaluatedAt 
    }));
    return { status: 200, msg: `All tickets found for ${goalId}`, tickets: tickets }
}

// create a ticket
export async function createTicket(input: ICreateTicket) {
    const existingTicket = await Tickets.find({ name: input.name, createdAt: input.createdAt });
    if(existingTicket) { return { status: 404, msg: `Ticket already exists.`} }

    const newTicket = await Tickets.create({ name: input.name, goalId: input.goalId, description: input.description, createdAt: Date() });
    return { status: 200, msg: `Ticket ${newTicket.name} created.`, ticket: newTicket }
}

// delete a ticket
export async function deleteTicket(input: IDeleteTicket) {
    const existingTicket = await Tickets.find({ _id: input.id });
    if(!existingTicket) { return { status: 404, msg: 'No ticket found, please check ID.'} }

    await Tickets.deleteOne({ _id: input.id });
    return { status: 200, msg: `Ticket was deleted successfully.` }
}