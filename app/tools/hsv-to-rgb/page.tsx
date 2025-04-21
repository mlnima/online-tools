"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
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

export default function HsvToRgb() {
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
      setOutput(`${r}, ${g}, ${b}`);
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
      <h1>HSV to RGB</h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
        <input type="number" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} className={styles.inputNumber} placeholder="H (0-360)" style={{ width: 70 }} />
        <input type="number" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} className={styles.inputNumber} placeholder="S (0-100)" style={{ width: 70 }} />
        <input type="number" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} className={styles.inputNumber} placeholder="V (0-100)" style={{ width: 70 }} />
      </div>
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        className={styles.outputArea}
        rows={2}
        style={{ width: 240, textAlign: 'center', fontFamily: 'monospace', fontSize: 16, background: 'var(--color-bg-secondary)' }}
        placeholder="R, G, B"
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
