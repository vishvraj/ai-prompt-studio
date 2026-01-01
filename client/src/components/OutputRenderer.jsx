
import { useState } from "react";
import "./OutputRenderer.css";

export default function OutputRenderer({ result }) {
  const [showRaw, setShowRaw] = useState(false);

  let parsedJson = null;
  let displayContent = "";
  
  if (result) {
    try {
      parsedJson = JSON.parse(result);
    } catch {
      parsedJson = null;
    }

    displayContent = parsedJson && !showRaw
      ? JSON.stringify(parsedJson, null, 2)
      : result;
  } else {
    displayContent = "Run a prompt to see the output here...";
  }

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(displayContent);
    }
  };

  return (
    <div className="output-container">
      {/* Header */}
      <div className="output-header">
        <span className="output-title">Output</span>
        <div className="output-buttons">
          <button 
            className="copy-btn" 
            onClick={handleCopy}
            disabled={!result}
          >
            Copy
          </button>
          {parsedJson && (
            <button
              className="toggle-btn"
              onClick={() => setShowRaw(prev => !prev)}
            >
              {showRaw ? "Formatted View" : "Original View"}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <pre className={`output-content ${!result ? 'placeholder' : ''}`}>
        {displayContent}
      </pre>
    </div>
  );
}
