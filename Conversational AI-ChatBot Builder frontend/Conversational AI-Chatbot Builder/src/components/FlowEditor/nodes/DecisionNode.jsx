import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function DecisionNode({ id, data }) {
  const [condition, setCondition] = useState(data.condition || 'userQuery !== ""');

  useEffect(() => {
    data.updateNode?.(id, { condition });
  }, [condition]);

  return (
    <div className="group bg-gray-100 border border-gray-400 rounded-md shadow p-3 w-64 relative">
      <p className="text-sm font-semibold text-gray-800">🔀 Decision Node</p>

      <p className="text-xs text-gray-600 mt-1">Condition (JS expression):</p>
      <input
        className="w-full text-xs mt-1 p-1 border rounded"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder={`e.g., userQuery !== ""`}
      />

      {/* Controls */}
      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-gray-400 hover:text-gray-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
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

      {/* Handles */}
      <Handle type="target" position={Position.Top} id="in" />
      <Handle type="source" position={Position.Bottom} id="true" style={{ left: '30%' }} />
      <Handle type="source" position={Position.Bottom} id="false" style={{ left: '70%' }} />
    </div>
  );
}
