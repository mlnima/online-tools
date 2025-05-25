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

const rgbToHex = (rgb: number[]): string => {
  return "#" + rgb.map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase();
};

const desaturate = (rgb: number[], percent: number): number[] => {
  const avg = (rgb[0] + rgb[1] + rgb[2]) / 3;
  const p = percent / 100;
  return [
    Math.round(rgb[0] * (1 - p) + avg * p),
    Math.round(rgb[1] * (1 - p) + avg * p),
    Math.round(rgb[2] * (1 - p) + avg * p)
  ];
};

const ColorDesaturationClient = () => {
  const [hex, setHex] = useState("");
  const [percent, setPercent] = useState(50);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      if (percent < 0 || percent > 100) throw new Error("Percent must be 0-100");
      const rgbArray = hexToRgb(hex);
      const desatArray = desaturate(rgbArray, percent);
      setResult(rgbToHex(desatArray));
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setResult("");
    }
  };

  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Color Desaturation</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-color-input" className={styles.label}>HEX Color</label>
          <input
            type="text"
            id="hex-color-input"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className={styles.inputField}
            placeholder="#RRGGBB"
          />
        </div>
        <div className={styles.inputColumn}>
           <label htmlFor="desaturation-percent" className={styles.label}>Desaturation %</label>
           <input
            type="number"
            id="desaturation-percent"
            min={0} max={100}
            value={percent}
            onChange={e => setPercent(Number(e.target.value))}
            className={styles.inputField}
            placeholder="%"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Desaturate</button>
        {result && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy HEX</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {result && (
        <div className={styles.outputColumn} style={{alignItems: 'center'}}>
          <label className={styles.label}>Desaturated Color:</label>
          <input
            value={result}
            readOnly
            className={styles.inputField}
            style={{ width: 'auto', textAlign: 'center', marginBottom: '0.5rem' }}
          />
          <div className={styles.colorSwatchContainer}>
            <span className={styles.colorSwatch} style={{ backgroundColor: result }} />
          </div>
        </div>
      )}
    </div>
  );
};
export default ColorDesaturationClient;
