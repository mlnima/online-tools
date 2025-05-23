"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

import { useState } from "react";

function cleanJson(input: string): string {
  // Remove comments (// and /* */)
  let cleaned = input.replace(/\/\*.*?\*\//gs, "").replace(/\/\/.*$/gm, "");
  // Remove trailing commas
  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");
  return cleaned;
}

export default function JsonCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClean = () => {
    try {
      const cleaned = cleanJson(input);
      const obj = JSON.parse(cleaned);
      setOutput(JSON.stringify(obj, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON Cleaner</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className={styles.inputArea}
            placeholder="Paste your JSON here..."
          />
        </div>
        <div className={styles.outputColumn}>
          {output && (
            <>
              <label htmlFor="cleaned-json-output" className={styles.label}>Cleaned JSON:</label>
              <textarea 
                id="cleaned-json-output" 
                value={output} 
                readOnly 
                rows={10}  // Adjusted rows to match input for consistency
                className={styles.outputArea}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleClean} className={styles.actionButton}>Clean JSON</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

