"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const Base64ToHtmlClient = () => {
  const [base64, setBase64] = useState("");
  const [html, setHtml] = useState("");

  const handleConvert = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setHtml(decoded);
    } catch (e) {
      setHtml("Invalid Base64 input");
    }
  };

  const handleCopy = () => {
    if (html) navigator.clipboard.writeText(html);
  };

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
        <div className={styles.outputColumn}>
          <label htmlFor="html-output" className={styles.label}>HTML Output:</label>
          <textarea
            id="html-output"
            rows={3}
            className={styles.outputArea}
            value={html}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!html} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};
export default Base64ToHtmlClient;
