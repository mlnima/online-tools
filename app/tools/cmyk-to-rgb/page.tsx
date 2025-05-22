"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

export default function CmykToRgb() {
  const [c, setC] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [k, setK] = React.useState(0);
  const [rgb, setRgb] = React.useState<{r:number,g:number,b:number}|null>(null);
  const [error, setError] = React.useState("");

  function clamp(val: number) {
    return Math.max(0, Math.min(100, val));
  }

  function handleConvert() {
    setError("");
    try {
      const C = clamp(c) / 100;
      const M = clamp(m) / 100;
      const Y = clamp(y) / 100;
      const K = clamp(k) / 100;
      const R = Math.round(255 * (1 - C) * (1 - K));
      const G = Math.round(255 * (1 - M) * (1 - K));
      const B = Math.round(255 * (1 - Y) * (1 - K));
      setRgb({ r: R, g: G, b: B });
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setRgb(null);
    }
  }

  function handleCopy() {
    if (rgb) navigator.clipboard.writeText(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }

  return (
    <div className={styles.toolPage}>
      <h1>CMYK to RGB</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input type="number" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={styles.inputField} placeholder="C" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={styles.inputField} placeholder="M" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={styles.inputField} placeholder="Y" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={styles.inputField} placeholder="K" style={{ width: 60 }} />
      </div>
      <button onClick={handleConvert} className={styles.actionButton}  >Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : ""}
        readOnly
        className={styles.outputField}
        style={{ width: 180, marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 20 }}
        placeholder="R, G, B"
      />
      {rgb && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
      {rgb && (
        <div style={{ marginTop: 16 }}>
          <span style={{ display: 'inline-block', width: 40, height: 40, background: `rgb(${rgb.r},${rgb.g},${rgb.b})`, border: '1px solid #ccc', borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}
