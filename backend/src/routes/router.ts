import express, { Router } from 'express';
import signUpRouter from './auth/signup.route.js';
import loginRouter from './auth/login.route.js';
import goalRouter from './goals/goals.route.js';
import skillsRouter from './skills/skills.route.js'

const router: Router = express.Router();

router.use('/auth', signUpRouter, loginRouter);
router.use('/goals', goalRouter);
router.use('/skills', skillsRouter);

export default router;