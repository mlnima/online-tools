"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function decimalToAscii(input: string): string {
  try {
    const parts = input.split(/[^0-9]+/).filter(Boolean);
    return parts.map(d => String.fromCharCode(Number(d))).join("");
  } catch {
    return "Invalid decimal input";
  }
}

export default function DecimalToASCII() {
  const [decimal, setDecimal] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(decimalToAscii(decimal));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid decimal input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Decimal to ASCII</h1>
      <p>Convert decimal numbers (space, comma, or line separated) to ASCII text.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="decimal-input" className={styles.label}>Decimal Input</label>
          <textarea
            id="decimal-input"
            rows={4}
            className={styles.inputArea}
            placeholder="Paste decimals (e.g. 72 101 108 108 111)..."
            value={decimal}
            onChange={e => setDecimal(e.target.value)}
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
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid decimal input"} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
}

