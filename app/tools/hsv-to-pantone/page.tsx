"use client";
import React from "react";

import toolsStyles from "../../styles/Tools.module.scss";

const pantoneTable = [
  { name: "Pantone Yellow", code: "PMS 107", hex: "#FEDD00" },
  { name: "Pantone Red", code: "PMS 186", hex: "#C8102E" },
  { name: "Pantone Green", code: "PMS 354", hex: "#00B140" },
  { name: "Pantone Blue", code: "PMS 285", hex: "#0072CE" },
  { name: "Pantone Orange", code: "PMS 151", hex: "#FF8200" },
  { name: "Pantone Purple", code: "PMS 2685", hex: "#330072" },
  { name: "Pantone Black", code: "PMS Black", hex: "#2D2926" },
  { name: "Pantone White", code: "PMS White", hex: "#FFFFFF" },
  { name: "Pantone Cool Gray 7", code: "PMS Cool Gray 7", hex: "#97999B" },
  // ... Add more Pantone colors as needed
];

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
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
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  const num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function colorDistance(a: [number, number, number], b: [number, number, number]) {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
    Math.pow(a[1] - b[1], 2) +
    Math.pow(a[2] - b[2], 2)
  );
}

function findClosestPantone(rgb: [number, number, number]) {
  let minDist = Infinity;
  let closest = pantoneTable[0];
  for (const p of pantoneTable) {
    const pRgb = hexToRgb(p.hex);
    const dist = colorDistance(rgb, pRgb);
    if (dist < minDist) {
      minDist = dist;
      closest = p;
    }
  }
  return closest;
}

export default function HsvToPantone() {
  const [h, setH] = React.useState(0);
  const [s, setS] = React.useState(0);
  const [v, setV] = React.useState(0);
  const [pantone, setPantone] = React.useState<{name: string, code: string, hex: string} | null>(null);
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    setPantone(null);
    if (h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
      setError("H: 0-360, S/V: 0-100");
      return;
    }
    try {
      const rgb = hsvToRgb(h, s, v);
      setPantone(findClosestPantone(rgb));
    } catch (e) {
      setError((e as Error).message || "Error");
    }
  }
  function handleCopy() {
    if (pantone) navigator.clipboard.writeText(`${pantone.name} (${pantone.code}): ${pantone.hex}`);
  }

  return (
    <div className={toolsStyles.toolPage}>
      <h1>HSV to Pantone</h1>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
        <input type="number" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} className={toolsStyles.inputNumber} placeholder="H (0-360)" style={{ width: 70 }} />
        <input type="number" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} className={toolsStyles.inputNumber} placeholder="S (0-100)" style={{ width: 70 }} />
        <input type="number" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} className={toolsStyles.inputNumber} placeholder="V (0-100)" style={{ width: 70 }} />
      </div>
      <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={toolsStyles.error}>{error}</div>}
      {pantone && (
        <div style={{ margin: '0 auto', maxWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, background: pantone.hex, border: '1px solid #ccc', borderRadius: 6 }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600 }}>{pantone.name}</div>
              <div style={{ fontSize: 14 }}>{pantone.code}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14 }}>{pantone.hex}</div>
            </div>
          </div>
          <button onClick={handleCopy} className={toolsStyles.actionButton}>Copy</button>
        </div>
      )}
    </div>
  );
}
