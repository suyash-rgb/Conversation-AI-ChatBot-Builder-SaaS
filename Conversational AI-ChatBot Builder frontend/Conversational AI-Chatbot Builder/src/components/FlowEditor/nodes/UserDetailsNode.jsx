import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

const fieldLabels = {
  username: 'Username',
  phone: 'Phone Number',
  email: 'Email ID',
  location: 'Location',
};

export default function UserDetailsNode({ id, data }) {
  const [fields, setFields] = useState(data.fields || []);

  useEffect(() => {
    data.updateNode?.(id, { fields });
  }, [fields]);

  const toggleField = (field) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  return (
    <div className="group bg-indigo-50 border border-indigo-300 rounded-md shadow p-3 w-64 relative">
      <p className="text-sm font-semibold text-indigo-700">🧾 User Details Form</p>

      <div className="mt-2 space-y-1 text-xs">
        {Object.keys(fieldLabels).map((field) => (
          <label key={field} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={fields.includes(field)}
              onChange={() => toggleField(field)}
            />
            <span>{fieldLabels[field]}</span>
          </label>
        ))}
      </div>

      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-indigo-400 hover:text-indigo-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
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
