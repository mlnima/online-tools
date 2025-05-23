"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function JavascriptToBase64() {
  const [js, setJs] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(js)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid JavaScript input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Javascript to Base64</h1>
      <p>Encode JavaScript code to Base64 (UTF-8 encoded).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="js-input" className={styles.label}>JavaScript Input</label>
          <textarea
            id="js-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste JavaScript code..."
            value={js}
            onChange={e => setJs(e.target.value)}
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
}

