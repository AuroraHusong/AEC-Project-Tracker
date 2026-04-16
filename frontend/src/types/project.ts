export type ProjectStatus = "planning" | "active" | "on-hold" | "completed";

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
}