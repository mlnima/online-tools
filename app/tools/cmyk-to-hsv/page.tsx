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
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input type="number" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={styles.inputField} placeholder="C" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={styles.inputField} placeholder="M" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={styles.inputField} placeholder="Y" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={styles.inputField} placeholder="K" style={{ width: 60 }} />
      </div>
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={hsv ? `${hsv.h}, ${hsv.s}, ${hsv.v}` : ""}
        readOnly
        className={styles.outputField}
        style={{ width: 180, marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 20 }}
        placeholder="H, S, V"
      />
      {hsv && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
