"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToHTML() {
  const [base64, setBase64] = useState("");
  const [html, setHtml] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setHtml(decoded);
    } catch (e) {
      setHtml("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (html) navigator.clipboard.writeText(html);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to HTML</h1>
      <p>Decode Base64 string to HTML text.</p>
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
      </div>
      <br />
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      </div>
      <div className={styles.formRow}>
        <label>HTML Output:</label>
        <textarea
          id="html-output"
          rows={3}
          className={styles.outputArea}
          value={html}
          readOnly
        />
        <div className={styles.buttonRow}>
          <button onClick={handleCopy} disabled={!html} className={styles.actionButton}>Copy</button>
        </div>
      </div>
    </div>
  );
}
