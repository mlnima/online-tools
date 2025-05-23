"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function textToBinary(text: string): string {
  return text.split("").map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

export default function TextToBinary() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      setOutput(textToBinary(input));
    } catch (e) {
      setError("Conversion failed.");
      setOutput("");
    }
  }

  return (
    <div className={styles.toolPage}>
      <h1>Text to Binary</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="text-input" className={styles.label}>Text Input</label>
          <textarea
            id="text-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            placeholder="Enter text..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="binary-output" className={styles.label}>Binary Output</label>
          <textarea
            id="binary-output"
            value={output}
            readOnly
            rows={4}
            placeholder="Binary output..."
            className={styles.outputArea} 
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
