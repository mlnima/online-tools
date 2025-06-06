"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const Base64ToYamlClient = () => {
  const [base64, setBase64] = useState("");
  const [yaml, setYaml] = useState("");

  const handleConvert = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setYaml(decoded);
    } catch (e) {
      setYaml("Invalid Base64 input");
    }
  };

  const handleCopy = () => {
    if (yaml) navigator.clipboard.writeText(yaml);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to YAML</h1>
      <p>Decode Base64 string to YAML text.</p>
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
          <label htmlFor="yaml-output" className={styles.label}>YAML Output:</label>
          <textarea
            id="yaml-output"
            rows={3}
            className={styles.outputArea}
            value={yaml}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!yaml} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};
export default Base64ToYamlClient;
