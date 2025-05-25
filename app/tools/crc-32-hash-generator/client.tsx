"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const crc32 = (str: string): number => {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xEDB88320;
      } else {
        crc >>>= 1;
      }
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
};

const Crc32HashGeneratorClient = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      setHash(crc32(input).toString(16).toUpperCase().padStart(8, "0"));
    } catch (e: any) {
      setError((e as Error).message || "Error calculating CRC-32.");
      setHash("");
    }
  };

  const handleCopy = () => {
    if (hash) navigator.clipboard.writeText(hash);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CRC-32 Hash Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="crc32-input" className={styles.label}>Input Text</label>
          <textarea
              id="crc32-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={4}
              placeholder="Enter text..."
              className={styles.inputArea}
          />
        </div>
        <div className={styles.buttonColumn}>
           <button onClick={handleConvert} className={styles.actionButton}>Generate</button>
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="crc32-output" className={styles.label}>CRC-32 Hash</label>
          <input
              id="crc32-output"
              value={hash}
              readOnly
              className={styles.inputField}
              placeholder="CRC-32 Hash"
          />
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {hash && (
        <div className={styles.buttonRow}>
            <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        </div>
      )}
    </div>
  );
};
export default Crc32HashGeneratorClient;
