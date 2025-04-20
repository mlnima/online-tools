"use client";import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export default function HexToRgba() {
  const [hex, setHex] = React.useState("");
  const [alpha, setAlpha] = React.useState("1");
  const [rgba, setRgba] = React.useState<string>("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      let a = parseFloat(alpha);
      if (isNaN(a) || a < 0 || a > 1) throw new Error("Alpha must be between 0 and 1");
      const [r, g, b] = hexToRgb(hex);
      setRgba(`rgba(${r}, ${g}, ${b}, ${a})`);
    } catch (e) {
      setError((e as Error).message || "Error");
      setRgba("");
    }
  }
  function handleCopy() {
    if (rgba) navigator.clipboard.writeText(rgba);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>HEX to RGBA</h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
        <input
          type="text"
          value={hex}
          onChange={e => setHex(e.target.value)}
          className={toolsStyles.inputArea}
          placeholder="#RRGGBB"
          style={{ width: 120 }}
        />
        <input
          type="number"
          value={alpha}
          onChange={e => setAlpha(e.target.value)}
          className={toolsStyles.inputArea}
          placeholder="Alpha (0-1)"
          min="0"
          max="1"
          step="0.01"
          style={{ width: 80 }}
        />
      </div>
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <input
        value={rgba}
        readOnly
        className={toolsStyles.outputArea}
        style={{ width: 260, textAlign: 'center', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="RGBA output"
      />
      {rgba && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
