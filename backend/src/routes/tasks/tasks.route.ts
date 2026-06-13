import express, { Router } from 'express';
import zod from 'zod';
import { createTask, deleteTask, getTasksByTicketId, updateTaskStatus } from '../../services/tasks.service.js';
import { zodValidator } from '../../lib/zodValidation.js';

const router: Router = express.Router();

const taskCreationBody = zod.object({
    title: zod.string().min(1),
    skillId: zod.string(),
    ticketId: zod.string(),
    description: zod.string().optional(),
    etaTime: zod.string().optional(),
});

const taskStatusBody = zod.object({
    id: zod.string(),
    status: zod.boolean(),
});

const taskDeleteBody = zod.object({
    id: zod.string(),
});

const ticketIdParam = zod.object({
    ticketId: zod.string(),
});

router.get('/health', async (req, res) => {
    res.json({ status: 200, msg: 'Tasks route is healthy.' });
});

router.get('/all/:ticketId', async (req, res) => {
    try {
        const zodValidation = await zodValidator(ticketIdParam, req.params);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { ticketId } = zodValidation.object as { ticketId: string };
        const response = await getTasksByTicketId(ticketId);
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const zodValidation = await zodValidator(taskCreationBody, req.body);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { title, skillId, ticketId, description, etaTime } = zodValidation.object as {
            title: string;
            skillId: string;
            ticketId: string;
            description?: string;
            etaTime?: string;
        };
        const response = await createTask({ title, skillId, ticketId, ...(description ? { description } : {}), ...(etaTime ? { etaTime } : {}) });
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.patch('/status', async (req, res) => {
    try {
        const zodValidation = await zodValidator(taskStatusBody, req.body);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { id, status } = zodValidation.object as { id: string; status: boolean };
        const response = await updateTaskStatus({ id, status });
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const zodValidation = await zodValidator(taskDeleteBody, req.body);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { id } = zodValidation.object as { id: string };
        const response = await deleteTask({ id });
        return res.json(response);
    } catch (err) {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

export default router;
