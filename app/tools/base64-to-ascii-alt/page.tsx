"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToAsciiAlt() {
  const [base64, setBase64] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setAscii(decoded);
    } catch (e) {
      setAscii("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (ascii) navigator.clipboard.writeText(ascii);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Ascii</h1>
      <p>Convert Base64 string to ASCII text.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Enter Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="ascii-output" className={styles.label}>ASCII Output</label>
          <textarea
            id="ascii-output"
            value={ascii}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!ascii}>Copy Output</button>
      </div>
    </div>
  );
}
