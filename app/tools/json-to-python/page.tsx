"use client";
import React, { useState } from "react";
import styles from '../../styles/Tools.module.scss';

export default function JsonToPython() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function toPython(val: any): string {
    if (Array.isArray(val)) {
      return '[' + val.map(toPython).join(', ') + ']';
    } else if (typeof val === 'object' && val !== null) {
      return '{' + Object.entries(val).map(([k, v]) => `'${k}': ${toPython(v)}`).join(', ') + '}';
    } else if (typeof val === 'string') {
      return `'${val.replace(/'/g, "\\'")}'`;
    } else if (val === null) {
      return 'None';
    } else if (typeof val === 'boolean') {
      return val ? 'True' : 'False';
    } else {
      return String(val);
    }
  }

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(toPython(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to Python</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
        placeholder="Enter JSON..."
        className={styles.inputArea}
      />
      <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        className={styles.outputArea}
        style={{ marginTop: 12 }}
        placeholder="Python output..."
      />
    </div>
  );
}
