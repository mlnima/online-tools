"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const hsvToRgb = (h: number, s: number, v: number): [number, number, number] => {
  s /= 100;
  v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r_val = 0, g_val = 0, b_val = 0;
  if (0 <= h && h < 60) [r_val, g_val, b_val] = [c, x, 0];
  else if (60 <= h && h < 120) [r_val, g_val, b_val] = [x, c, 0];
  else if (120 <= h && h < 180) [r_val, g_val, b_val] = [0, c, x];
  else if (180 <= h && h < 240) [r_val, g_val, b_val] = [0, x, c];
  else if (240 <= h && h < 300) [r_val, g_val, b_val] = [x, 0, c];
  else if (300 <= h && h < 360) [r_val, g_val, b_val] = [c, 0, x];
  return [Math.round((r_val + m) * 255), Math.round((g_val + m) * 255), Math.round((b_val + m) * 255)];
};

const HsvToRgbClient = () => {
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [v, setV] = useState(0);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

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
      const [r_calc, g_calc, b_calc] = hsvToRgb(h, s, v);
      setOutput(`${r_calc}, ${g_calc}, ${b_calc}`);
    } catch (e: any) {
      setError((e as Error).message || "Error");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HSV to RGB</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="hsv-h-rgb" className={styles.label}>H (0-360):</label>
          <input type="number" id="hsv-h-rgb" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} className={styles.inputField} placeholder="H" />
          <label htmlFor="hsv-s-rgb" className={styles.label}>S (0-100%):</label>
          <input type="number" id="hsv-s-rgb" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} className={styles.inputField} placeholder="S" />
          <label htmlFor="hsv-v-rgb" className={styles.label}>V (0-100%):</label>
          <input type="number" id="hsv-v-rgb" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} className={styles.inputField} placeholder="V" />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="rgb-output" className={styles.label}>RGB Output (R, G, B)</label>
          <textarea
            id="rgb-output"
            value={output}
            readOnly
            className={styles.outputArea}
            rows={2}
            placeholder="R, G, B"
          />
           {output && (
            <span className={styles.colorSwatch} style={{ backgroundColor: `rgb(${output})` }} />
          )}
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
export default HsvToRgbClient;
