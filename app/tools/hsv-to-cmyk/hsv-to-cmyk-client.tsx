"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const hsvToRgb = (h: number, s: number, v: number) => {
  s /= 100;
  v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

const rgbToCmyk = (r: number, g: number, b: number) => {
  let r1 = r / 255, g1 = g / 255, b1 = b / 255;
  let k = 1 - Math.max(r1, g1, b1);
  if (k === 1) return [0, 0, 0, 100]; // Handle black color case to avoid division by zero
  let c = (1 - r1 - k) / (1 - k) || 0;
  let m = (1 - g1 - k) / (1 - k) || 0;
  let y = (1 - b1 - k) / (1 - k) || 0;
  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
};

const HsvToCmykClient = () => {
  const [h, setH] = React.useState(0);
  const [s, setS] = React.useState(0);
  const [v, setV] = React.useState(0);
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  const handleConvert = () => {
    setError("");
    setOutput("");

    if (isNaN(h) || isNaN(s) || isNaN(v)) {
      setError("Please enter valid numbers for H, S, and V.");
      return;
    }

    if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
      setError("Invalid range. H: 0-360, S: 0-100, V: 0-100.");
      return;
    }
    try {
      const [r_val, g_val, b_val] = hsvToRgb(h, s, v);
      const [c_val, m_val, y_val, k_val] = rgbToCmyk(r_val, g_val, b_val);
      setOutput(`${c_val}%, ${m_val}%, ${y_val}%, ${k_val}%`);
    } catch (e) {
      setError((e as Error).message || "Error converting color.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HSV to CMYK</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hsv-h-input" className={styles.label}>H (0-360):</label>
          <input type="number" id="hsv-h-input" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} className={styles.inputField} placeholder="H" />
          
          <label htmlFor="hsv-s-input" className={styles.label}>S (0-100%):</label>
          <input type="number" id="hsv-s-input" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} className={styles.inputField} placeholder="S" />
          
          <label htmlFor="hsv-v-input" className={styles.label}>V (0-100%):</label>
          <input type="number" id="hsv-v-input" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} className={styles.inputField} placeholder="V" />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="cmyk-output" className={styles.label}>CMYK Output (C, M, Y, K)</label>
          <textarea
            id="cmyk-output"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={2}
            placeholder="C, M, Y, K"
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {output && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default HsvToCmykClient;
