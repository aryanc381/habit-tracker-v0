import express, { Router } from 'express';
import zod from 'zod';
import { evaluateTicket, evaluateAllTickets, getEvaluationHistory, getAllUserEvaluationHistory } from '../../services/evaluation.service.js';
import { zodValidator } from '../../lib/zodValidation.js';

const router: Router = express.Router();

const ticketIdParam = zod.object({
    ticketId: zod.string(),
});

const goalIdParam = zod.object({
    goalId: zod.string(),
});

const userIdParam = zod.object({
    userId: zod.string(),
});

router.get('/health', async (req, res) => {
    res.json({ status: 200, msg: 'Evaluation endpoint is healthy.' });
});

router.post('/evaluate-all', async (req, res) => {
    try {
        const response = await evaluateAllTickets();
        return res.json(response);
    } catch {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.post('/evaluate/:ticketId', async (req, res) => {
    try {
        const zodValidation = await zodValidator(ticketIdParam, req.params);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { ticketId } = zodValidation.object as { ticketId: string };
        const response = await evaluateTicket(ticketId);
        return res.json(response);
    } catch {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.get('/history/all/:userId', async (req, res) => {
    try {
        const zodValidation = await zodValidator(userIdParam, req.params);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { userId } = zodValidation.object as { userId: string };
        const response = await getAllUserEvaluationHistory(userId);
        return res.json(response);
    } catch {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.get('/history/:goalId', async (req, res) => {
    try {
        const zodValidation = await zodValidator(goalIdParam, req.params);
        if (zodValidation.status === 403) return res.json(zodValidation);

        const { goalId } = zodValidation.object as { goalId: string };
        const includeSkills = req.query.includeSkills === "true";
        const response = await getEvaluationHistory(goalId, includeSkills);
        return res.json(response);
    } catch {
        return res.json({ status: 500, msg: 'Internal server error.' });
    }
});

export default router;
