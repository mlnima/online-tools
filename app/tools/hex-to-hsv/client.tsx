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

const rgbToHsv = (rgb: number[]): [number, number, number] => {
  let r_prime = rgb[0] / 255, g_prime = rgb[1] / 255, b_prime = rgb[2] / 255;
  const cmax = Math.max(r_prime, g_prime, b_prime), cmin = Math.min(r_prime, g_prime, b_prime);
  let h_calc = 0, s_calc = 0, v_calc = cmax;
  const delta = cmax - cmin;
  s_calc = cmax === 0 ? 0 : delta / cmax;
  if (cmax === cmin) {
    h_calc = 0;
  } else {
    switch (cmax) {
      case r_prime: h_calc = (g_prime - b_prime) / delta + (g_prime < b_prime ? 6 : 0); break;
      case g_prime: h_calc = (b_prime - r_prime) / delta + 2; break;
      case b_prime: h_calc = (r_prime - g_prime) / delta + 4; break;
    }
    h_calc /= 6;
  }
  return [Math.round(h_calc * 360), Math.round(s_calc * 100), Math.round(v_calc * 100)];
};

const HexToHsvClient = () => {
  const [hex, setHex] = useState("");
  const [hsv, setHsv] = useState<[number, number, number] | null>(null);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      const rgbValues = hexToRgb(hex);
      setHsv(rgbToHsv(rgbValues));
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setHsv(null);
    }
  };

  const handleCopy = () => {
    if (hsv) navigator.clipboard.writeText(`H: ${hsv[0]}, S: ${hsv[1]}%, V: ${hsv[2]}%`);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HEX to HSV</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hex-input-hsv" className={styles.label}>HEX Input</label>
          <input
            type="text"
            id="hex-input-hsv"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className={styles.inputField}
            placeholder="#RRGGBB"
          />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="hsv-output-hex" className={styles.label}>HSV Output</label>
          <input
            id="hsv-output-hex"
            value={hsv ? `H: ${hsv[0]}, S: ${hsv[1]}%, V: ${hsv[2]}%` : ""}
            readOnly
            className={styles.inputField}
            placeholder="H, S%, V%"
          />
           {hsv && (
            <span className={styles.colorSwatch} style={{ backgroundColor: hex }} />
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {hsv && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
export default HexToHsvClient;
