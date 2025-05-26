"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const pantoneTable = [
  { code: "Pantone Yellow", name: "Yellow", hex: "#FEDD00" },
  { code: "Pantone 185 C", name: "Red", hex: "#E03C31" },
  { code: "Pantone 300 C", name: "Blue", hex: "#005EB8" },
  { code: "Pantone 354 C", name: "Green", hex: "#00B140" },
  { code: "Pantone 165 C", name: "Orange", hex: "#FF6900" },
  { code: "Pantone 2597 C", name: "Purple", hex: "#5F259F" },
  { code: "Pantone Black", name: "Black", hex: "#2D2926" },
  { code: "Pantone Cool Gray 6 C", name: "Gray", hex: "#A7A8AA" },
  { code: "Pantone White", name: "White", hex: "#FFFFFF" },
];

const hexToRgb = (hex: string): number[] => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const colorDist = (a: number[], b: number[]): number => {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
    Math.pow(a[1] - b[1], 2) +
    Math.pow(a[2] - b[2], 2)
  );
};

const findClosestPantone = (hex: string): typeof pantoneTable[0] => {
  const rgb = hexToRgb(hex);
  let best = pantoneTable[0];
  let minDist = colorDist(rgb, hexToRgb(best.hex));
  for (const p_color of pantoneTable) {
    const d = colorDist(rgb, hexToRgb(p_color.hex));
    if (d < minDist) {
      minDist = d;
      best = p_color;
    }
  }
  return best;
};

const HexToPantoneClient = () => {
  const [hex, setHex] = useState("");
  const [pantone, setPantone] = useState<typeof pantoneTable[0] | null>(null);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      setPantone(findClosestPantone(hex));
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setPantone(null);
    }
  };

  const handleCopy = () => {
    if (pantone) navigator.clipboard.writeText(`${pantone.code} (${pantone.hex})`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HEX to Pantone (Approximate)</h1>
      <p>Note: This tool uses a small, sample Pantone table for approximation.</p>
      <div className={styles.formRow}>
         <div className={styles.inputColumn}>
            <label htmlFor="hex-input-pantone" className={styles.label}>HEX Input</label>
            <input
                type="text"
                id="hex-input-pantone"
                value={hex}
                onChange={e => setHex(e.target.value)}
                className={styles.inputField}
                placeholder="#RRGGBB"
            />
         </div>
      </div>
      <div className={styles.buttonRow}>
         <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {pantone && (
        <div className={styles.outputColumnFull} style={{marginTop: '1rem', alignItems: 'center'}}>
          <label htmlFor="pantone-output-hex" className={styles.label}>Approx. Pantone Output</label>
          <input
            id="pantone-output-hex"
            value={pantone ? `${pantone.code} (${pantone.hex})` : ""}
            readOnly
            className={styles.inputField}
            style={{textAlign: 'center', marginBottom: '0.5rem'}} 
          />
          <div className={styles.colorSwatchContainer}>
             <span className={styles.colorSwatch} style={{ backgroundColor: pantone.hex }} />
          </div>
          <button onClick={handleCopy} className={styles.actionButton} style={{marginTop: '0.5rem'}}>Copy</button>
        </div>
      )}
    </div>
  );
};
export default HexToPantoneClient;
