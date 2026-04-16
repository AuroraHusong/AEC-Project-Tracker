import type { Project } from "../types/project";

const API_BASE_URL = "http://localhost:5000";

export const getProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }
    const data: Project[] = await response.json();
    return data;
};
export const getProjectById = async (id: number): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch project");
    }
    const data: Project = await response.json();
    return data;
}