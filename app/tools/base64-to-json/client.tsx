"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const Base64ToJsonClient = () => {
  const [base64, setBase64] = useState("");
  const [json, setJson] = useState("");

  const handleConvert = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      const obj = JSON.parse(decoded);
      setJson(JSON.stringify(obj, null, 2));
    } catch (e) {
      setJson("Invalid Base64 or JSON input");
    }
  };

  const handleCopy = () => {
    if (json) navigator.clipboard.writeText(json);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to JSON</h1>
      <p>Decode Base64 string to JSON (pretty print).</p>
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
          <label htmlFor="json-output" className={styles.label}>JSON Output:</label>
          <textarea
            id="json-output"
            rows={6}
            className={styles.outputArea}
            value={json}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!json} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};
export default Base64ToJsonClient;
