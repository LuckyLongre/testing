import React, { useState } from "react";
import "./ProjectSection.css";
import ProjectModal from "../dashboard/ProjectModal";

export default function ProjectSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="project-section">
      <h2>Projects</h2>
      <button className="create-project-btn" onClick={() => setOpen(true)}>+ New Project</button>

      <div className="project-placeholder">Project section placeholder — will add features next</div>

      <ProjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
