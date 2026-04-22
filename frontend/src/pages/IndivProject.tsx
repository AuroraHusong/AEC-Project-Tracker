import { useParams, useNavigate } from "react-router-dom";
import useSingleProject from "../hooks/useSingleProject";
import type { ProjectStatus } from "../types/project";
import "./IndivProject.css";
import Comments from "../components/Comments";
import { deleteProject } from "../services/projectService";

const getStatusBadgeClass = (status: ProjectStatus): string => {
  switch (status) {
    case "active":    return "badge-active";
    case "planning":  return "badge-planning";
    case "on-hold":   return "badge-hold";
    case "completed": return "badge-done";
  }
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};


const IndivProject = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const { project, loading, error } = useSingleProject(id!)

    const handleDelete = async () => {
      if (!project) return
      const confirmed = window.confirm("Are you sure you want to delete");
      if(!confirmed)return;
      try {
        await deleteProject(project.id);
        navigate("/")
      } catch (err) {
        alert("Failed to delete")
      }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!project) return <div>Project not found</div>;
    return(
        <div className="page">
<button className="back-btn" onClick={() => navigate("/")}>
  ← Back to projects
</button>
            <div className="detail-header">
            <div>
                <h1>{project.name}</h1>
                <p className="detail-client">Client: {project.client}</p>
            </div>
            <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                {project.status}
            </span>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
            </div>
            <div className="stats-grid">
            <div className="stat">
                <span className="stat-label">Total budget</span>
                <span className="stat-val">{formatCurrency(project.budget)}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Spent</span>
                <span className="stat-val">{formatCurrency(project.spent)}</span>
            </div>
            <div className="stat">
                <span className="stat-label">Remaining</span>
                <span className="stat-val">{formatCurrency(project.budget - project.spent)}</span>
            </div>
            </div>
            <div className="section">
            <p className="section-title">Timeline</p>
            <div className="timeline-row">
            <div>
                <p>{formatDate(project.start_date)}</p>
                <p className="timeline-label">Start date</p>
            </div>
            <div className="timeline-line"></div>
            <div>
                <p>{formatDate(project.end_date)}</p>
                <p className="timeline-label">End date</p>
            </div>
            </div>
            </div>
            <Comments projectId={project.id} />
        </div>
    )
}   

export default IndivProject;