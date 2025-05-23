"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToText() {
  const [base64, setBase64] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      const decoded = decodeURIComponent(escape(atob(base64.trim())));
      setText(decoded);
    } catch (e) {
      setText("");
      setError("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (text) navigator.clipboard.writeText(text);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Text</h1>
      <p>Paste a Base64 string to decode to text.</p>
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
          {text && (
            <>
              <label htmlFor="decoded-text" className={styles.label}>Decoded Text:</label>
              <textarea
                id="decoded-text"
                rows={4}
                className={styles.outputArea}
                value={text}
                readOnly
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!text}>Copy Text</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
