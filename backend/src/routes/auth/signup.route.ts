import express, { Router } from 'express';
import zod from 'zod';
import { zodValidator } from '../../lib/zodValidation.js';
import { signup } from '../../services/auth.service.js';

const router: Router = express.Router();

const signUpBody = zod.object({
    email: zod.string().min(3),
    password: zod.string().min(3),
    fullName: zod.string()
});

router.get('/signup/health', async (req, res) => {
    return res.json({ status: 200, msg: 'Signup endpoint is up and healthy.'})
});

router.post('/signup', async (req, res) => {
    try {
        // 1. zod validation.
        const zodValidation = await zodValidator(signUpBody, req.body);
        if(zodValidation.status === 403) { return res.json({zodValidation}) }
        // 2. destructuring keys from objects.
        const { email, password, fullName } = zodValidation.object as { email: string, password: string, fullName: string }
        // 3. signup-service that take cares of everything.
        const result = await signup({email, password, fullName});
        return res.json({ result });
    } catch(err) {
        return res.json({ status: 500, msg: 'Internal server error.'});
    }
});

export default router;