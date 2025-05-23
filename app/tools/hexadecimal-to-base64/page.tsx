"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hexToBase64(hex: string): string {
  try {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    if (cleanHex.length % 2 !== 0) return "Invalid hex input";
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    return btoa(String.fromCharCode(...bytes));
  } catch {
    return "Invalid hex input";
  }
}

export default function HexadecimalToBase64() {
  const [hex, setHex] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    setBase64(hexToBase64(hex));
  }

  function handleCopy() {
    if (base64 && base64 !== "Invalid hex input") navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Hexadecimal to Base64</h1>
      <p>Convert hexadecimal string to Base64 encoding.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-input" className={styles.label}>Hexadecimal Input</label>
          <textarea
            id="hex-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste hexadecimal string..."
            value={hex}
            onChange={e => setHex(e.target.value)}
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output:</label>
          <textarea
            id="base64-output"
            rows={3}
            className={styles.outputArea}
            value={base64}
            readOnly
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button className={styles.actionButton} onClick={handleCopy} disabled={!base64 || base64 === "Invalid hex input"}>
          Copy
        </button>
      </div>
    </div>
  );
}

