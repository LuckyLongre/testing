import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../apis/api';
import ProjectSidebar from '../components/projectSubComponents/ProjectSidebar';

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    getProjectById(id)
      .then((res) => {
        const data = res?.data ?? res;
        if (mounted) setProject(data);
      })
      .catch((err) => {
        console.error('Failed to load project', err);
        if (mounted) setError(err?.message || 'Failed to load project');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [id]);

  const statusMap = { 0: 'Just initialised', 1: 'Active', 2: 'Archived' };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-[280px_1fr]">
        <div>
          {project ? (
            // Sidebar first
            <div className="sticky top-6">
              <ProjectSidebar project={project} />
            </div>
          ) : null}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Project</h2>
            <Link to="/dashboard" className="text-sm text-indigo-600 hover:underline">Back to dashboard</Link>
          </div>

          {loading ? (
            <div className="p-6 bg-white rounded shadow text-center">Loading…</div>
          ) : error ? (
            <div className="p-6 bg-red-50 text-red-700 rounded">{String(error)}</div>
          ) : !project ? (
            <div className="p-6 bg-white rounded shadow">No project found.</div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{project.projectName || project.name || 'Untitled Project'}</h3>
                  <div className="mt-1 text-sm text-gray-500">{statusMap[project.status] ?? `Status ${project.status}`}</div>
                </div>
              </div>

              {project.project_description ? (
                <p className="mt-4 text-gray-700">{project.project_description}</p>
              ) : null}

              <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <div className="text-xs text-gray-500">Sources</div>
                  <div className="mt-1">
                    {(Array.isArray(project.included_messaging_source) && project.included_messaging_source.length)
                      ? project.included_messaging_source.join(', ')
                      : '—'}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Files</div>
                  <div className="mt-1">
                    {(Array.isArray(project.files) && project.files.length) ? project.files.join(', ') : '—'}
                  </div>
                </div>
              </div>

              {project.brdMdx ? (
                <div className="mt-6">
                  <div className="text-xs text-gray-500">BRD (MDX)</div>
                  <pre className="mt-2 max-h-48 overflow-auto p-3 bg-gray-50 rounded text-xs text-gray-800">{project.brdMdx}</pre>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
