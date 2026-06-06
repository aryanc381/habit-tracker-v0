import express, { Router } from 'express'
import zod from 'zod';
import { createGoal, deleteGoal, getAllGoals, getGoalById } from '../../services/goals.service.js';
import { zodValidator } from '../../lib/zodValidation.js';

const router: Router = express.Router();

const goalCreationBody = zod.object({
    name: zod.string().min(3, "Goal name should be minimum three characters long."),
    description: zod.string().min(10, "Goal descrtiption should be minimum 10 characters."),
    startDate: zod.coerce.date(),
    etaDate: zod.coerce.date(),
    skillIds: zod.array(zod.string()),
    userId: zod.string()
});

const goalDeleteBody = zod.object({
    id: zod.string()
});

const goalId = zod.object({
    id: zod.string()
});

router.get('/health', async(req, res) => {
    res.json({ status: 200, msg: 'Goals route is healthy.' })
})

router.get('/all/:id', async(req, res) => {
    try {
        const response = await getAllGoals({id: req.params.id});
        return res.json(response);
    } catch(err) {
        return res.json({ status: 500, msg: 'Internal server error.'})
    }
});

router.get('/:id', async(req, res) => {
    try {
        const zodValidation = await zodValidator(goalId, req.params);
        if(zodValidation.status === 403) return res.json(zodValidation);

        const { id } = zodValidation.object as { id: string };
        const response = await getGoalById({ id });
        return res.json(response);
    } catch(err) {
        res.json({ status: 500, msg: 'Internal server error.'});
    }
});

router.post('/create', async(req, res) => {
    // try {
        const zodValidation = await zodValidator(goalCreationBody, req.body);
        if(zodValidation.status === 403) return res.json(zodValidation);

        const { name, description, startDate, etaDate, skillIds, userId } = zodValidation.object as { name: string, description: string, startDate: Date, etaDate: Date, skillIds: string[], userId: string }
        const response = await createGoal({name, description, startDate, etaDate, skillIds, userId});
        return res.json(response);
    // } catch(err) {
    //     return res.json({ status: 500, msg: 'Internal server error.'});
    // }
});

router.delete('/delete', async(req, res) => {
    try {
        const zodValidation = await zodValidator(goalDeleteBody, req.body);
        if(zodValidation.status === 403) return res.json(zodValidation);

        const { id } = zodValidation.object as ({ id: string });

        const response = await deleteGoal({ id });
        return res.json(response);
    } catch(err) { 
        return res.json({ status: 500, msg: 'Internal server error.'});
    }
});

export default router;