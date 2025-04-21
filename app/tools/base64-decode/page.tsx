"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64Decode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecode() {
    setError("");
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (e) {
      setError("Invalid Base64 string.");
      setOutput("");
    }
  }
  return (
    <div className={styles.toolPage}>
      <h1>Base64 Decode</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label className={styles.label} htmlFor="base64input">Base64 Input</label>
          <textarea id="base64input" className={styles.inputArea} placeholder="Paste Base64 string here..." value={input} onChange={e => setInput(e.target.value)} />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleDecode} className={styles.actionButton}>Decode</button>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label className={styles.label}>Decoded Output</label>
          <textarea className={styles.outputArea} value={output} readOnly />
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
