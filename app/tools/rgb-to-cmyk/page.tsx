"use client";
import React, { useState } from "react";
import styles from "../../styles/Tools.module.scss";

function rgbToCmyk(rgb: string): string | null {
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
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return '0,0,0,1';
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return `${Number((c).toFixed(2))},${Number((m).toFixed(2))},${Number((y).toFixed(2))},${Number((k).toFixed(2))}`;
}

export default function RgbToCmyk() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    const cmyk = rgbToCmyk(input);
    if (cmyk === null) {
      setError("Invalid RGB format. Use r,g,b (0-255) or #rrggbb.");
      setOutput("");
    } else {
      setOutput(cmyk);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>RGB to CMYK</h1>
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
        placeholder="CMYK output (e.g. 0,1,1,0)"
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
