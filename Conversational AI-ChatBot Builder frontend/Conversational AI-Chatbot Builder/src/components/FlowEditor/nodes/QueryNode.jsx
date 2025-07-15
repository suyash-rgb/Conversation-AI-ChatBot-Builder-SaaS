import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function QueryNode({ id, data }) {
  const [placeholder, setPlaceholder] = useState(data.placeholder || 'Type your question here...');

  useEffect(() => {
    data.updateNode?.(id, { placeholder });
  }, [placeholder]);

  return (
    <div className="group bg-yellow-50 border border-yellow-300 rounded-md shadow p-3 w-64 relative">
      <p className="text-sm font-semibold text-yellow-700">🟨 Query Input</p>

      <input
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Edit placeholder..."
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
      />

      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-yellow-400 hover:text-yellow-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
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
