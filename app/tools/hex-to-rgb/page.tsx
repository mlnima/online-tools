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
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-input" className={styles.label}>HEX Input</label>
          <input
            type="text"
            id="hex-input"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className={styles.inputField}
            placeholder="#RRGGBB"
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="rgb-output" className={styles.label}>RGB Output</label>
          <input
            id="rgb-output"
            value={rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : ""}
            readOnly
            className={styles.inputField} // Changed from outputField and removed inline style
            placeholder="RGB output"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {rgb && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
