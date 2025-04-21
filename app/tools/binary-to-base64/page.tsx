"use client";
import React, { useState, useRef } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function binaryToBase64(bin: string): string {
  try {
    const clean = bin.replace(/\s+/g, "");
    if (!/^[01]+$/.test(clean) || clean.length % 8 !== 0) return "Invalid binary input";
    let str = '';
    for (let i = 0; i < clean.length; i += 8) {
      str += String.fromCharCode(parseInt(clean.slice(i, i + 8), 2));
    }
    return btoa(str);
  } catch {
    return "Invalid binary input";
  }
}

export default function BinaryToBase64() {
  const [binary, setBinary] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    setBase64(binaryToBase64(binary));
  }

  function handleCopy() {
    if (base64 && base64 !== "Invalid binary input") navigator.clipboard.writeText(base64);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Binary to Base64</h1>
      <p>Convert binary (8-bit, space separated) to Base64.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="binary-input" className={styles.label}>Binary Input</label>
          <textarea
            id="binary-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste binary string (e.g. 01001000 01101001)..."
            value={binary}
            onChange={e => setBinary(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!base64 || base64 === "Invalid binary input"}>Copy Base64</button>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="base64-output" className={styles.label}>Base64 Output</label>
          <textarea
            id="base64-output"
            rows={3}
            className={styles.outputArea}
            value={base64}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
