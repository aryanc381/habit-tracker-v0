import express, { Router } from 'express';
import zod from 'zod';
import { createSkill, deleteSkill, getAllSkills, getSkillByGoalId, getSkillById } from '../../services/skills.service.js';
import { zodValidator } from '../../lib/zodValidation.js';

const router: Router = express.Router();

const skillCreation = zod.object({
    name: zod.string(), 
    description: zod.string(),
    level: zod.enum(['beginner', 'intermediate', 'advanced'])
}); 

router.get('/health', async(req, res) => {
    res.json({ status: 200, msg: 'Skill endpoint is healthy.'})
});

// GET - all the skills.
router.get('/all', async(req, res) => {
    try {
        const response = await getAllSkills();
        res.json(response);
    } catch(err) { 
        res.json({ status: 500, msg: 'Internal server error.'});
    }  
});

// GET - a skill by Id.
router.get('/:id', async(req, res) => {
    try {
        const response = await getSkillById({id: req.params.id});
        res.json(response);
    } catch(err) {
        res.json({ status: 500, msg: 'Internal server error.'});
    }
});

// DELETE - a skill by Id.
router.delete('/:id', async(req, res) => {
    try {
        const response = await deleteSkill({id: req.params.id});
        res.json(response);
    } catch(err) {
        res.json({ status: 500, msg: 'Internal server error.'});
    }
});

// GET - skills by goalId
router.get('/goalBased/:id', async(req, res) => {
    try {
        const response = await getSkillByGoalId({ goalId: req.params.id });
        res.json(response);
    } catch(err) {
        res.json({ status: 500, msg: 'Internal server error.'});
    }
});

// POST - create a skill
router.post('/create', async (req, res) => {
    const zodValidation = await zodValidator(skillCreation, req.body);
    if(zodValidation.status === 403) return res.json(zodValidation);

    const { name, description, level } = zodValidation.object as { name: string, description: string, level: "beginner" | "intermediate" | "advanced" }

    const result = await createSkill({name, description, level });
    
    return res.json(result);
});

export default router;