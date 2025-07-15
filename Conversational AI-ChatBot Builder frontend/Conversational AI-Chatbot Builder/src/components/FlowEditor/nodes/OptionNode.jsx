import { Handle, Position, useReactFlow } from 'reactflow';
import { useState } from 'react';

export default function OptionNode({ id, data }) {
  const { deleteElements } = useReactFlow();
  const [value, setValue] = useState(data.option || '');

  const handleDelete = () => deleteElements({ nodes: [{ id }] });

  const handleChange = (e) => {
    setValue(e.target.value);
    data.updateNode?.(id, { option: e.target.value });
  };

  

  return (
    <div className="relative bg-green-100 border rounded-lg shadow w-40 h-40 p-3 group">
      <button
        onClick={handleDelete}
        className="absolute top-1 right-1 text-red-600 hover:text-red-800 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete Node"
      >
        ✖
      </button>

      <p className="text-xs font-semibold mb-1">⚪ Option</p>

      <input
        className="w-full text-xs border rounded px-1 py-0.5 focus:outline-none"
        value={value}
        onChange={handleChange}
        placeholder="Enter option label..."
      />

      <Handle type="target" position={Position.Top} id="in" />
      <Handle type="source" position={Position.Bottom} id="out" />
    </div>
  );
}
