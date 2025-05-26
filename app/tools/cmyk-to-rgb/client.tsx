"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CmykToRgbClient = () => {
  const [c, setC] = useState(0);
  const [m, setM] = useState(0);
  const [y, setY] = useState(0);
  const [k, setK] = useState(0);
  const [rgb, setRgb] = useState<{r:number,g:number,b:number}|null>(null);
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
      setRgb({ r: R, g: G, b: B });
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setRgb(null);
    }
  };

  const handleCopy = () => {
    if (rgb) navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CMYK to RGB</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="cmyk-c-input-rgb" className={styles.label}>C (Cyan %)</label>
          <input type="number" id="cmyk-c-input-rgb" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          <label htmlFor="cmyk-m-input-rgb" className={styles.label}>M (Magenta %)</label>
          <input type="number" id="cmyk-m-input-rgb" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          <label htmlFor="cmyk-y-input-rgb" className={styles.label}>Y (Yellow %)</label>
          <input type="number" id="cmyk-y-input-rgb" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          <label htmlFor="cmyk-k-input-rgb" className={styles.label}>K (Key/Black %)</label>
          <input type="number" id="cmyk-k-input-rgb" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="rgb-output" className={styles.label}>RGB Output</label>
          <input
            id="rgb-output"
            value={rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : ""}
            readOnly
            className={styles.inputField}
            placeholder="R, G, B"
          />
          {rgb && (
            <div className={styles.colorSwatchContainer}>
               <span className={styles.colorSwatch} style={{ backgroundColor: `rgb(${rgb.r},${rgb.g},${rgb.b})` }} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {rgb && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy RGB</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default CmykToRgbClient;
