"use client";
import React from "react";

import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function CmykToHex() {
  const [c, setC] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [k, setK] = React.useState(0);
  const [hex, setHex] = React.useState("");
  const [error, setError] = React.useState("");

  function clamp(val: number) {
    return Math.max(0, Math.min(100, val));
  }

  function handleConvert() {
    setError("");
    try {
      // Convert CMYK [0-100] to RGB [0-255]
      const C = clamp(c) / 100;
      const M = clamp(m) / 100;
      const Y = clamp(y) / 100;
      const K = clamp(k) / 100;
      const R = Math.round(255 * (1 - C) * (1 - K));
      const G = Math.round(255 * (1 - M) * (1 - K));
      const B = Math.round(255 * (1 - Y) * (1 - K));
      const hexVal = "#" + [R, G, B].map(x => x.toString(16).padStart(2, '0')).join("");
      setHex(hexVal.toUpperCase());
    } catch {
      setError("Invalid input. Please enter numbers between 0 and 100 for each value.");
      setHex("");
    }
  }

  function handleCopy() {
    if (hex) navigator.clipboard.writeText(hex);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>CMYK to HEX</h1>
      <div className={unifiedToolPageStyles.buttonRow}>
        <input type="number" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={unifiedToolPageStyles.inputField} placeholder="C" />
        <input type="number" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={unifiedToolPageStyles.inputField} placeholder="M" />
        <input type="number" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={unifiedToolPageStyles.inputField} placeholder="Y" />
        <input type="number" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={unifiedToolPageStyles.inputField} placeholder="K" />
      </div>
      <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton} >Convert</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <input
        value={hex}
        readOnly
        className={unifiedToolPageStyles.outputField}
        placeholder="#RRGGBB"
      />
      {hex && (
        <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton} >Copy</button>
      )}
      {hex && (
        <div className={unifiedToolPageStyles.hexSwatchWrapper}>
          <span className={unifiedToolPageStyles.hexSwatch} style={{background: hex}} />
        </div>
      )}
    </div>
  );
}
