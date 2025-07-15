import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function SendDocumentNode({ id, data }) {
  const [docUrl, setDocUrl] = useState(data.docUrl || '');
  const [fileName, setFileName] = useState(data.fileName || '');

  useEffect(() => {
    data.updateNode?.(id, { docUrl, fileName });
  }, [docUrl, fileName]);

  return (
    <div className="group bg-gray-50 border border-gray-300 rounded-md shadow p-3 w-64 relative">
      <p className="text-sm font-semibold text-gray-700">📄 Send Document</p>

      <input
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Document URL"
        value={docUrl}
        onChange={(e) => setDocUrl(e.target.value)}
      />

      <input
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Optional file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />

      {/* Buttons */}
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

      <Handle type="target" position={Position.Top} id="in" />
      <Handle type="source" position={Position.Bottom} id="out" />
    </div>
  );
}
