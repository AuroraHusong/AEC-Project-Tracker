import { Router, Request, Response } from 'express';
import db from '../db';

const router: Router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await db('projects').select('*');
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const project = await db('projects').where({ id }).first();

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching project' });
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try{
    const [project] = await db("projects").insert(req.body).returning("*");
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating project"})
  }
})

export default router;