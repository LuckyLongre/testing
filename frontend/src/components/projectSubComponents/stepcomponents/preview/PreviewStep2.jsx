import React, { useState } from 'react';
import { FiArrowLeft, FiFileText, FiChevronRight } from 'react-icons/fi';
import { increamentProjectStatus } from '../../../../apis/api';
import { useProject } from '../../../providers/ProjectProvider';

export default function PreviewStep2({ result, onBack, projectId, onIncrementSuccess }) {
  // Normalize backend response shapes:
  // - raw array
  // - { savedFacts: [...] }
  // - { data: { savedFacts: [...] } }
  let facts = [];
  let relatedChats = [];
  if (Array.isArray(result)) facts = result;
  else if (Array.isArray(result?.savedFacts)) facts = result.savedFacts;
  else if (Array.isArray(result?.data?.savedFacts)) facts = result.data.savedFacts;
  else if (Array.isArray(result?.data)) facts = result.data;

  if (Array.isArray(result?.relatedChats)) relatedChats = result.relatedChats;
  else if (Array.isArray(result?.data?.relatedChats)) relatedChats = result.data.relatedChats;
  const rawModelResponse = result?.rawModelResponse ?? result?.data?.rawModelResponse ?? null;
  const fileLinks = result?.fileLinks ?? result?.data?.fileLinks ?? [];
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

  const renderContent = (content) => {
    if (content == null) return 'Untitled fact';
    if (typeof content === 'string') return content;
    try {
      if (typeof content === 'object') {
        // prefer common text field
        if (content.text) return content.text;
        if (content.content) return content.content;
        return JSON.stringify(content);
      }
      return String(content);
    } catch (e) {
      return String(content);
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
            <div key={f.id ?? i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white border rounded-lg flex items-center justify-center text-slate-400">
                  <FiFileText />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black text-slate-800">{renderContent(f.content || f.fact)}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{f.source || 'unknown source'} • {f.tone || 'unknown'} • {f.when ? new Date(f.when).toLocaleString() : 'unknown'}</div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
                    <div><strong>ID:</strong> <span className="text-slate-700">{f.id ?? '—'}</span></div>
                    <div><strong>Source Type:</strong> <span className="text-slate-700">{f.sourceType ?? '—'}</span></div>
                    <div><strong>Resolved:</strong> <span className="text-slate-700">{String(f.resolved)}</span></div>
                    <div><strong>Stakeholder ID:</strong> <span className="text-slate-700">{f.stackHolderId ?? '—'}</span></div>
                    <div><strong>Project ID:</strong> <span className="text-slate-700">{f.projectId ?? '—'}</span></div>
                    <div><strong>Raw Source:</strong> <span className="text-slate-700 break-all">{f.source ?? '—'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* File links and raw model response (if provided) */}
          {fileLinks.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-bold text-slate-700">File Links</div>
              {fileLinks.map((fl, idx) => (
                <a key={fl.url ?? idx} href={fl.url} target="_blank" rel="noreferrer" className="block text-[12px] text-indigo-600 mt-1">{fl.name}</a>
              ))}
            </div>
          )}
          {rawModelResponse && (
            <div className="mt-4">
              <div className="text-sm font-bold text-slate-700">Raw Model Response (truncated)</div>
              <pre className="text-[11px] text-slate-500 mt-2 whitespace-pre-wrap max-h-48 overflow-auto p-2 bg-slate-100 rounded">{String(rawModelResponse).slice(0, 2000)}</pre>
            </div>
          )}
          {relatedChats.length > 0 && (
            <>
              <div className="mt-4 text-sm font-bold text-slate-700">Related Chats (whs)</div>
              {relatedChats.map((c, idx) => (
                <div key={c.id ?? idx} className="p-3 bg-white border border-slate-100 rounded-md mt-2">
                  <div className="text-sm font-black text-slate-800">{c.text}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{c.speaker} • {c.when ? new Date(c.when).toLocaleString() : 'unknown'}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
