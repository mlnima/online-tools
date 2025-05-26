"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CsvToBase64Client = () => {
  const [csv, setCsv] = useState("");
  const [base64, setBase64] = useState("");

  const handleConvert = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(csv)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid CSV input");
    }
  };

  const handleCopy = () => {
    if (base64) navigator.clipboard.writeText(base64);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSV to Base64</h1>
      <p>Encode CSV text to Base64 (UTF-8 encoded).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="csv-input" className={styles.label}>CSV Input</label>
          <textarea
            id="csv-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste CSV text..."
            value={csv}
            onChange={e => setCsv(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
          <textarea
            id="base64-output"
            rows={3}
            className={styles.outputArea}
            value={base64}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!base64} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};
export default CsvToBase64Client;
