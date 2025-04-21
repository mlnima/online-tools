"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function ChecksumCalculator() {
  const [input, setInput] = React.useState("");
  const [checksum, setChecksum] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      // Simple checksum: sum of char codes
      const sum = Array.from(input).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      setChecksum(sum.toString());
    } catch (e) {
      setError((e as Error).message || "Error calculating checksum.");
      setChecksum("");
    }
  }

  function handleCopy() {
    if (checksum) navigator.clipboard.writeText(checksum);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Checksum Calculator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text..."
        className={styles.inputArea}
        
      />
      <button onClick={handleConvert} className={styles.actionButton} >Calculate</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={checksum}
        readOnly
        className={styles.outputField}
        placeholder="Checksum"
      />
      {checksum && (
        <button onClick={handleCopy} className={styles.actionButton} >Copy</button>
      )}
    </div>
  );
}
