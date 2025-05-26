"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const base64ToBinary = (base64: string): string => {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
};

const Base64ToBinaryClient = () => {
  const [base64, setBase64] = useState("");
  const [binary, setBinary] = useState("");

  const handleConvert = () => {
    setBinary(base64ToBinary(base64));
  };

  const handleCopy = () => {
    if (binary && binary !== "Invalid Base64 input") navigator.clipboard.writeText(binary);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Base64 to Binary</h1>
      <p>Convert Base64 string to binary representation.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-input" className={styles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Enter Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={styles.inputArea}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="binary-output" className={styles.label}>Binary Output</label>
          <textarea
            id="binary-output"
            value={binary}
            readOnly
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!binary || binary === "Invalid Base64 input"}>Copy Output</button>
      </div>
    </div>
  );
};
export default Base64ToBinaryClient;
