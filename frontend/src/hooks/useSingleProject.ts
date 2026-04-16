import { useState, useEffect } from "react";
import type { Project } from "../types/project";
import { getProjectById} from "../services/projectService";

const useSingleProject = (id:string) => {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string |null>(null);

    useEffect(()=>{
        const fetchProject = async() =>{
            try{
                const data = await getProjectById(Number(id));
                setProject(data);
            }catch (err){
                setError("Failed to load")
            }finally{
                setLoading(false)
            }
        }
        fetchProject()
    }, [id])
    return {project, loading, error};
}
export default useSingleProject;