import express, { Router } from 'express';
import { zodValidator } from '../../lib/zodValidation.js';
import zod from 'zod';
import { login } from '../../services/auth.service.js';

const router: Router = express.Router();

const loginBody = zod.object({
    email: zod.string(),
    password: zod.string()
});

router.get('/login/health', async (req, res) => {
    return res.json({ status: 200, msg: 'Login endpoint is up and healthy.'})
});

router.post('/login', async (req, res) => {
    try {
        // 1. zod validation for login-body
        const zodValidation = await zodValidator(loginBody, req);
        if(zodValidation.status === 403) return res.json(zodValidation);
        // 2. destructuring the req.body keys
        const { email, password } = zodValidation.object as { email: string, password: string };
        // 3. login service that take cares of everything.
        const result = await login({email, password});
        return res.json(result);
    } catch(err) {
        return res.json({ status: 500, msg: 'Internal server error.'});
    }  
});

export default router;