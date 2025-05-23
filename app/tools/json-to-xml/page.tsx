"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonToXml() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function toXml(obj: any, tag = "root"): string {
    if (Array.isArray(obj)) {
      return obj.map(item => toXml(item, tag)).join("");
    } else if (typeof obj === 'object' && obj !== null) {
      return `<${tag}>` + Object.entries(obj).map(([k, v]) => toXml(v, k)).join("") + `</${tag}>`;
    } else {
      return `<${tag}>${String(obj)}</${tag}>`;
    }
  }

  function handleConvert() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(toXml(obj));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>JSON to XML</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            rows={10} // Default rows
            placeholder="Enter JSON..."
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="xml-output" className={styles.label}>XML Output</label>
          <textarea
            id="xml-output"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={10} // Default rows
            placeholder="XML output..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={() => navigator.clipboard.writeText(output)} className={styles.actionButton} disabled={!output}>Copy Output</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
