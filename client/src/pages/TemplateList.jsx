import { useEffect, useState } from "react";
import axios from "axios";
import "./TemplateList.css";

const API_BASE = import.meta.env.VITE_SERVER_API_BASE;

export default function TemplateList({ onSelect }) {
  const [templates, setTemplates] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/prompt/templates`)
      .then(res => setTemplates(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = template => {
    setActiveId(template.id);
    onSelect(template);
  };

  return (
    <div className="template-list">
      <h3 className="template-title">Prompt Templates</h3>

      {/* SHOW ONLY WHEN NO TEMPLATE SELECTED */}
      {!activeId && (
        <p className="template-hint">Select a template</p>
      )}

      <div className="template-buttons">
        {templates.map(t => (
          <button
            key={t.id}
            className={`template-btn ${activeId === t.id ? "active" : ""}`}
            onClick={() => handleSelect(t)}
          >
            {t.title}
          </button>
        ))}
      </div>
    </div>
  );
}
