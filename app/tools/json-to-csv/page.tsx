"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const arr = JSON.parse(input);
      if (!Array.isArray(arr) || arr.length === 0 || typeof arr[0] !== 'object') {
        throw new Error();
      }
      const keys = Object.keys(arr[0]);
      const csv = [keys.join(",")].concat(
        arr.map((row: any) => keys.map(k => JSON.stringify(row[k] ?? "")).join(","))
      ).join("\n");
      setOutput(csv);
    } catch {
      setError("Invalid JSON array of objects.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON to CSV</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
        placeholder="Enter JSON array of objects..."
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
        placeholder="CSV output..."
      />
    </div>
  );
}
