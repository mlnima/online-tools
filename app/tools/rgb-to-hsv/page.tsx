"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

function rgbToHsv(rgb: string): string | null {
  // Accepts "r,g,b" or "#rrggbb"
  let r: number, g: number, b: number;
  if (rgb.startsWith("#")) {
    if (rgb.length === 7) {
      r = parseInt(rgb.slice(1, 3), 16);
      g = parseInt(rgb.slice(3, 5), 16);
      b = parseInt(rgb.slice(5, 7), 16);
    } else {
      return null;
    }
  } else {
    const parts = rgb.split(",").map(x => x.trim());
    if (parts.length !== 3) return null;
    r = Number(parts[0]);
    g = Number(parts[1]);
    b = Number(parts[2]);
    if ([r, g, b].some(x => isNaN(x) || x < 0 || x > 255)) return null;
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)},${Math.round(s * 100)},${Math.round(v * 100)}`;
}

export default function RgbToHsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    const hsv = rgbToHsv(input);
    if (hsv === null) {
      setError("Invalid RGB format. Use r,g,b (0-255) or #rrggbb.");
      setOutput("");
    } else {
      setOutput(hsv);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>RGB to HSV</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={2}
        placeholder="Enter RGB (e.g. 255,0,0 or #ff0000)"
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleConvert} className={styles.actionButton} style={{ marginBottom: 16 }}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={2}
        placeholder="HSV output (e.g. 0,100,100)"
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
