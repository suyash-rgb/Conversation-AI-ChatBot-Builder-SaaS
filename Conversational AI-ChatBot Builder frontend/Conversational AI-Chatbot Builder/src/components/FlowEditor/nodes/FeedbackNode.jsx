import { Handle, Position } from 'reactflow';
import { useState, useEffect } from 'react';

export default function FeedbackNode({ id, data }) {
  const [rating, setRating] = useState(data.rating || 0);
  const [comment, setComment] = useState(data.comment || '');

  useEffect(() => {
    data.updateNode?.(id, { rating, comment });
  }, [rating, comment]);

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        className={`text-xl ${
          star <= rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        onClick={() => setRating(star)}
        title={`${star} Star${star > 1 ? 's' : ''}`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="group bg-teal-50 border border-teal-300 rounded-md shadow p-3 w-64 relative">
      <p className="text-sm font-semibold text-teal-700">📝 Feedback</p>

      <div className="flex justify-center mt-2">{renderStars()}</div>

      <textarea
        className="w-full text-xs mt-2 p-1 border rounded"
        placeholder="Additional feedback..."
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Controls */}
      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-teal-400 hover:text-teal-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
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
