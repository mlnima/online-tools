"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToTSV() {
  const [base64, setBase64] = useState("");
  const [tsv, setTsv] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setTsv(decoded);
    } catch (e) {
      setTsv("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (tsv) navigator.clipboard.writeText(tsv);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to TSV</h1>
      <p>Decode Base64 string to TSV text.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="tsv-output" className={styles.label}>TSV Output:</label>
          <textarea
            id="tsv-output"
            rows={3}
            className={styles.outputArea}
            value={tsv}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!tsv} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}
