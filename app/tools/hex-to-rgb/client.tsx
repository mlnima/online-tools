"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const HexToRgbClient = () => {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState<[number, number, number] | null>(null);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      setRgb(hexToRgb(hex));
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setRgb(null);
    }
  };

  const handleCopy = () => {
    if (rgb) navigator.clipboard.writeText(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HEX to RGB</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-input-rgb" className={styles.label}>HEX Input</label>
          <input
            type="text"
            id="hex-input-rgb"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className={styles.inputField}
            placeholder="#RRGGBB"
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="rgb-output-hex" className={styles.label}>RGB Output</label>
          <input
            id="rgb-output-hex"
            value={rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : ""}
            readOnly
            className={styles.inputField}
            placeholder="RGB output"
          />
           {rgb && (
            <span className={styles.colorSwatch} style={{ backgroundColor: hex }} />
          )}
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
};
export default HexToRgbClient;
