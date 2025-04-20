"use client";
import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

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
    <div className={toolsStyles.toolPage}>
      <h1>CMYK to HEX</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input type="number" min={0} max={100} value={c} onChange={e => setC(Number(e.target.value))} className={toolsStyles.inputArea} placeholder="C" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={m} onChange={e => setM(Number(e.target.value))} className={toolsStyles.inputArea} placeholder="M" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={y} onChange={e => setY(Number(e.target.value))} className={toolsStyles.inputArea} placeholder="Y" style={{ width: 60 }} />
        <input type="number" min={0} max={100} value={k} onChange={e => setK(Number(e.target.value))} className={toolsStyles.inputArea} placeholder="K" style={{ width: 60 }} />
      </div>
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <input
        value={hex}
        readOnly
        className={toolsStyles.outputArea}
        style={{ width: 180, marginTop: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 20 }}
        placeholder="#RRGGBB"
      />
      {hex && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
      {hex && (
        <div style={{ marginTop: 16 }}>
          <span style={{ display: 'inline-block', width: 40, height: 40, background: hex, border: '1px solid #ccc', borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}
