import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HSV to HEX Converter | WebWizKit',
  description: 'Convert HSV (Hue, Saturation, Value) color values to HEX (Hexadecimal) format. An online color conversion tool by WebWizKit.',
  keywords: ['HSV to HEX', 'Color Converter', 'HSV', 'HEX', 'Hexadecimal', 'Color Model', 'Online Tool', 'WebWizKit', 'CSS Colors']
};

"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hsvToHex(h: number, s: number, v: number): string {
  s /= 100;
  v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

const HsvToHex: React.FC = () => {
  const [h, setH] = useState(0);
  const [s, setS] = useState(100);
  const [v, setV] = useState(100);
  const [hex, setHex] = useState('');
  const [error, setError] = useState<string | null>(null); // Added error state

  const handleConvert = () => {
    setError(null); // Clear previous error
    setHex('');   // Clear previous output

    if (isNaN(h) || isNaN(s) || isNaN(v)) {
      setError("Please enter valid numbers for H, S, and V.");
      return;
    }

    if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
      setError("Invalid range. H: 0-360, S: 0-100, V: 0-100.");
      return;
    }

    try {
      setHex(hsvToHex(h, s, v));
    } catch (e) {
      setError("Error during color conversion."); // Generic fallback
    }
  };

  const handleCopy = () => {
    if (hex) navigator.clipboard.writeText(hex);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HSV to HEX</h1>
      <p>Convert HSV color values to HEX format.</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hsv-h-input" className={styles.label}>H (0-360):</label>
          <input type="number" id="hsv-h-input" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} className={styles.inputField} />
          
          <label htmlFor="hsv-s-input" className={styles.label}>S (0-100%):</label>
          <input type="number" id="hsv-s-input" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} className={styles.inputField} />
          
          <label htmlFor="hsv-v-input" className={styles.label}>V (0-100%):</label>
          <input type="number" id="hsv-v-input" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} className={styles.inputField} />
        </div>
        <div className={styles.outputColumn}>
          {hex && (
            <>
              <label htmlFor="hex-output" className={styles.label}>HEX Output:</label>
              <input id="hex-output" value={hex} readOnly className={styles.inputField} />
              <div className={styles.colorSwatch} style={{ background: hex }} />
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {hex && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>} {/* Added error display */}
    </div>
  );
};

export default HsvToHex;

