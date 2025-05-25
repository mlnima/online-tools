"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const Base64ToCssClient = () => {
  const [base64, setBase64] = useState("");
  const [css, setCss] = useState("");

  const handleConvert = () => {
    if (!base64.trim()) {
      setCss("");
      return;
    }
    setCss(`background-image: url('data:image/png;base64,${base64.trim()}');`);
  };

  const handleCopy = () => {
    if (css) navigator.clipboard.writeText(css);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to CSS</h1>
      <p>Convert Base64 image data to a CSS background-image property.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Paste Base64 image data..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="css-output" className={styles.label}>CSS Output</label>
          <textarea
            id="css-output"
            value={css}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!css}>Copy Output</button>
      </div>
    </div>
  );
};
export default Base64ToCssClient;
