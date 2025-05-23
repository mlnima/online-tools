"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function base64ToOctal(base64: string): string {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(8).padStart(3, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
}

export default function Base64ToOctal() {
  const [base64, setBase64] = useState("");
  const [octal, setOctal] = useState("");

  function handleConvert() {
    setOctal(base64ToOctal(base64));
  }

  function handleCopy() {
    if (octal && octal !== "Invalid Base64 input") navigator.clipboard.writeText(octal);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Octal</h1>
      <p>Convert Base64 string to octal representation.</p>
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
          <label htmlFor="octal-output" className={styles.label}>Octal Output:</label>
          <textarea
            id="octal-output"
            rows={3}
            className={styles.outputArea}
            value={octal}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!octal || octal === "Invalid Base64 input"} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}
