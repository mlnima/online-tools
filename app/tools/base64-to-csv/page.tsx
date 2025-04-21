"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToCSV() {
  const [base64, setBase64] = useState("");
  const [csv, setCsv] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setCsv(decoded);
    } catch (e) {
      setCsv("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (csv) navigator.clipboard.writeText(csv);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to CSV</h1>
      <p>Decode Base64 string to CSV text.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Paste Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={styles.inputArea}
          />
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="csv-output" className={styles.label}>CSV Output</label>
          <textarea
            id="csv-output"
            value={csv}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!csv}>Copy Output</button>
      </div>
    </div>
  );
}

