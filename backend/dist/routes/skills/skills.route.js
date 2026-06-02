import express, { Router } from 'express';
import zod from 'zod';
import { deleteSkill, getAllSkills, getSkillByGoalId, getSkillById } from '../../services/skills.service.js';
const router = express.Router();
const skillCreation = zod.object({
    name: zod.string(),
    description: zod.string(),
    level: zod.string()
});
// GET - all the skills.
router.get('/all', async (req, res) => {
    try {
        const response = await getAllSkills();
        res.json(response);
    }
    catch (err) {
        res.json({ status: 500, msg: 'Internal server error.' });
    }
});
// GET - a skill by Id.
router.get('/:id', async (req, res) => {
    try {
        const response = await getSkillById({ id: req.params.id });
        res.json(response);
    }
    catch (err) {
        res.json({ status: 500, msg: 'Internal server error.' });
    }
});
// DELETE - a skill by Id.
router.delete('/:id', async (req, res) => {
    try {
        const response = await deleteSkill({ id: req.params.id });
        res.json(response);
    }
    catch (err) {
        res.json({ status: 500, msg: 'Internal server error.' });
    }
});
// GET - skills by goalId
router.get('/:goalId', async (req, res) => {
    try {
        const response = await getSkillByGoalId({ goalId: req.params.goalId });
        res.json(response);
    }
    catch (err) {
        res.json({ status: 500, msg: 'Internal server error.' });
    }
});
export default router;
//# sourceMappingURL=skills.route.js.map