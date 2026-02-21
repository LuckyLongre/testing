import React, { useState } from 'react';
import { mapFacts } from '../../../../apis/api';
import PreviewStep2 from '../preview/PreviewStep2';
import { useProject } from '../../../providers/ProjectProvider';

export default function Step2({ project }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(false);
  const { fetchProject } = useProject();

  const handleRun = async () => {
    setError(null);
    setLoading(true);
    try {
      const relevantChats = project?.relevantChats ?? [];
      const resp = await mapFacts(project?.id, relevantChats);
      const facts = resp?.facts ?? resp?.data ?? resp ?? [];
      setResult(facts);
      setPreview(true);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  if (preview && result) {
    return (
      <PreviewStep2
        result={result}
        projectId={project?.id}
        onBack={() => setPreview(false)}
        onIncrementSuccess={async () => {
          const updated = await fetchProject(project?.id);
          setResult(updated?.facts ?? []);
        }}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="font-bold mb-4">Engine — Step 2: Synthesis</div>
      <p className="mb-4 text-sm text-slate-500">Run the synthesis agent to extract facts from communications and documents.</p>
      <div className="flex gap-3">
        <button
          onClick={handleRun}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold disabled:opacity-60"
        >
          {loading ? 'Running...' : 'Run Synthesis'}
        </button>
        {error && <div className="text-rose-500">{error}</div>}
      </div>
    </div>
  );
}
