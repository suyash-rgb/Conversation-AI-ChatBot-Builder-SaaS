import { Handle, Position } from 'reactflow';
import { useEffect, useState } from 'react';

export default function CarouselNode({ id, data }) {
  const [cards, setCards] = useState(data.cards || []);
  const [showPdfInput, setShowPdfInput] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    data.updateNode?.(id, { cards });
  }, [cards]);

  const updateCard = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const addCard = () => {
    setCards([...cards, { title: '', description: '', image: '', buttonText: '' }]);
  };

  const removeCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div className="group bg-purple-50 border border-purple-300 rounded-md shadow p-3 w-[280px] relative overflow-y-auto max-h-[300px]">
      <p className="text-sm font-semibold text-purple-700">📚 Carousel</p>

      {cards.map((card, idx) => (
        <div key={idx} className="mt-2 border-t pt-2 text-xs">
          <input
            className="w-full mb-1 p-1 border rounded"
            placeholder="Title"
            value={card.title}
            onChange={(e) => updateCard(idx, 'title', e.target.value)}
          />
          <input
            className="w-full mb-1 p-1 border rounded"
            placeholder="Description"
            value={card.description}
            onChange={(e) => updateCard(idx, 'description', e.target.value)}
          />
          <input
            className="w-full mb-1 p-1 border rounded"
            placeholder="Image URL"
            value={card.image}
            onChange={(e) => updateCard(idx, 'image', e.target.value)}
          />
          <input
            className="w-full mb-1 p-1 border rounded"
            placeholder="Button Text"
            value={card.buttonText}
            onChange={(e) => updateCard(idx, 'buttonText', e.target.value)}
          />
          <button
            className="text-red-400 hover:text-red-600 text-xs"
            onClick={() => removeCard(idx)}
          >
            🗑 Remove Card
          </button>
        </div>
      ))}

      <button
        className="w-full mt-2 bg-purple-200 hover:bg-purple-300 text-xs p-1 rounded"
        onClick={addCard}
      >
        ➕ Add Card
      </button>

      {/* Create from PDF */}
      <button
        className="w-full mt-2 bg-indigo-100 hover:bg-indigo-200 text-xs p-1 rounded"
        onClick={() => setShowPdfInput(!showPdfInput)}
      >
        📎 Create using PDF
      </button>

      {showPdfInput && (
        <input
          type="text"
          placeholder="Paste PDF URL or type here..."
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="w-full mt-1 p-1 text-xs border rounded"
        />
      )}

      {/* Duplicate + Delete */}
      <button
        onClick={() => data.duplicateNode?.(id)}
        className="absolute top-1 left-1 text-purple-400 hover:text-purple-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
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
