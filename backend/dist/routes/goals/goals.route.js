import express, { Router } from 'express';
import zod from 'zod';
const router = express.Router();
const goalBody = zod.object({
    name: zod.string().min(3, "Goal name should be minimum three characters long."),
    description: zod.string().min(10, "Goal descrtiption should be minimum 10 characters."),
    startDate: zod.date(),
    etaDate: zod.date(),
});
router.post('/create', async (req, res) => {
});
export default router;
//# sourceMappingURL=goals.route.js.map