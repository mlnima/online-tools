"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";


export default function JsonUnminify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleUnminify() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>JSON Unminify</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={10}
        placeholder="Paste your minified JSON here..."
        className={styles.inputArea}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={handleUnminify} className={styles.actionButton}>Unminify</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {output && (
        <div style={{ marginTop: 24 }}>
          <h3>Unminified JSON:</h3>
          <textarea
            value={output}
            readOnly
            rows={10}
            className={styles.outputArea}
            style={{ width: '100%' }}
          />
          <button onClick={handleCopy} className={styles.actionButton}  >Copy</button>
        </div>
      )}
    </div>
  );
}
