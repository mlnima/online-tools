"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function XMLToBase64() {
  const [xml, setXml] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(xml)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid XML input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>XML to Base64</h1>
      <p>Encode XML text to Base64 (UTF-8 encoded).</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="xml-input" className={styles.label}>XML Input</label>
          <textarea
            id="xml-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste XML text..."
            value={xml}
            onChange={e => setXml(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
          <textarea
            id="base64-output"
            rows={4} /* Adjusted rows to match input */
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
}

