export type ProjectStatus = "planning" | "active" | "on-hold" | "completed";

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  budget: number;
  spent: number;
  start_date: string;
  end_date: string;
}