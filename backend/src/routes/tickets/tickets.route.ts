import express, { Router } from 'express';
import zod from 'zod';
import { createTicket, deleteTicket, getTicketByGoalId, updateTicketStatus } from '../../services/tickets.service.js';
import { zodValidator } from '../../lib/zodValidation.js';

const router: Router = express.Router();

const ticketCreationBody = zod.object({
    name: zod.string().min(3),
    goalId: zod.string(),
    description: zod.string().min(5),
    createdAt: zod.string().optional()
});

const ticketDeleteBody = zod.object({
    id: zod.string()
});

const ticketStatusBody = zod.object({
    id: zod.string(),
    status: zod.enum(["pending", "in_progress", "average", "fail", "success"])
});

const goalIdParam = zod.object({
    goalId: zod.string()
});

router.get('/health', async (req, res) => {
    res.json({ status: 200, msg: 'Tickets route is healthy.' });
});

router.get('/all/:goalId', async (req, res) => {
    try {
        const zodValidation = await zodValidator(goalIdParam, req.params);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { goalId } = zodValidation.object as { goalId: string };
        const response = await getTicketByGoalId(goalId);
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const zodValidation = await zodValidator(ticketCreationBody, req.body);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { name, goalId, description, createdAt } = zodValidation.object as { name: string; goalId: string; description: string; createdAt?: string };
        const response = await createTicket({ name, goalId, description, createdAt: createdAt ?? new Date().toISOString() });
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.patch('/status', async (req, res) => {
    try {
        const zodValidation = await zodValidator(ticketStatusBody, req.body);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { id, status } = zodValidation.object as { id: string; status: "pending" | "in_progress" | "average" | "fail" | "success" };
        const response = await updateTicketStatus({ id, status });
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const zodValidation = await zodValidator(ticketDeleteBody, req.body);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { id } = zodValidation.object as { id: string };
        const response = await deleteTicket({ id });
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

export default router;
