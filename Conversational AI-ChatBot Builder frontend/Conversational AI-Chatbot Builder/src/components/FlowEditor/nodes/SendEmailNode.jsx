import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function SendEmailNode({ id, data }) {
  const [email, setEmail] = useState(data.email || '');
  const [subject, setSubject] = useState(data.subject || '');
  const [message, setMessage] = useState(data.message || '');

  useEffect(() => {
    data.updateNode?.(id, { email, subject, message });
  }, [email, subject, message]);

  return (
    <div className="group bg-blue-50 border border-blue-300 rounded-md shadow p-3 w-60 relative">
      <p className="text-sm font-semibold text-blue-600">📧 Send Email</p>

      <input
        type="text"
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="To"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="w-full text-xs mt-1 p-1 border rounded"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        rows={2}
        className="w-full text-xs mt-1 p-1 border rounded"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Duplicate Button */}
      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-blue-400 hover:text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        title="Duplicate"
      >
        📄
      </button>

      {/* Delete Button */}
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
