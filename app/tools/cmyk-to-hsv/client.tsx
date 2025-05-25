"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CmykToHsvClient = () => {
  const [c, setC] = useState(0);
  const [m, setM] = useState(0);
  const [y, setY] = useState(0);
  const [k, setK] = useState(0);
  const [hsv, setHsv] = useState<{h:number,s:number,v:number}|null>(null);
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
      const R = 255 * (1 - C_val) * (1 - K_val);
      const G = 255 * (1 - M_val) * (1 - K_val);
      const B = 255 * (1 - Y_val) * (1 - K_val);
      
      const r_prime = R / 255;
      const g_prime = G / 255;
      const b_prime = B / 255;
      
      const cmax = Math.max(r_prime, g_prime, b_prime);
      const cmin = Math.min(r_prime, g_prime, b_prime);
      const delta = cmax - cmin;
      
      let h_calc = 0;
      if (delta === 0) {
        h_calc = 0;
      } else if (cmax === r_prime) {
        h_calc = 60 * (((g_prime - b_prime) / delta) % 6);
      } else if (cmax === g_prime) {
        h_calc = 60 * (((b_prime - r_prime) / delta) + 2);
      } else if (cmax === b_prime) {
        h_calc = 60 * (((r_prime - g_prime) / delta) + 4);
      }
      if (h_calc < 0) h_calc += 360;

      const s_calc = cmax === 0 ? 0 : delta / cmax;
      const v_calc = cmax;

      setHsv({
        h: Math.round(h_calc),
        s: Math.round(s_calc * 100),
        v: Math.round(v_calc * 100)
      });
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setHsv(null);
    }
  };

  const handleCopy = () => {
    if (hsv) navigator.clipboard.writeText(`H: ${hsv.h}, S: ${hsv.s}%, V: ${hsv.v}%`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CMYK to HSV</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="cmyk-c-hsv" className={styles.label}>C (Cyan %)</label>
          <input type="number" id="cmyk-c-hsv" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          <label htmlFor="cmyk-m-hsv" className={styles.label}>M (Magenta %)</label>
          <input type="number" id="cmyk-m-hsv" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          <label htmlFor="cmyk-y-hsv" className={styles.label}>Y (Yellow %)</label>
          <input type="number" id="cmyk-y-hsv" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          <label htmlFor="cmyk-k-hsv" className={styles.label}>K (Key/Black %)</label>
          <input type="number" id="cmyk-k-hsv" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="hsv-output" className={styles.label}>HSV Output</label>
          <input
            id="hsv-output"
            value={hsv ? `H: ${hsv.h}, S: ${hsv.s}%, V: ${hsv.v}%` : ""}
            readOnly
            className={styles.inputField}
            placeholder="H, S%, V%"
          />
           {hsv && (
            <span className={styles.colorSwatch} style={{ backgroundColor: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` }} />
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {hsv && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default CmykToHsvClient;
