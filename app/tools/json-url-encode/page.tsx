"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonUrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEncode() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(encodeURIComponent(JSON.stringify(obj)));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>JSON URL Encode</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input-encode" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input-encode"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={3}
            placeholder="Paste JSON here..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="url-encoded-json-output" className={styles.label}>URL-encoded JSON</label>
          <textarea
            id="url-encoded-json-output"
            value={output}
            readOnly
            rows={6}
            placeholder="URL-encoded JSON output..."
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleEncode} className={styles.actionButton}>Encode</button>
        {output && (
          <button onClick={() => navigator.clipboard.writeText(output)} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
