import React, { useState } from 'react';
import { FiArrowLeft, FiFileText, FiChevronRight } from 'react-icons/fi';
import { increamentProjectStatus } from '../../../../apis/api';
import { useProject } from '../../../providers/ProjectProvider';

export default function PreviewStep2({ result, onBack, projectId, onIncrementSuccess }) {
  const facts = Array.isArray(result) ? result : result?.data || [];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchProject } = useProject();

  const handleProceed = async () => {
    setError(null);
    setLoading(true);
    try {
      await increamentProjectStatus(projectId);
      await fetchProject(projectId);
      if (onIncrementSuccess) onIncrementSuccess();
    } catch (err) {
      console.error('PreviewStep2 commit error:', err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden p-6 relative">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Extracted Facts</h3>
            <p className="text-[10px] text-slate-400">{facts.length} facts identified</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleProceed}
            disabled={loading}
            className="group flex items-center gap-3 px-5 py-2 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase shadow-sm disabled:opacity-60"
          >
            {loading ? 'Committing...' : 'Commit & Proceed to Step 3'}
            <FiChevronRight />
          </button>
          {error && <span className="text-rose-500 text-[10px]">{error}</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 gap-3">
          {facts.map((f, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white border rounded-lg flex items-center justify-center text-slate-400">
                  <FiFileText />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black text-slate-800">{f.content || f.fact || 'Untitled fact'}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{f.source} • {f.tone} • {f.when}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
