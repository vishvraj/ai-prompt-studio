import { useState, useEffect } from "react";
import ModelSelector from "./ModelSelector";
import "./DynamicForm.css";

export default function DynamicForm({ template, onSubmit, loading }) {
  const [values, setValues] = useState({});
  const [modelId, setModelId] = useState("");

  // Reset form values and model when template changes
  useEffect(() => {
    setValues({});
    setModelId("");
  }, [template]);

  const handleChange = (name, value) =>
    setValues(prev => ({ ...prev, [name]: value }));

  return (
    <div className="form-container">

      {/* MODEL SELECTOR */}
      <ModelSelector key={template.id} onSelect={setModelId} />

      {template.inputs.map(input => (
        <div key={input.name} className="form-field">
          <label>{input.name}</label>

          {input.type === "textarea" && (
            <textarea
              placeholder={`Enter ${input.name}`}
              onChange={e => handleChange(input.name, e.target.value)}
            />
          )}

          {input.type === "select-search" && (
            <>
              <input
                list={`${input.name}-list`}
                placeholder={`Select ${input.name}`}
                onChange={e => handleChange(input.name, e.target.value)}
              />
              <datalist id={`${input.name}-list`}>
                {input.options.map(opt => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
            </>
          )}

          {input.type === "text" && (
            <input
              placeholder={`Enter ${input.name}`}
              onChange={e => handleChange(input.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        className={`run-btn ${loading ? "loading" : ""}`}
        onClick={() => onSubmit({ ...values, modelId })}
        disabled={loading || !modelId}
      >
        {loading ? "Running..." : "Run"}
      </button>
    </div>
  );
}
