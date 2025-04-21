"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function ASCIToBase64() {
  const [ascii, setAscii] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(ascii)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid ASCII input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>ASCII to Base64</h1>
      <p>Convert ASCII text to Base64 encoding.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="ascii-input" className={styles.label}>ASCII Input</label>
          <textarea
            id="ascii-input"
            placeholder="Enter ASCII text..."
            value={ascii}
            onChange={e => setAscii(e.target.value)}
            className={styles.inputArea}
          />
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output</label>
          <textarea
            id="base64-output"
            value={base64}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!base64}>Copy Output</button>
      </div>
    </div>
  );
}
