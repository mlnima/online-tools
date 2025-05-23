"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function generateUUIDv4() {
  // RFC4122 version 4 compliant
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState("");

  function handleGenerate() {
    setUuid(generateUUIDv4());
  }

  return (
    <div className={styles.toolPage}>
      <h1>UUID Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.outputColumn} style={{width: "100%"}}> {/* Output column spans full width */}
          <label htmlFor="uuid-output" className={styles.label}>Generated UUID</label>
          <input
            type="text"
            id="uuid-output"
            value={uuid}
            readOnly
            className={styles.inputField} /* Changed from outputField */
            placeholder="UUID will appear here..."
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleGenerate} className={styles.actionButton}>Generate UUID</button>
      </div>
    </div>
  );
}
