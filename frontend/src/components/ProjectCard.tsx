import type { Project, ProjectStatus } from "../types/project";
import "./ProjectCard.css"
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const getStatusBadgeClass = (status: ProjectStatus): string => {
  switch (status) {
    case "active":    return "badge-active";
    case "planning":  return "badge-planning";
    case "on-hold":   return "badge-hold";
    case "completed": return "badge-done";
  }
};

const getProgressColor = (spent: number, budget: number): string => {
  const percent = (spent / budget) * 100;
  if (percent >= 85) return "#E24B4A";
  if (percent >= 60) return "#EF9F27";
  return "#1D9E75";
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();
  const { id, name, client, status, budget, spent, endDate } = project;
  const progressPercent = Math.round((spent / budget) * 100);

  return (
    <div className="project-card" onClick={() => navigate(`/projects/${id}`)}>
      <div className="card-header">
        <h3 className="card-title">{name}</h3>
        <span className={`badge ${getStatusBadgeClass(status)}`}>
          {status}
        </span>
      </div>
      <p className="card-client">{client}</p>
      <div className="card-budget">
        <span className="budget-label">Budget used</span>
        <span className="budget-value">
          {formatCurrency(spent)} / {formatCurrency(budget)}
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${progressPercent}%`,
            background: getProgressColor(spent, budget),
          }}
        />
      </div>
      <p className="card-due">Due {new Date(endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
    </div>
  );
};

export default ProjectCard;