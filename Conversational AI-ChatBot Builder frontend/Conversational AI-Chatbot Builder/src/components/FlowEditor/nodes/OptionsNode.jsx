import { Handle, Position, useReactFlow } from 'reactflow';
import { useState } from 'react';

export default function OptionsNode({ id, data }) {
  const { deleteElements } = useReactFlow();
  const [options, setOptions] = useState(data.options || []);

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const updateOptions = (newOptions) => {
    setOptions(newOptions);
    data.updateNode?.(id, { options: newOptions });
  };

  const handleChange = (e, idx) => {
    const newOptions = [...options];
    newOptions[idx] = e.target.value;
    updateOptions(newOptions);
  };

  const handleAdd = () => {
    updateOptions([...options, '']);
  };
  
  return (
    <div className="bg-yellow-100 border rounded-lg shadow w-40 h-40 p-3 group relative">
      
      {/* Input handle */}
      <Handle type="target" position={Position.Top} id="in" />

      {/* Close button */}
      <button
        onClick={handleDelete}
        className="absolute top-1 right-1 text-red-600 hover:text-red-800 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        title="Delete Node"
      >
        ✖
      </button>

      <p className="text-xs font-semibold">🔘 Options</p>
      <div className="space-y-1 max-h-20 overflow-auto">
        {options.map((opt, idx) => (
          <input
            key={idx}
            className="w-full text-xs border rounded px-1 py-0.5 focus:outline-none"
            value={opt}
            onChange={(e) => handleChange(e, idx)}
            placeholder={`Option ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="mt-2 text-blue-600 text-xs hover:underline"
      >
        + Add Option
      </button>

      {/* Outgoing connection (bottom) */}
      <Handle type="source" position={Position.Bottom} id="out" />
      
    </div>
  );
}