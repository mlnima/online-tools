"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const BinaryToTextClient = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      const text = input.trim().split(/\s+/).map(bin => {
        if (!/^[01]{8}$/.test(bin)) throw new Error("Invalid binary format: ensure 8-bit values separated by spaces.");
        return String.fromCharCode(parseInt(bin, 2));
      }).join("");
      setOutput(text);
    } catch (e: any) {
      setError(e.message || "Invalid binary input. Please enter 8-bit binary values separated by spaces.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

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
};
export default BinaryToTextClient;
