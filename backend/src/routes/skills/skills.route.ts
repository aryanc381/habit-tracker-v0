import express, { Router } from 'express';
import zod from 'zod';

const router: Router = express.Router();

const skillCreation = zod.object({

});

router.post('/create', async(req, res) => {

});

export default router;