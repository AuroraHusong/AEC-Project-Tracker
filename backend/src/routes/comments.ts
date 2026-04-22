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
})

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const deleted = await db("comments").where({ id }).del();

    if (!deleted) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting comment" });
  }
});

export default router;