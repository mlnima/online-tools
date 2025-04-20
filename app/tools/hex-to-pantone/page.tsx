"use client";
import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

const pantoneTable = [
  { code: "Pantone Yellow", name: "Yellow", hex: "#FEDD00" },
  { code: "Pantone 185 C", name: "Red", hex: "#E03C31" },
  { code: "Pantone 300 C", name: "Blue", hex: "#005EB8" },
  { code: "Pantone 354 C", name: "Green", hex: "#00B140" },
  { code: "Pantone 165 C", name: "Orange", hex: "#FF6900" },
  { code: "Pantone 2597 C", name: "Purple", hex: "#5F259F" },
  { code: "Pantone Black", name: "Black", hex: "#2D2926" },
  { code: "Pantone Cool Gray 6 C", name: "Gray", hex: "#A7A8AA" },
  { code: "Pantone White", name: "White", hex: "#FFFFFF" },
];
function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
function colorDist(a: number[], b: number[]) {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
    Math.pow(a[1] - b[1], 2) +
    Math.pow(a[2] - b[2], 2)
  );
}
function findClosestPantone(hex: string) {
  const rgb = hexToRgb(hex);
  let best = pantoneTable[0];
  let minDist = colorDist(rgb, hexToRgb(best.hex));
  for (const p of pantoneTable) {
    const d = colorDist(rgb, hexToRgb(p.hex));
    if (d < minDist) {
      minDist = d;
      best = p;
    }
  }
  return best;
}

export default function HexToPantone() {
  const [hex, setHex] = React.useState("");
  const [pantone, setPantone] = React.useState<{code:string,name:string,hex:string}|null>(null);
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    try {
      if (!hex) throw new Error("HEX color required");
      setPantone(findClosestPantone(hex));
    } catch (e) {
      setError((e as Error).message || "Error");
      setPantone(null);
    }
  }
  function handleCopy() {
    if (pantone) navigator.clipboard.writeText(`${pantone.code} (${pantone.hex})`);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>HEX to Pantone</h1>
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
        value={pantone ? `${pantone.code} (${pantone.hex})` : ""}
        readOnly
        className={toolsStyles.outputArea}
        style={{ width: 240, textAlign: 'center', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="Pantone output"
      />
      {pantone && (
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
      {pantone && (
        <div style={{ marginTop: 16 }}>
          <span style={{ display: 'inline-block', width: 40, height: 40, background: pantone.hex, border: '1px solid #ccc', borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}
