"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  if (h.length !== 6) return null;
  const num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function invertRgb([r, g, b]: [number, number, number]): [number, number, number] {
  return [255 - r, 255 - g, 255 - b];
}

function parseColor(input: string): [number, number, number] | null {
  input = input.trim();
  if (input.startsWith('#')) return hexToRgb(input);
  const rgbMatch = input.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1).map(Number);
    if ([r, g, b].every(x => x >= 0 && x <= 255)) return [r, g, b];
  }
  return null;
}

export default function InvertColors() {
  const [input, setInput] = React.useState("");
  const [outputHex, setOutputHex] = React.useState("");
  const [outputRgb, setOutputRgb] = React.useState("");
  const [error, setError] = React.useState("");

  function handleConvert() {
    setError("");
    setOutputHex("");
    setOutputRgb("");
    const rgb = parseColor(input);
    if (!rgb) {
      setError("Input must be a valid HEX (#RRGGBB or #RGB) or rgb(r,g,b)");
      return;
    }
    const inv = invertRgb(rgb);
    setOutputHex(rgbToHex(...inv));
    setOutputRgb(`rgb(${inv[0]}, ${inv[1]}, ${inv[2]})`);
  }

  function handleCopyHex() {
    if (outputHex) navigator.clipboard.writeText(outputHex);
  }
  function handleCopyRgb() {
    if (outputRgb) navigator.clipboard.writeText(outputRgb);
  }

  return (
    <div className={styles.toolPage}>
      <h1>Invert Colors</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className={styles.inputText}
        placeholder="#123456 or rgb(18,52,86)"
        style={{ width: 220, marginBottom: 8 }}
      />
      <button onClick={handleConvert} className={styles.actionButton} >Invert</button>
      {error && <div className={styles.error}>{error}</div>}
      {outputHex && (
        <div style={{ margin: '0 auto', maxWidth: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, background: outputHex, border: '1px solid #ccc', borderRadius: 6 }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600 }}>{outputHex}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 14 }}>{outputRgb}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button onClick={handleCopyHex} className={styles.actionButton}>Copy HEX</button>
            <button onClick={handleCopyRgb} className={styles.actionButton}>Copy RGB</button>
          </div>
        </div>
      )}
    </div>
  );
}
