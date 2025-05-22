"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hsvToRgb(h: number, s: number, v: number) {
  s /= 100;
  v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function rgbToCmyk(r: number, g: number, b: number) {
  let r1 = r / 255, g1 = g / 255, b1 = b / 255;
  let k = 1 - Math.max(r1, g1, b1);
  let c = (1 - r1 - k) / (1 - k) || 0;
  let m = (1 - g1 - k) / (1 - k) || 0;
  let y = (1 - b1 - k) / (1 - k) || 0;
  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

export default function HsvToCmyk() {
  const [h, setH] = React.useState(0);
  const [s, setS] = React.useState(0);
  const [v, setV] = React.useState(0);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
      setError("H: 0-360, S/V: 0-100");
      setOutput("");
      return;
    }
    try {
      const [r, g, b] = hsvToRgb(h, s, v);
      const [c, m, y, k] = rgbToCmyk(r, g, b);
      setOutput(`${c}%, ${m}%, ${y}%, ${k}%`);
    } catch (e) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  }
  function handleCopy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HSV to CMYK</h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
        <input type="number" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} className={styles.inputNumber} placeholder="H (0-360)" style={{ width: 70 }} />
        <input type="number" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} className={styles.inputNumber} placeholder="S (0-100)" style={{ width: 70 }} />
        <input type="number" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} className={styles.inputNumber} placeholder="V (0-100)" style={{ width: 70 }} />
      </div>
      <button onClick={handleConvert} className={styles.actionButton} >Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        className={styles.outputArea}
        rows={2}
        style={{ width: 240, textAlign: 'center', fontFamily: 'monospace', fontSize: 16, background: 'var(--color-bg-secondary)' }}
        placeholder="C, M, Y, K"
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton}  >Copy</button>
      )}
    </div>
  );
}
