import { Router, Request, Response } from "express";

const router: Router = Router();

const mockProjects = [
  {
    id: 1,
    name: "Riverside Medical Center",
    client: "Riverside Health Group",
    status: "active",
    budget: 900000,
    spent: 900000,
    startDate: "2025-01-15",
    endDate: "2027-01-15",
  },
  {
    id: 2,
    name: "Omaha Transit Hub",
    client: "City of Omaha",
    status: "active",
    budget: 1200000,
    spent: 820000,
    startDate: "2024-06-01",
    endDate: "2026-03-01",
  },
  {
    id: 3,
    name: "Westfield Library Expansion",
    client: "Westfield City Council",
    status: "planning",
    budget: 300000,
    spent: 45000,
    startDate: "2026-01-01",
    endDate: "2027-09-01",
  },
  {
    id: 4,
    name: "Denver Airport Concourse",
    client: "Denver Intl. Airport",
    status: "on-hold",
    budget: 450000,
    spent: 210000,
    startDate: "2024-03-01",
    endDate: "2026-12-01",
  },
];

router.get("/", (req: Request, res: Response): void => {
  res.json(mockProjects);
});

router.get("/:id", (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    res.status(404).json({ message: "Project not found" });
    return;
  }

  res.json(project);
});

export default router;