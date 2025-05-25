"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CmykToHexClient = () => {
  const [c, setC] = useState(0);
  const [m, setM] = useState(0);
  const [y, setY] = useState(0);
  const [k, setK] = useState(0);
  const [hex, setHex] = useState("");
  const [error, setError] = useState("");

  const clamp = (val: number): number => {
    return Math.max(0, Math.min(100, val));
  };

  const handleConvert = () => {
    setError("");
    try {
      const C_val = clamp(c) / 100;
      const M_val = clamp(m) / 100;
      const Y_val = clamp(y) / 100;
      const K_val = clamp(k) / 100;
      const R = Math.round(255 * (1 - C_val) * (1 - K_val));
      const G = Math.round(255 * (1 - M_val) * (1 - K_val));
      const B = Math.round(255 * (1 - Y_val) * (1 - K_val));
      const hexVal = "#" + [R, G, B].map(x_val => x_val.toString(16).padStart(2, '0')).join("");
      setHex(hexVal.toUpperCase());
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setHex("");
    }
  };

  const handleCopy = () => {
    if (hex) navigator.clipboard.writeText(hex);
  };

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
            <span className={styles.colorSwatch} style={{ backgroundColor: hex }} />
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
};
export default CmykToHexClient;
