"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  if (hex.length !== 6) throw new Error("Invalid HEX color");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const HexToRgbaClient = () => {
  const [hex, setHex] = React.useState("");
  const [alpha, setAlpha] = React.useState("1");
  const [rgba, setRgba] = React.useState<string>("");
  const [error, setError] = React.useState("");

  const handleConvert = () => {
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
  };

  const handleCopy = () => {
    if (rgba) navigator.clipboard.writeText(rgba);
  };

  return (
    <div className={styles.toolPage}>
      <h1>HEX to RGBA</h1>
      <div className={styles.inputRowContainer}> {/* New class for this div */}
        <input
          type="text"
          value={hex}
          onChange={e => setHex(e.target.value)}
          className={`${styles.inputField} ${styles.hexInput}`} {/* Existing + New class */}
          placeholder="#RRGGBB"
        />
        <input
          type="number"
          value={alpha}
          onChange={e => setAlpha(e.target.value)}
          className={`${styles.inputField} ${styles.alphaInput}`} {/* Existing + New class */}
          placeholder="Alpha (0-1)"
          min="0"
          max="1"
          step="0.01"
        />
      </div>
      <button onClick={handleConvert} className={styles.actionButton}>Convert</button>
      {error && <div className={styles.error}>{error}</div>}
      <input
        value={rgba}
        readOnly
        className={`${styles.outputField} ${styles.rgbaOutput}`} {/* Existing + New class */}
        placeholder="RGBA output"
      />
      {rgba && (
        <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
      )}
    </div>
  );
};

export default HexToRgbaClient;
