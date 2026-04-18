import useProjects from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import "./ProjectList.css";
import { useNavigate } from "react-router-dom"

const ProjectList = () => {
  const { projects, loading, error } = useProjects();
  const navigate = useNavigate();
  if (loading) return <div className="state-message">Loading projects...</div>;
  if (error) return <div className="state-message error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p className="page-subtitle">Data-Driven Design</p>
        </div>
        <button className="new-project-btn" onClick={() => navigate("/projects/new")}>
          + New project
      </button>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total projects</span>
          <span className="stat-value">{projects.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active</span>
          <span className="stat-value active">
            {projects.filter((p) => p.status === "active").length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total budget</span>
          <span className="stat-value">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(projects.reduce((sum, p) => sum + Number(p.budget), 0))}
          </span>
        </div>
      </div>
      <input
        type="text"
        className="search-bar"
        placeholder="Search projects..."
      />
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;