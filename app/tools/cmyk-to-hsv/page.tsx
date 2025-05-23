"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function CmykToHsv() {
  const [c, setC] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [k, setK] = React.useState(0);
  const [hsv, setHsv] = React.useState<{h:number,s:number,v:number}|null>(null);
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
      // RGB to HSV
      const r = R / 255, g = G / 255, b = B / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, v = max;
      const d = max - min;
      s = max === 0 ? 0 : d / max;
      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      setHsv({
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
      });
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setHsv(null);
    }
  }

  function handleCopy() {
    if (hsv) navigator.clipboard.writeText(`${hsv.h}, ${hsv.s}, ${hsv.v}`);
  }

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
          <label htmlFor="hsv-output" className={styles.label}>HSV Output (H, S, V)</label>
          <input
            id="hsv-output"
            value={hsv ? `${hsv.h}, ${hsv.s}, ${hsv.v}` : ""}
            readOnly
            className={styles.inputField}
            placeholder="H, S, V"
          />
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
}
