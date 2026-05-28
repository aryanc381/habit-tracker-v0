import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/login/health', async (req, res) => {
    return res.json({ status: 200, msg: 'Login endpoint is up and healthy.'})
});

export default router;