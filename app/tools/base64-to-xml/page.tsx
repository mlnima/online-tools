"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToXML() {
  const [base64, setBase64] = useState("");
  const [xml, setXml] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setXml(decoded);
    } catch (e) {
      setXml("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (xml) navigator.clipboard.writeText(xml);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to XML</h1>
      <p>Decode Base64 string to XML text.</p>
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
          <label htmlFor="xml-output" className={styles.label}>XML Output:</label>
          <textarea
            id="xml-output"
            rows={3}
            className={styles.outputArea}
            value={xml}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!xml} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}

