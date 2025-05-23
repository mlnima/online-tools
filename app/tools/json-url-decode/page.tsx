"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonUrlDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecode() {
    setError("");
    try {
      const decoded = decodeURIComponent(input);
      const obj = JSON.parse(decoded);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setError("Invalid URL-encoded JSON.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>JSON URL Decode</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="url-json-input" className={styles.label}>URL-encoded JSON</label>
          <textarea
            id="url-json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={3}
            placeholder="Paste URL-encoded JSON here..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="decoded-json-output" className={styles.label}>Decoded JSON</label>
          <textarea
            id="decoded-json-output"
            value={output}
            readOnly
            rows={6}
            placeholder="Decoded JSON output..."
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleDecode} className={styles.actionButton}>Decode</button>
        {output && (
          <button onClick={() => navigator.clipboard.writeText(output)} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
