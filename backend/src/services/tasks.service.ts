import { Task } from "../db/models/tasks.model.js";
import { Tickets } from "../db/models/tickets.model.js";
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

    await recalcSkillMetrics(input.ticketId, input.skillId);
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

    await recalcSkillMetrics(task.ticketId.toString(), task.skillId.toString());
    return { status: 200, msg: `Task status updated to ${input.status}.`, task };
}

export async function deleteTask(input: IDeleteTask) {
    const task = await Task.findOne({ _id: toObjectId(input.id) });
    if (!task) return { status: 404, msg: "Task not found." };

    const { ticketId, skillId } = task;
    await Task.deleteOne({ _id: toObjectId(input.id) });

    await recalcSkillMetrics(ticketId.toString(), skillId.toString());
    return { status: 200, msg: "Task deleted." };
}

async function recalcSkillMetrics(ticketId: string, skillId: string) {
    const ticket = await Tickets.findOne({ _id: toObjectId(ticketId) });
    if (!ticket || !ticket.evaluation) return;

    const tasks = await Task.find({ ticketId: toObjectId(ticketId), skillId: toObjectId(skillId) });
    const total = tasks.length;
    const completed = tasks.filter(t => t.status).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const metric = ticket.evaluation.skillMetrics?.find(
        m => m.skillId?.toString() === skillId
    );

    if (metric) {
        metric.totalTasks = total;
        metric.completedTasks = completed;
        metric.missedTasks = total - completed;
        metric.completionPercentage = pct;
    } else {
        ticket.evaluation.skillMetrics?.push({
            skillId: toObjectId(skillId),
            totalTasks: total,
            completedTasks: completed,
            missedTasks: total - completed,
            completionPercentage: pct,
            slope: null,
        });
    }

    await ticket.save();
}
