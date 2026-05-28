import express, { Router } from 'express';
import signUpRouter from './auth/signup.route.js';
import loginRouter from './auth/login.route.js';

const router: Router = express.Router();

router.use('/auth', signUpRouter, loginRouter)

export default router;