import { useEffect, useState } from "react";
import axios from "axios";
import "./ModelSelector.css";

const API_BASE = import.meta.env.VITE_SERVER_API_BASE;
export default function ModelSelector({ onSelect }) {
  const [models, setModels] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/models`)
      .then(res => setModels(res.data));
  }, []);

  const selectedModel = models.find(m => m.id === selectedId);

  return (
    <div className="model-selector">
      <label>AI Model</label>

      <select
        value={selectedId}
        onChange={e => {
          setSelectedId(e.target.value);
          onSelect(e.target.value);
        }}
      >
        <option value="">Select model</option>
        {models.map(m => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>

      {/* SHOW ONLY SELECTED MODEL DESCRIPTION */}
      {selectedModel && (
        <div className="model-info model-desc">
          <strong>{selectedModel.label}</strong>
          <p>{selectedModel.description}</p>
          <span>Best for: {selectedModel.bestFor}</span>
        </div>
      )}
    </div>
  );
}


