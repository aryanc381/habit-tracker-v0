import { Tickets } from "../db/models/tickets.model.js";
import { Task } from "../db/models/tasks.model.js";
import { Config } from "../db/models/config.models.js";
import { Goals } from "../db/models/goal.model.js";
import { Skills } from "../db/models/skills.models.js";
import { toObjectId } from "../lib/objectIdConverter.js";

export async function evaluateTicket(ticketId: string) {
    const ticket = await Tickets.findOne({ _id: toObjectId(ticketId) });
    if (!ticket) return { status: 404, msg: "Ticket not found." };

    const goal = await Goals.findOne({ _id: ticket.goalId });
    if (!goal) return { status: 404, msg: "Goal not found." };

    const configDoc = await Config.findOne({ userId: goal.userId });
    const thresholds = configDoc?.evaluationThresholds ?? { failThresh: 40, successThresh: 70 };
    const successThresh = thresholds?.successThresh ?? 70;
    const failThresh = thresholds?.failThresh ?? 40;

    const tasks = await Task.find({ ticketId: toObjectId(ticketId) });
    const grouped: Record<string, { total: number; completed: number }> = {};

    for (const task of tasks) {
        const sk = task.skillId.toString();
        if (!grouped[sk]) grouped[sk] = { total: 0, completed: 0 };
        grouped[sk].total++;
        if (task.status) grouped[sk].completed++;
    }

    let up = 0, flat = 0, down = 0;
    const skillMetrics: {
        skillId: any;
        totalTasks: number;
        completedTasks: number;
        missedTasks: number;
        completionPercentage: number;
        slope: "/" | "-" | "\\";
    }[] = [];

    for (const [skillId, data] of Object.entries(grouped)) {
        const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
        let slope: "/" | "-" | "\\";
        if (pct >= successThresh) { slope = "/"; up++; }
        else if (pct >= failThresh) { slope = "-"; flat++; }
        else { slope = "\\"; down++; }

        skillMetrics.push({
            skillId: toObjectId(skillId),
            totalTasks: data.total,
            completedTasks: data.completed,
            missedTasks: data.total - data.completed,
            completionPercentage: pct,
            slope,
        });
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status).length;
    const overallPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    let overallSlope: "/" | "-" | "\\" = "-";
    if (up > flat && up > down) overallSlope = "/";
    else if (down > up && down > flat) overallSlope = "\\";

    ticket.evaluation!.overallSlope = overallSlope;
    ticket.evaluation!.overallCompletionPercentage = overallPct;
    ticket.evaluation!.skillMetrics.splice(0, ticket.evaluation!.skillMetrics.length);
    for (const m of skillMetrics) {
        ticket.evaluation!.skillMetrics.push(m);
    }
    ticket.evaluatedAt = new Date();
    await ticket.save();

    return { status: 200, msg: "Ticket evaluated.", ticket };
}

export async function evaluateAllTickets() {
    const tickets = await Tickets.find({ evaluatedAt: null });
    for (const ticket of tickets) {
        await evaluateTicket(ticket._id.toString());
    }
    return { status: 200, msg: `Evaluated ${tickets.length} tickets.` };
}

export async function getEvaluationHistory(goalId: string, includeSkills?: boolean) {
    const tickets = await Tickets.find(
        { goalId: toObjectId(goalId), evaluatedAt: { $ne: null } },
        { _id: 1, name: 1, createdAt: 1, evaluation: 1 }
    ).sort({ createdAt: 1 });

    const history = await Promise.all(tickets.map(async (doc) => {
        const entry: any = {
            id: doc._id,
            date: doc.createdAt,
            overallSlope: doc.evaluation?.overallSlope ?? "-",
            overallCompletion: doc.evaluation?.overallCompletionPercentage ?? 0,
        };

        if (includeSkills && doc.evaluation?.skillMetrics) {
            entry.skillMetrics = await Promise.all(doc.evaluation.skillMetrics.map(async (sm: any) => {
                const skill = await Skills.findOne({ _id: sm.skillId }, { name: 1 });
                return {
                    skillName: skill?.name ?? "Unknown",
                    totalTasks: sm.totalTasks,
                    completedTasks: sm.completedTasks,
                    missedTasks: sm.missedTasks,
                    completionPercentage: sm.completionPercentage,
                    slope: sm.slope,
                };
            }));
        }

        return entry;
    }));

    return { status: 200, msg: "Evaluation history found.", history };
}

export async function getAllUserEvaluationHistory(userId: string) {
    const goals = await Goals.find({ userId: toObjectId(userId) }, { _id: 1, name: 1 });

    const result = [];
    for (const goal of goals) {
        const tickets = await Tickets.find(
            { goalId: goal._id, evaluatedAt: { $ne: null } },
            { _id: 1, name: 1, createdAt: 1, evaluation: 1 }
        ).sort({ createdAt: 1 });

        const history = tickets.map(doc => ({
            date: doc.createdAt,
            overallCompletion: doc.evaluation?.overallCompletionPercentage ?? 0,
        }));

        result.push({
            id: goal._id,
            name: goal.name,
            history,
        });
    }

    return { status: 200, msg: "All evaluation history found.", goals: result };
}
