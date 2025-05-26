"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const Base64ToJavascriptClient = () => {
  const [base64, setBase64] = useState("");
  const [js, setJs] = useState("");

  const handleConvert = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setJs(decoded);
    } catch (e) {
      setJs("Invalid Base64 input");
    }
  };

  const handleCopy = () => {
    if (js) navigator.clipboard.writeText(js);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Javascript</h1>
      <p>Decode Base64 string to JavaScript code.</p>
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
          <label htmlFor="js-output" className={styles.label}>JavaScript Output:</label>
          <textarea
            id="js-output"
            rows={3}
            className={styles.outputArea}
            value={js}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!js} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};
export default Base64ToJavascriptClient;
