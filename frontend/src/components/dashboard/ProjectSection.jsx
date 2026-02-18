import React, { useState, useEffect } from "react";
import "./ProjectSection.css";
import ProjectModal from "./ProjectModal";
import { useUser } from "../providers/UserProvider";
import { getProjects } from "../../api/api";
import ProjectCard from "../ProjectCard";

export default function ProjectSection() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setError("");
    if (!user) return;
    const id = user.id || user._id;
    if (!id) return;
    setLoading(true);
    try {
      const res = await getProjects(id);
      // our api wrapper returns response.data from axios, so structure is likely { success, data: { projects } }
      const projectsList = res?.data?.projects || res?.projects || res?.data || res || [];
      // normalize to array
      let final = [];
      if (Array.isArray(projectsList)) final = projectsList;
      else if (Array.isArray(res?.data?.projects)) final = res.data.projects;
      else if (Array.isArray(res?.projects)) final = res.projects;
      setProjects(final || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="project-section">
      <h2>Projects</h2>
      <button className="create-project-btn" onClick={() => setOpen(true)}>+ New Project</button>

      <div className="project-placeholder">
        {loading && <div>Loading projects...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && projects.length === 0 && <div>No projects yet. Create one to get started.</div>}

        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard key={p._id || p.id} project={p} />
          ))}
        </div>
      </div>

      <ProjectModal open={open} onClose={() => { setOpen(false); fetchProjects(); }} />
    </div>
  );
}
