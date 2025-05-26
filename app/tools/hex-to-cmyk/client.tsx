"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const hexToRgb = (hex: string): number[] => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToCmyk = (rgb: number[]): [number, number, number, number] => {
  let r = rgb[0], g = rgb[1], b = rgb[2];
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k_color = Math.min(c, m, y); 
  if (k_color === 1) return [0, 0, 0, 100];
  c = ((c - k_color) / (1 - k_color)) * 100;
  m = ((m - k_color) / (1 - k_color)) * 100;
  y = ((y - k_color) / (1 - k_color)) * 100;
  k_color = k_color * 100;
  return [Math.round(c), Math.round(m), Math.round(y), Math.round(k_color)];
};

const HexToCmykClient = () => {
  const [hex, setHex] = useState("");
  const [cmyk, setCmyk] = useState<[number, number, number, number] | null>(null);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      const rgbValues = hexToRgb(hex);
      setCmyk(rgbToCmyk(rgbValues));
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setCmyk(null);
    }
  };

  const handleCopy = () => {
    if (cmyk) navigator.clipboard.writeText(`C: ${cmyk[0]}%, M: ${cmyk[1]}%, Y: ${cmyk[2]}%, K: ${cmyk[3]}%`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HEX to CMYK</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-input-cmyk" className={styles.label}>HEX Input</label>
          <input
            type="text"
            id="hex-input-cmyk"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className={styles.inputField}
            placeholder="#RRGGBB"
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="cmyk-output-hex" className={styles.label}>CMYK Output</label>
          <input
            id="cmyk-output-hex"
            value={cmyk ? `C: ${cmyk[0]}%, M: ${cmyk[1]}%, Y: ${cmyk[2]}%, K: ${cmyk[3]}%` : ""}
            readOnly
            className={styles.inputField}
            placeholder="CMYK output"
          />
           {cmyk && ( 
            <span className={styles.colorSwatch} style={{ backgroundColor: hex }} />
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {cmyk && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default HexToCmykClient;
