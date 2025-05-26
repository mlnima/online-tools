"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const ChecksumCalculatorClient = () => {
  const [input, setInput] = useState("");
  const [checksum, setChecksum] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      const sum = Array.from(input).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      setChecksum(sum.toString());
    } catch (e: any) {
      setError((e as Error).message || "Error calculating checksum.");
      setChecksum("");
    }
  };

  const handleCopy = () => {
    if (checksum) navigator.clipboard.writeText(checksum);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Checksum Calculator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="text-input" className={styles.label}>Input Text</label>
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
          <label htmlFor="checksum-output" className={styles.label}>Checksum</label>
          <input
            id="checksum-output"
            value={checksum}
            readOnly
            className={styles.inputField}
            placeholder="Checksum"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Calculate</button>
        {checksum && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default ChecksumCalculatorClient;
