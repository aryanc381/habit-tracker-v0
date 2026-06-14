import cron from 'node-cron';
import { Tickets } from '../db/models/tickets.model.js';
import { evaluateTicket } from '../services/evaluation.service.js';

export function startEvaluationCron() {
    cron.schedule('0 23 * * *', async () => {
        const tickets = await Tickets.find({ evaluatedAt: null });
        for (const ticket of tickets) {
            await evaluateTicket(ticket._id.toString());
        }
    });
}
