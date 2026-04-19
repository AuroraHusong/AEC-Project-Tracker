import { Router, Request, Response } from "express";
import db from "../db";

const router: Router = Router();

router.get("/:projectId", async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = Number(req.params.projectId);
    const comments = await db("comments")
      .where({ project_id: projectId })
      .orderBy("created_at", "desc");
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const [comment] = await db("comments").insert(req.body).returning("*");
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating comment" });
  }
});

export default router;