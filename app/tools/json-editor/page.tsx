"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const JsonEditor: React.FC = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    setError(null);
    try {
      setFormatted(JSON.stringify(JSON.parse(input), null, 2));
    } catch (e: any) {
      setError("Invalid JSON");
      setFormatted("");
    }
  };

  const handleCopy = () => {
    if (formatted) navigator.clipboard.writeText(formatted);
  };

  const isValid = (() => {
    try { JSON.parse(input); return true; } catch { return false; }
  })();

  return (
    <div className={styles.toolPage}>
      <h1>JSON Editor</h1>
      <p>Edit and validate JSON. Pretty-print and copy!</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input-editor" className={styles.label}>JSON Input/Editor</label>
          <textarea
            id="json-input-editor"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste or write your JSON here..."
          />
          {/* Removed parent div with inline margin, margins will come from successText/error class */}
          <span className={isValid ? styles.successText : styles.error}>
            {isValid ? "Valid JSON" : "Invalid JSON"}
          </span>
        </div>
        <div className={styles.outputColumn}>
          {formatted && (
            <>
              <label htmlFor="formatted-json-output" className={styles.label}>Formatted JSON:</label>
              <textarea
                id="formatted-json-output"
                value={formatted}
                readOnly
                rows={10}
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleFormat} className={styles.actionButton} disabled={!isValid}>Pretty Print</button>
        {formatted && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default JsonEditor;

