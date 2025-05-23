"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function BinaryToText() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      // Split by whitespace, parse each binary to char
      const text = input.trim().split(/\s+/).map(bin => {
        if (!/^[01]{8}$/.test(bin)) throw new Error();
        return String.fromCharCode(parseInt(bin, 2));
      }).join("");
      setOutput(text);
    } catch {
      setError("Invalid binary input. Please enter 8-bit binary values separated by spaces.");
      setOutput("");
    }
  }

  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Binary to Text</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="binary-input" className={styles.label}>Binary Input</label>
          <textarea
            id="binary-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            placeholder="Enter binary string (e.g. 01001000 01100101)..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="text-output" className={styles.label}>Text Output</label>
          <textarea
            id="text-output"
            value={output}
            readOnly
            rows={4}
            placeholder="Text output..."
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
