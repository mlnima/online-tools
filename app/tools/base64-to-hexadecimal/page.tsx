"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function base64ToHex(base64: string): string {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
}

export default function Base64ToHexadecimal() {
  const [base64, setBase64] = useState("");
  const [hex, setHex] = useState("");

  function handleConvert() {
    setHex(base64ToHex(base64));
  }

  function handleCopy() {
    if (hex && hex !== "Invalid Base64 input") navigator.clipboard.writeText(hex);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Hexadecimal</h1>
      <p>Convert Base64 string to hexadecimal representation.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Paste Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="hex-output" className={styles.label}>Hexadecimal Output</label>
          <textarea
            id="hex-output"
            value={hex}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!hex || hex === "Invalid Base64 input"}>Copy Output</button>
      </div>
    </div>
  );
}
