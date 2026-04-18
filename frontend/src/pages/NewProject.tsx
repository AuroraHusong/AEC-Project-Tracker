import { useNavigate } from "react-router-dom";
import {useState } from "react";
import type { ProjectStatus } from "../types/project";
import { createProject } from "../services/projectService";
import "./NewProject.css";
const NewProject = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [client, setClient] = useState("");
    const [status, setStatus] = useState<ProjectStatus>("planning");
    const [budget, setBudget] = useState("");
    const [spent, setSpent] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null)
        try{
            await createProject({
                name,
                client,
                status,
                budget: Number(budget),
                spent: Number(spent),
                start_date: startDate,
                end_date: endDate
            })
            navigate("/projects")
        } catch (err) {
            setError("Failed to create project")
        }finally{
            setSubmitting(false)
        }
    }


   return (
    <div className="page">
        <h1>New Project</h1>
        {error && <p className="form-error">{error}</p>}
        <form className="new-project-form" onSubmit={handleSubmit}>
        <label>
            Name
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </label>

        <label>
            Client
            <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
            />
        </label>

        <label>
            Status
            <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
            </select>
        </label>

        <label>
            Budget
            <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            />
        </label>

        <label>
            Spent
            <input
            type="number"
            value={spent}
            onChange={(e) => setSpent(e.target.value)}
            />
        </label>

        <label>
            Start Date
            <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            />
        </label>

        <label>
            End Date
            <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            />
        </label>

        <div className="form-actions">
            <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Project"}
            </button>
            <button type="button" onClick={() => navigate("/projects")}>
            Cancel
            </button>
        </div>
        </form>
    </div>
);
};

export default NewProject;

