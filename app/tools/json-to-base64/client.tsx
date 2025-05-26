"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const JsonToBase64Client = () => {
  const [json, setJson] = useState("");
  const [base64, setBase64] = useState("");

  const handleConvert = () => {
    try {
      const parsedJson = JSON.parse(json);
      const stringToEncode = JSON.stringify(parsedJson);
      const encoded = btoa(unescape(encodeURIComponent(stringToEncode)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid JSON input");
    }
  };

  const handleCopy = () => {
    if (base64) navigator.clipboard.writeText(base64);
  };

  return (
    <div className={styles.toolPage}>
      <h1>JSON to Base64</h1>
      <p>Encode JSON to Base64 (UTF-8 encoded).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="json-input" className={styles.label}>JSON Input</label>
          <textarea
            id="json-input"
            rows={6}
            className={styles.inputArea}
            placeholder="Paste JSON..."
            value={json}
            onChange={e => setJson(e.target.value)}
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
};
export default JsonToBase64Client;
