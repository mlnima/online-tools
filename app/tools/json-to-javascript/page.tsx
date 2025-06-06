"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonToJavascript() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }

  return (
      <div className={styles.toolPage}>
    <h1>JSON to JavaScript</h1>
    <div className={styles.formRow}>
      <div className={styles.inputColumn}>
              <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={8}
                  className={styles.inputArea}
                  placeholder="Enter JSON..."
              />
      </div>
      <div className={styles.inputColumn}>
              <textarea
                  value={output}
                  readOnly
                  rows={8}
                  className={styles.outputArea}
                  placeholder="JavaScript output..."
              />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
      <button onClick={handleConvert} className={styles.actionButton} style={{ minWidth: 140, fontSize: 17 }}>Convert</button>
    </div>
    {error && <div className={styles.error} style={{ marginTop: 16, textAlign: 'center' }}>{error}</div>}
  </div>
);
}
