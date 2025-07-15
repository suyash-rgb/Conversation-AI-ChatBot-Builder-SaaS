import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function SendImageNode({ id, data }) {
  const [imageUrl, setImageUrl] = useState(data.imageUrl || '');

  useEffect(() => {
    data.updateNode?.(id, { imageUrl });
  }, [imageUrl]);

  return (
    <div className="group bg-blue-50 border border-blue-300 rounded-md shadow p-3 w-60 relative">
      <p className="text-sm font-semibold text-blue-600">🖼 Send Image</p>

      <input
        type="text"
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      {/* Buttons */}
      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-blue-400 hover:text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
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
