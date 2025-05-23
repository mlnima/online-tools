"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const JsonEscapeUnescape: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEscape = () => {
    setError(null);
    try {
      setOutput(JSON.stringify(input).slice(1, -1)); // Remove wrapping quotes
    } catch {
      setError("Escape error");
      setOutput("");
    }
  };

  const handleUnescape = () => {
    setError(null);
    try {
      setOutput(JSON.parse('"' + input.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'));
    } catch {
      setError("Unescape error");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Escape/Unescape</h1>
      <p>Escape or unescape text for JSON string usage.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-escape-input" className={styles.label}>Input Text</label>
          <textarea
            id="json-escape-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={6}
            className={styles.inputArea}
            placeholder="Enter text to escape/unescape..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="json-escape-output" className={styles.label}>Result:</label>
              <textarea
                id="json-escape-output"
                value={output}
                readOnly
                rows={6}
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleEscape} className={styles.actionButton}>Escape</button>
        <button onClick={handleUnescape} className={styles.actionButton}>Unescape</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default JsonEscapeUnescape;

