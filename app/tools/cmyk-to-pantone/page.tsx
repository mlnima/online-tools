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
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input type="number" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={styles.inputField} placeholder="C" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={styles.inputField} placeholder="M" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={styles.inputField} placeholder="Y" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={styles.inputField} placeholder="K" style={{ width: 60 }} />
      </div>
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={pantone ? `${pantone.code} (${pantone.name})` : ""}
        readOnly
        className={styles.outputField}
        style={{ width: 260, marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="Pantone Code (Name)"
      />
      {pantone && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
      {pantone && (
        <div style={{ marginTop: 16 }}>
          <span style={{ display: 'inline-block', width: 40, height: 40, background: pantone.hex, border: '1px solid #ccc', borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}
