import { Handle, Position, useReactFlow } from 'reactflow';
import { useState } from 'react';

export default function MessageNode({ id, data }) {
  const { deleteElements } = useReactFlow();
  const [text, setText] = useState(data.text || '');

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    data.updateNode?.(id, { text: value });
  };

  const isFirst = data?.isFirstMessageNode;

  return (
    <div className="relative bg-white border rounded-lg shadow w-40 h-40 p-3 group">
      {/* Conditionally render incoming connection (top) */}
      {!isFirst && (
        <Handle type="target" position={Position.Top} id="in" />
      )}

      {/* Copy Node button */}
      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-blue-500 hover:text-blue-700 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        title="Duplicate Node"
      >
        📄
      </button>

      {/* Close button */}
      <button
        onClick={handleDelete}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete Node"
      >
        ✖
      </button>

      <p className="text-sm font-semibold">💬 Message</p>
      <textarea
        className="w-full h-20 text-xs border rounded p-1 resize-none focus:outline-none"
        value={text}
        onChange={handleChange}
        placeholder="Enter message..."
      />

      {/* Always render outgoing connection (bottom) */}
      <Handle type="source" position={Position.Bottom} id="out" />
    </div>
  );
}