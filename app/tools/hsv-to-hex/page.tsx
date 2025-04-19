"use client";
import React, { useState } from "react";

function hsvToHex(h: number, s: number, v: number): string {
  s /= 100;
  v /= 100;
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

const HsvToHex: React.FC = () => {
  const [h, setH] = useState(0);
  const [s, setS] = useState(100);
  const [v, setV] = useState(100);
  const [hex, setHex] = useState('');

  const handleConvert = () => {
    setHex(hsvToHex(h, s, v));
  };

  const handleCopy = () => {
    if (hex) navigator.clipboard.writeText(hex);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 32 }}>
      <h1>HSV to HEX</h1>
      <p>Convert HSV color values to HEX format.</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <label>H: <input type="number" min={0} max={360} value={h} onChange={e => setH(Number(e.target.value))} style={{ width: 60 }} /></label>
        <label>S: <input type="number" min={0} max={100} value={s} onChange={e => setS(Number(e.target.value))} style={{ width: 60 }} /></label>
        <label>V: <input type="number" min={0} max={100} value={v} onChange={e => setV(Number(e.target.value))} style={{ width: 60 }} /></label>
      </div>
      <button onClick={handleConvert} style={{ padding: "8px 24px", fontSize: 16 }}>Convert</button>
      {hex && (
        <div style={{ marginTop: 24 }}>
          <h3>HEX Output:</h3>
          <input value={hex} readOnly style={{ fontFamily: "monospace", fontSize: 16, width: 120, textAlign: "center" }} />
          <button onClick={handleCopy} style={{ marginLeft: 12 }}>Copy</button>
          <div style={{ width: 40, height: 40, background: hex, display: "inline-block", border: "1px solid #ccc", marginLeft: 16, verticalAlign: "middle" }} />
        </div>
      )}
    </div>
  );
};

export default HsvToHex;

