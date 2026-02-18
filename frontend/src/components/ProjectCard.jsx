import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  if (!project) return null;

  const id = project._id || project.id || project.project?._id;
  const name = project.projectName || project.project_name || "Untitled Project";
  const desc = project.project_description || project.description || "";
  const status = project.status || "unknown";
  const files = Array.isArray(project.files) ? project.files : [];
  const sources = Array.isArray(project.included_messaging_source) ? project.included_messaging_source : [];
  const createdAt = project.createdAt || project.created_at || project.created;

  const shortDesc = desc ? (desc.length > 140 ? desc.slice(0, 137) + "..." : desc) : "No description provided.";

  return (
    <div className="project-card" onClick={() => id && navigate(`/project/${id}`)} role="button" tabIndex={0}>
      <div className="pc-header">
        <h4 className="pc-title">{name}</h4>
        <span className={`pc-status pc-status-${status.replace(/\s+/g, "-").toLowerCase()}`}>{status}</span>
      </div>

      <p className="pc-desc">{shortDesc}</p>

      <div className="pc-meta">
        <span>{files.length} file{files.length !== 1 ? "s" : ""}</span>
        <span>{sources.length} source{sources.length !== 1 ? "s" : ""}</span>
        {createdAt && <span className="pc-created">{new Date(createdAt).toLocaleDateString()}</span>}
      </div>
    </div>
  );
}
