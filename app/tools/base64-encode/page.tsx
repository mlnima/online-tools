"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64EncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleEncode() {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch (e) {
      setOutput("Invalid input");
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>Base64 Encode</h1>
      <p>Encode text to Base64 format.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Input</label>
          <textarea
            id="base64-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={styles.inputArea}
            placeholder="Enter text to encode..."
          />
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Output</label>
          <textarea
            id="base64-output"
            value={output}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleEncode} className={styles.actionButton}>Encode</button>
        <button onClick={() => navigator.clipboard.writeText(output)} className={styles.actionButton} disabled={!output}>Copy Output</button>
      </div>
    </div>
  );
}
