"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const bytesToAscii = (input: string): string => {
  try {
    const parts = input.split(/[^0-9]+/).filter(Boolean);
    return parts.map(b => String.fromCharCode(Number(b))).join("");
  } catch {
    return "Invalid byte input";
  }
};

const ByteToAsciiClient = () => {
  const [bytes, setBytes] = useState("");
  const [ascii, setAscii] = useState("");

  const handleConvert = () => {
    setAscii(bytesToAscii(bytes));
  };

  const handleCopy = () => {
    if (ascii && ascii !== "Invalid byte input") navigator.clipboard.writeText(ascii);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Byte to ASCII</h1>
      <p>Convert bytes (0-255, space, comma, or line separated) to ASCII text.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="bytes-input" className={styles.label}>Bytes Input</label>
          <textarea
            id="bytes-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste bytes (e.g. 72 101 108 108 111)..."
            value={bytes}
            onChange={e => setBytes(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="ascii-output" className={styles.label}>ASCII Output:</label>
          <textarea
            id="ascii-output"
            rows={3}
            className={styles.outputArea}
            value={ascii}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid byte input"} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};
export default ByteToAsciiClient;
