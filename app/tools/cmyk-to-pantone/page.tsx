"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

// Demo Pantone table: CMYK values and Pantone code/name
const pantoneTable = [
  { code: "Pantone Yellow", name: "Yellow", c: 0, m: 0, y: 100, k: 0, hex: "#FEDD00" },
  { code: "Pantone 185 C", name: "Red", c: 0, m: 91, y: 76, k: 0, hex: "#E03C31" },
  { code: "Pantone 300 C", name: "Blue", c: 100, m: 44, y: 0, k: 0, hex: "#005EB8" },
  { code: "Pantone 354 C", name: "Green", c: 82, m: 0, y: 87, k: 0, hex: "#009A44" },
  { code: "Pantone Black", name: "Black", c: 0, m: 0, y: 0, k: 100, hex: "#2D2926" },
  { code: "Pantone 7541 C", name: "Gray", c: 7, m: 2, y: 0, k: 4, hex: "#F1F2F2" }
];

function cmykDistance(a: number[], b: number[]) {
  return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
}

export default function CmykToPantone() {
  const [c, setC] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [k, setK] = React.useState(0);
  const [pantone, setPantone] = React.useState(null as null | typeof pantoneTable[0]);
  const [error, setError] = React.useState("");

  function clamp(val: number) {
    return Math.max(0, Math.min(100, val));
  }

  function handleConvert() {
    setError("");
    try {
      const input = [clamp(c), clamp(m), clamp(y), clamp(k)];
      let minDist = Infinity;
      let best = null;
      for (const p of pantoneTable) {
        const dist = cmykDistance(input, [p.c, p.m, p.y, p.k]);
        if (dist < minDist) {
          minDist = dist;
          best = p;
        }
      }
      setPantone(best);
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setPantone(null);
    }
  }

  function handleCopy() {
    if (pantone) navigator.clipboard.writeText(`${pantone.code} (${pantone.name})`);
  }

  return (
    <div className={styles.toolPage}>
      <h1>CMYK to Pantone</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="cmyk-c-pantone" className={styles.label}>C (Cyan %)</label>
          <input type="number" id="cmyk-c-pantone" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          
          <label htmlFor="cmyk-m-pantone" className={styles.label}>M (Magenta %)</label>
          <input type="number" id="cmyk-m-pantone" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          
          <label htmlFor="cmyk-y-pantone" className={styles.label}>Y (Yellow %)</label>
          <input type="number" id="cmyk-y-pantone" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
          
          <label htmlFor="cmyk-k-pantone" className={styles.label}>K (Key/Black %)</label>
          <input type="number" id="cmyk-k-pantone" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={styles.inputField} placeholder="0-100" />
        </div>
        <div className={styles.outputColumn}>
          <label htmlFor="pantone-output" className={styles.label}>Pantone Output</label>
          <input
            id="pantone-output"
            value={pantone ? `${pantone.code} (${pantone.name})` : ""}
            readOnly
            className={styles.inputField}
            placeholder="Pantone Code (Name)"
          />
          {pantone && (
            <span className={styles.colorSwatch} /> 
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
        {pantone && (
          <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
