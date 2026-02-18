import React, { useState } from "react";
import "./ProjectModal.css";
import { createProject } from "../../api/api";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

export default function ProjectModal({ open, onClose }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const resetForm = () => {
    setProjectName("");
    setProjectDescription("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!projectName.trim() || !projectDescription.trim()) {
      setError("Both fields are required and cannot be empty.");
      return;
    }

    const id = user?.id || user?._id;
    if (!id) {
      setError("User ID not available. Please login again.");
      return;
    }

    setLoading(true);
    try {
      const resp = await createProject({ projectName, project_description: projectDescription, id });
      const created = resp?.data?.data?.project || resp?.data?.project || resp?.data || resp;
      const projectId = created?._id || created?.id || created?.project?._id;

      resetForm();
      onClose();

      if (projectId) navigate(`/project/${projectId}`);
      else navigate(`/project`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h3>Create New Project</h3>
          <button className="modal-close" onClick={() => { onClose(); resetForm(); }}>&times;</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <label>
            Project Name
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              placeholder="Short, descriptive project title"
            />
          </label>

          <label>
            Project Description
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
              placeholder="Describe the project in detail to help generate a focused BRD..."
              rows={8}
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn secondary" onClick={() => { onClose(); resetForm(); }} disabled={loading}>Cancel</button>
            <button type="submit" className="btn primary" disabled={loading}>{loading ? "Creating..." : "Create Project"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
