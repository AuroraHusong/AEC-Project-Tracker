import { useState, useEffect } from "react";
import type { Project } from "../types/project";
import { getProjects } from "../services/projectService";

interface UseProjectsInt {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const useProjects = (): UseProjectsInt => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchProjects = async (): Promise<void> => {
            try {
                const data = await getProjects();
                setProjects(data);
            }catch (err){
                setError("Failed to load")
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    },[]);
    return { projects, loading, error }
};
export default useProjects;