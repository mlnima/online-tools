"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonToTextConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>JSON to Text Converter</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste JSON here..."
        className={styles.inputArea}
        style={{ width: '100%' }}
      />
      <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="Text output..."
        className={styles.outputArea}
        style={{ width: '100%' }}
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={styles.actionButton}>Copy</button>
      )}
    </div>
  );
}
