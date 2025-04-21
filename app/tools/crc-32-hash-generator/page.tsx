"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

// CRC-32 implementation (IEEE 802.3)
function crc32(str: string) {
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
}

export default function Crc32HashGenerator() {
  const [input, setInput] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!input) throw new Error("Input cannot be empty.");
      setHash(crc32(input).toString(16).toUpperCase().padStart(8, "0"));
    } catch (e) {
      setError((e as Error).message || "Error calculating CRC-32.");
      setHash("");
    }
  }

  function handleCopy() {
    if (hash) navigator.clipboard.writeText(hash);
  }

  return (
    <div className={styles.toolPage}>
      <h1>CRC-32 Hash Generator</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text..."
        className={styles.inputArea}
        
      />
      <button onClick={handleConvert} className={styles.actionButton} >Generate</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={hash}
        readOnly
        className={styles.outputArea}
        
        placeholder="CRC-32 Hash"
      />
      {hash && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
