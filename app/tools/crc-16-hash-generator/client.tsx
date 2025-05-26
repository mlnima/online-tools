"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const crc16ccitt = (str: string) => {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
};

const Crc16HashGeneratorClient = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      setHash(crc16ccitt(input));
    } catch (e: any) {
      setError((e as Error).message || "Error calculating CRC-16.");
      setHash("");
    }
  };

  const handleCopy = () => {
    if (hash) navigator.clipboard.writeText(hash);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CRC-16 Hash Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="crc16-input" className={styles.label}>Input Text</label>
          <textarea
            id="crc16-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
            placeholder="Enter text..."
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="crc16-output" className={styles.label}>CRC-16 Hash</label>
          <input
            id="crc16-output"
            value={hash}
            readOnly
            className={styles.inputField}
            placeholder="CRC-16 Hash"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Generate</button>
        {hash && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default Crc16HashGeneratorClient;
