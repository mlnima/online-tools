"use client";
import React from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToJavascriptAlt() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch {
      setError("Invalid Base64 input.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Base64 to Javascript (Alt)</h1>
      <div className={unifiedToolPageStyles.formRow}>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="base64-input" className={unifiedToolPageStyles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            placeholder="Enter Base64 string..."
            className={unifiedToolPageStyles.inputArea}
          />
        </div>
      </div>
      <div className={unifiedToolPageStyles.buttonRow}>
        <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
      </div>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <div className={unifiedToolPageStyles.formRow}>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="js-output" className={unifiedToolPageStyles.label}>Decoded Javascript</label>
          <textarea
            id="js-output"
            value={output}
            readOnly
            rows={8}
            placeholder="Decoded Javascript code..."
            className={unifiedToolPageStyles.outputArea}
          />
        </div>
      </div>
      {output && (
        <div className={unifiedToolPageStyles.buttonRow}>
          <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton}>Copy</button>
        </div>
      )}
    </div>
  );
}
