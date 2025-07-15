import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function HumanTakeoverNode({ id, data }) {
  const [note, setNote] = useState(data.note || 'A human agent will now assist you.');
  const [agent, setAgent] = useState(data.agent || '');

  useEffect(() => {
    data.updateNode?.(id, { note, agent });
  }, [note, agent]);

  return (
    <div className="group bg-pink-50 border border-pink-300 rounded-md shadow p-3 w-64 relative">
      <p className="text-sm font-semibold text-pink-700">🧑‍💼 Human Takeover</p>

      <textarea
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Takeover message..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
      />

      <input
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Agent name / team (optional)"
        value={agent}
        onChange={(e) => setAgent(e.target.value)}
      />

      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-pink-400 hover:text-pink-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        title="Duplicate"
      >
        📄
      </button>
      <button
        onClick={() => data.updateNode?.(id, { delete: true })}
        className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete"
      >
        ✖
      </button>

      <Handle type="target" position={Position.Top} id="in" />
      <Handle type="source" position={Position.Bottom} id="out" />
    </div>
  );
}
