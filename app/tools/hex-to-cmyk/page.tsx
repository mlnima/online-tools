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
function rgbToCmyk([r, g, b]: number[]): [number, number, number, number] {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, m, y);
  if (k === 1) return [0, 0, 0, 100];
  c = ((c - k) / (1 - k)) * 100;
  m = ((m - k) / (1 - k)) * 100;
  y = ((y - k) / (1 - k)) * 100;
  k = k * 100;
  return [Math.round(c), Math.round(m), Math.round(y), Math.round(k)];
}

export default function HexToCmyk() {
  const [hex, setHex] = React.useState("");
  const [cmyk, setCmyk] = React.useState<[number, number, number, number] | null>(null);
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      const rgb = hexToRgb(hex);
      setCmyk(rgbToCmyk(rgb));
    } catch (e) {
      setError((e as Error).message || "Error");
      setCmyk(null);
    }
  }
  function handleCopy() {
    if (cmyk) navigator.clipboard.writeText(`C: ${cmyk[0]}%, M: ${cmyk[1]}%, Y: ${cmyk[2]}%, K: ${cmyk[3]}%`);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HEX to CMYK</h1>
      <input
        type="text"
        value={hex}
        onChange={e => setHex(e.target.value)}
        className={styles.inputField}
        placeholder="#RRGGBB"
        style={{ width: 120, marginBottom: 8 }}
      />
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={cmyk ? `C: ${cmyk[0]}%, M: ${cmyk[1]}%, Y: ${cmyk[2]}%, K: ${cmyk[3]}%` : ""}
        readOnly
        className={styles.outputField}
        style={{ width: 240, textAlign: 'center', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="CMYK output"
      />
      {cmyk && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
