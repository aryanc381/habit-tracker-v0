import { Task } from "../db/models/tasks.model.js";
import { toObjectId } from "../lib/objectIdConverter.js";

interface ICreateTask {
    title: string;
    skillId: string;
    ticketId: string;
    description?: string;
    etaTime?: string;
}

interface IUpdateTaskStatus {
    id: string;
    status: boolean;
}

interface IDeleteTask {
    id: string;
}

export async function createTask(input: ICreateTask) {
    const existing = await Task.findOne({ title: input.title, ticketId: toObjectId(input.ticketId) });
    if (existing) return { status: 409, msg: `Task "${input.title}" already exists in this ticket.` };

    const task = await Task.create({
        title: input.title,
        skillId: toObjectId(input.skillId),
        ticketId: toObjectId(input.ticketId),
        description: input.description ?? "No description",
        etaTime: input.etaTime ? new Date(input.etaTime) : new Date(),
    });

    return { status: 200, msg: `Task "${task.title}" created.`, task };
}

export async function getTasksByTicketId(ticketId: string) {
    const tasks = await Task.find({ ticketId: toObjectId(ticketId) });
    return { status: 200, msg: "Tasks found.", tasks };
}

export async function updateTaskStatus(input: IUpdateTaskStatus) {
    const task = await Task.findOne({ _id: toObjectId(input.id) });
    if (!task) return { status: 404, msg: "Task not found." };

    task.status = input.status;
    await task.save();

    return { status: 200, msg: `Task status updated to ${input.status}.`, task };
}

export async function deleteTask(input: IDeleteTask) {
    const task = await Task.findOne({ _id: toObjectId(input.id) });
    if (!task) return { status: 404, msg: "Task not found." };

    await Task.deleteOne({ _id: toObjectId(input.id) });
    return { status: 200, msg: "Task deleted." };
}
