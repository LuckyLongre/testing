import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectSidebar({ project }) {
  if (!project) return null;

  const initials = (project.projectName || project.name || 'P').split(' ').map(s => s[0]).slice(0,2).join('');
  const statusMap = { 0: 'Just initialised', 1: 'Active', 2: 'Archived' };

  return (
    <aside className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-lg">{initials}</div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{project.projectName || project.name || 'Untitled Project'}</div>
          <div className="text-xs text-gray-500">{statusMap[project.status] ?? `Status ${project.status}`}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <div><strong className="text-gray-800">Owner:</strong> {project.userId ?? '—'}</div>
        <div className="mt-2"><strong className="text-gray-800">Created:</strong> {project.createdAt ? new Date(project.createdAt).toLocaleString() : '—'}</div>
      </div>

      <nav className="mt-6 grid gap-2">
        <Link to={`/project/${project.id || project._id || project.projectId}/facts`} className="text-sm px-3 py-2 rounded hover:bg-gray-50">Facts</Link>
        <Link to={`/project/${project.id || project._id || project.projectId}/stakeholders`} className="text-sm px-3 py-2 rounded hover:bg-gray-50">Stakeholders</Link>
        <Link to={`/project/${project.id || project._id || project.projectId}/contradictions`} className="text-sm px-3 py-2 rounded hover:bg-gray-50">Contradictions</Link>
        <Link to={`/project/${project.id || project._id || project.projectId}/resolutions`} className="text-sm px-3 py-2 rounded hover:bg-gray-50">Resolutions</Link>
      </nav>

    </aside>
  );
}
