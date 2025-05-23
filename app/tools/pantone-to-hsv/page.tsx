"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function PantoneToHsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    // Pantone conversion is not available in-browser without a Pantone color database. Placeholder only.
    setOutput("[HSV value would appear here - not supported in browser JS]");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Pantone to HSV</h1>
      <p className={styles.warningText}> {/* Using warningText class */}
        Pantone to HSV conversion is not natively supported in browser JavaScript. This is a placeholder.
      </p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="pantone-input" className={styles.label}>Pantone Code</label>
          <textarea
            id="pantone-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={2}
            placeholder="Enter Pantone code (e.g. 17-1463)"
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="hsv-output" className={styles.label}>HSV Output</label>
          <textarea
            id="hsv-output"
            value={output}
            readOnly
            rows={2}
            placeholder="HSV output..."
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
