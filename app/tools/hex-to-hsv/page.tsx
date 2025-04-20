"use client";import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
function rgbToHsv([r, g, b]: number[]): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

export default function HexToHsv() {
  const [hex, setHex] = React.useState("");
  const [hsv, setHsv] = React.useState<[number, number, number] | null>(null);
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      const rgb = hexToRgb(hex);
      setHsv(rgbToHsv(rgb));
    } catch (e) {
      setError((e as Error).message || "Error");
      setHsv(null);
    }
  }
  function handleCopy() {
    if (hsv) navigator.clipboard.writeText(`H: ${hsv[0]}, S: ${hsv[1]}%, V: ${hsv[2]}%`);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>HEX to HSV</h1>
      <input
        type="text"
        value={hex}
        onChange={e => setHex(e.target.value)}
        className={toolsStyles.inputArea}
        placeholder="#RRGGBB"
        style={{ width: 120, marginBottom: 8 }}
      />
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <input
        value={hsv ? `H: ${hsv[0]}, S: ${hsv[1]}%, V: ${hsv[2]}%` : ""}
        readOnly
        className={toolsStyles.outputArea}
        style={{ width: 240, textAlign: 'center', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="HSV output"
      />
      {hsv && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
