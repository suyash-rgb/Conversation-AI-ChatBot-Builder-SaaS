import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function SendVideoNode({ id, data }) {
  const [videoUrl, setVideoUrl] = useState(data.videoUrl || '');

  useEffect(() => {
    data.updateNode?.(id, { videoUrl });
  }, [videoUrl]);

  return (
    <div className="group bg-red-50 border border-red-300 rounded-md shadow p-3 w-60 relative">
      <p className="text-sm font-semibold text-red-600">🎥 Send Video</p>

      <input
        type="text"
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-red-400 hover:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
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
