import express, { Router } from 'express';
import zod from 'zod';
import { createConfig, getConfigsByUserId, updateConfig } from '../../services/config.service.js';
import { zodValidator } from '../../lib/zodValidation.js';

const router: Router = express.Router();

const configCreation = zod.object({
    id: zod.string(),
    successThresh: zod.number(),
    failureThresh: zod.number(),
    averageThresh: zod.object({
        minimum: zod.number(),
        maximum: zod.number(),
    }),
});

router.get('/health', async (req, res) => {
    res.json({ status: 200, msg: 'Config endpoint is healthy.' });
});

router.get('/:id', async (req, res) => {
    try {
        const response = await getConfigsByUserId({ id: req.params.id });
        res.json(response);
    } catch {
        res.json({ status: 500, msg: 'Internal server error.' });
    }
});

router.post('/create', async (req, res) => {
    const zodValidation = await zodValidator(configCreation, req.body);
    if (zodValidation.status === 403) return res.json(zodValidation);

    const { id, successThresh, failureThresh, averageThresh } = zodValidation.object as {
        id: string;
        successThresh: number;
        failureThresh: number;
        averageThresh: { minimum: number; maximum: number };
    };

    const result = await createConfig({ id, successThresh, failureThresh, averageThresh });
    return res.json(result);
});

router.patch('/update', async (req, res) => {
    const zodValidation = await zodValidator(configCreation, req.body);
    if (zodValidation.status === 403) return res.json(zodValidation);

    const { id, successThresh, failureThresh, averageThresh } = zodValidation.object as {
        id: string;
        successThresh: number;
        failureThresh: number;
        averageThresh: { minimum: number; maximum: number };
    };

    const result = await updateConfig({ id, successThresh, failureThresh, averageThresh });
    return res.json(result);
});

export default router;
