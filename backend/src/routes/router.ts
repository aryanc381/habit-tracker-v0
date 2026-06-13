import express, { Router } from 'express';
import signUpRouter from './auth/signup.route.js';
import loginRouter from './auth/login.route.js';
import goalRouter from './goals/goals.route.js';
import skillsRouter from './skills/skills.route.js'
import ticketsRouter from './tickets/tickets.route.js';
import tasksRouter from './tasks/tasks.route.js';
import configRouter from './config/config.route.js';

const router: Router = express.Router();

router.use('/auth', signUpRouter, loginRouter);
router.use('/goals', goalRouter);
router.use('/skills', skillsRouter);
router.use('/tickets', ticketsRouter);
router.use('/tasks', tasksRouter);
router.use('/config', configRouter);

export default router;