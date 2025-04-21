"use client";import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export default function HexToRgb() {
  const [hex, setHex] = React.useState("");
  const [rgb, setRgb] = React.useState<[number, number, number] | null>(null);
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      setRgb(hexToRgb(hex));
    } catch (e) {
      setError((e as Error).message || "Error");
      setRgb(null);
    }
  }
  function handleCopy() {
    if (rgb) navigator.clipboard.writeText(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  }

  return (
    <div className={styles.toolPage}>
      <h1>HEX to RGB</h1>
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
        value={rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : ""}
        readOnly
        className={styles.outputField}
        style={{ width: 240, textAlign: 'center', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="RGB output"
      />
      {rgb && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
