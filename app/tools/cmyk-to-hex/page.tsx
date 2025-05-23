"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function CmykToHex() {
  const [c, setC] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [k, setK] = React.useState(0);
  const [hex, setHex] = React.useState("");
  const [error, setError] = React.useState("");

  function clamp(val: number) {
    return Math.max(0, Math.min(100, val));
  }

  function handleConvert() {
    setError("");
    try {
      // Convert CMYK [0-100] to RGB [0-255]
      const C = clamp(c) / 100;
      const M = clamp(m) / 100;
      const Y = clamp(y) / 100;
      const K = clamp(k) / 100;
      const R = Math.round(255 * (1 - C) * (1 - K));
      const G = Math.round(255 * (1 - M) * (1 - K));
      const B = Math.round(255 * (1 - Y) * (1 - K));
      const hexVal = "#" + [R, G, B].map(x => x.toString(16).padStart(2, '0')).join("");
      setHex(hexVal.toUpperCase());
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setHex("");
    }
  }

  function handleCopy() {
    if (hex) navigator.clipboard.writeText(hex);
  }

  return (
    <div className={styles.toolPage}>
      <h1>CMYK to HEX</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="cmyk-c-input" className={styles.label}>C (Cyan %)</label>
          <input type="number" id="cmyk-c-input" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          
          <label htmlFor="cmyk-m-input" className={styles.label}>M (Magenta %)</label>
          <input type="number" id="cmyk-m-input" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          
          <label htmlFor="cmyk-y-input" className={styles.label}>Y (Yellow %)</label>
          <input type="number" id="cmyk-y-input" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          
          <label htmlFor="cmyk-k-input" className={styles.label}>K (Key/Black %)</label>
          <input type="number" id="cmyk-k-input" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="hex-output" className={styles.label}>HEX Output</label>
          <input
            id="hex-output"
            value={hex}
            readOnly
            className={styles.inputField}
            placeholder="#RRGGBB"
          />
          {hex && (
            <span className={styles.colorSwatch} /> 
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {hex && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
