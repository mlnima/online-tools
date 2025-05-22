"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function rgbToHex(rgb: string): string | null {
  let r: number, g: number, b: number;
  if (rgb.startsWith("#")) {
    if (rgb.length === 7) {
      return rgb.toLowerCase();
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
    return (
      "#" +
      [r, g, b]
        .map(x => x.toString(16).padStart(2, "0"))
        .join("")
        .toLowerCase()
    );
  }
}

export default function RgbToHex() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    const hex = rgbToHex(input);
    if (hex === null) {
      setError("Invalid RGB format. Use r,g,b (0-255) or #rrggbb.");
      setOutput("");
    } else {
      setOutput(hex);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>RGB to HEX</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={2}
        placeholder="Enter RGB (e.g. 255,0,0 or #ff0000)"
        className={styles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleConvert} className={styles.actionButton} >Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={2}
        placeholder="HEX output (e.g. #ff0000)"
        className={styles.outputArea}
        style={{ width: '100%', marginTop: 12 }}
      />
      {output && (
        <button onClick={handleCopy} className={styles.actionButton} >Copy</button>
      )}
    </div>
  );
}
