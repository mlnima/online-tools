"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
function rgbToHex([r, g, b]: number[]) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function desaturate([r, g, b]: number[], percent: number) {
  // Desaturate by blending with gray (average)
  const avg = (r + g + b) / 3;
  const p = percent / 100;
  return [
    Math.round(r * (1 - p) + avg * p),
    Math.round(g * (1 - p) + avg * p),
    Math.round(b * (1 - p) + avg * p)
  ];
}

export default function ColorDesaturation() {
  const [hex, setHex] = React.useState("");
  const [percent, setPercent] = React.useState(50);
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      if (percent < 0 || percent > 100) throw new Error("Percent must be 0-100");
      const rgb = hexToRgb(hex);
      const desat = desaturate(rgb, percent);
      setResult(rgbToHex(desat));
    } catch (e) {
      setError((e as Error).message || "Error");
      setResult("");
    }
  }
  function handleCopy() {
    if (result) navigator.clipboard.writeText(result);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Color Desaturation</h1>
      <div className={styles.formRow}>
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} className={styles.inputField} placeholder="#RRGGBB"  />
        <input type="number" min={0} max={100} value={percent} onChange={e => setPercent(Number(e.target.value))} className={styles.inputField} placeholder="%"  />
      </div>
      <button onClick={handleConvert} className={styles.actionButton} >Desaturate</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={result}
        readOnly
        className={styles.outputField}
        style={{ width: 120, marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 18 }}
        placeholder="Desaturated HEX"
      />
      {result && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
      {result && (
        <div style={{ marginTop: 16 }}>
          <span style={{ display: 'inline-block', width: 40, height: 40, background: result, border: '1px solid #ccc', borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}
