"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const hexToRgb = (hex: string): [number, number, number] | null => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  if (h.length !== 6) return null;
  const num = parseInt(h, 16);
  if (isNaN(num)) return null; // Added isNaN check
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
};

const invertRgb = ([r, g, b]: [number, number, number]): [number, number, number] => {
  return [255 - r, 255 - g, 255 - b];
};

const parseColor = (input: string): [number, number, number] | null => {
  input = input.trim();
  if (input.startsWith('#')) return hexToRgb(input);
  const rgbMatch = input.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbMatch) {
    const [, rStr, gStr, bStr] = rgbMatch;
    const r = parseInt(rStr, 10);
    const g = parseInt(gStr, 10);
    const b = parseInt(bStr, 10);
    if ([r, g, b].every(x => x >= 0 && x <= 255)) return [r, g, b];
  }
  return null;
};

const InvertColorsClient = () => {
  const [input, setInput] = React.useState("");
  const [outputHex, setOutputHex] = React.useState("");
  const [outputRgb, setOutputRgb] = React.useState("");
  const [error, setError] = React.useState("");

  const handleConvert = () => {
    setError("");
    setOutputHex("");
    setOutputRgb("");
    if (!input.trim()) {
        setError("Please enter a color value.");
        return;
    }
    const rgb = parseColor(input);
    if (!rgb) {
      setError("Input must be a valid HEX (#RRGGBB, #RGB) or rgb(r,g,b) format.");
      return;
    }
    const inv = invertRgb(rgb);
    setOutputHex(rgbToHex(inv[0], inv[1], inv[2]));
    setOutputRgb(`rgb(${inv[0]}, ${inv[1]}, ${inv[2]})`);
  };

  const handleCopyHex = () => {
    if (outputHex) navigator.clipboard.writeText(outputHex);
  };

  const handleCopyRgb = () => {
    if (outputRgb) navigator.clipboard.writeText(outputRgb);
  };

  return (
    <div className={styles.toolPage}>
      <h1>Invert Colors</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className={`${styles.inputField} ${styles.colorInput}`}
        placeholder="#123456 or rgb(18,52,86)"
      />
      <button onClick={handleConvert} className={styles.actionButton}>Invert</button>
      {error && <div className={styles.error}>{error}</div>}
      {outputHex && (
        <div className={styles.resultContainer}>
          <div className={styles.colorPreviewInfo}>
            <div className={styles.colorSwatch} style={{ background: outputHex }} />
            <div className={styles.colorValues}>
              <div className={styles.hexValueOutput}>{outputHex}</div>
              <div className={styles.rgbValueOutput}>{outputRgb}</div>
            </div>
          </div>
          <div className={styles.copyButtonGroup}>
            <button onClick={handleCopyHex} className={styles.actionButton}>Copy HEX</button>
            <button onClick={handleCopyRgb} className={styles.actionButton}>Copy RGB</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvertColorsClient;
