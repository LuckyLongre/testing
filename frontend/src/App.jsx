import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-white rounded-lg shadow-lg p-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Deterministic BRD generation with data lineage</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Anvaya.Ai is a "Source-of-Truth" reconciliation engine designed to transform fragmented business
            communications into verified Business Requirements Documents (BRDs). Leveraging a monorepo architecture
            and shared Zod contracts, our platform ingests multi-channel data to extract "Atomic Facts," detect
            requirement drift, and synthesize audit-ready BRDs with full provenance.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-md">
              <strong className="block text-gray-800">1. Stakeholder Mapping</strong>
              <div className="text-sm text-gray-600 mt-1">Identifies organizational hierarchy and authority.</div>
            </div>
            <div className="p-4 border rounded-md">
              <strong className="block text-gray-800">2. Contextual Extraction</strong>
              <div className="text-sm text-gray-600 mt-1">Maps facts to owners with native citations.</div>
            </div>
            <div className="p-4 border rounded-md">
              <strong className="block text-gray-800">3. DAG-Based Conflict Detection</strong>
              <div className="text-sm text-gray-600 mt-1">Identifies "Requirement Drift" with a directed acyclic graph.</div>
            </div>
            <div className="p-4 border rounded-md">
              <strong className="block text-gray-800">4. HITL Resolution</strong>
              <div className="text-sm text-gray-600 mt-1">Triggers human-in-the-loop intervention for high-stakes contradictions.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;