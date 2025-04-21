"use client";
import React from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

function isValidHex(hex: string) {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex);
}
function isValidRgb(rgb: string) {
  return /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.test(rgb);
}

export default function CssBackgroundColorGenerator() {
  const [color, setColor] = React.useState("#3498db");
  const [input, setInput] = React.useState("#3498db");
  const [css, setCss] = React.useState("background-color: #3498db;");
  const [error, setError] = React.useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInput(val);
    setError("");
    if (isValidHex(val) || isValidRgb(val)) {
      setColor(val);
      setCss(`background-color: ${val};`);
    } else {
      setError("Invalid HEX or RGB color");
    }
  }
  function handleColorPicker(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    setColor(e.target.value);
    setCss(`background-color: ${e.target.value};`);
    setError("");
  }
  function handleCopy() {
    if (css) navigator.clipboard.writeText(css);
  }

  return (
    <div className={styles.toolPage}>
      <h1>CSS Background Color Generator</h1>
      <div className={styles.buttonRow}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={styles.inputField}
          placeholder="#RRGGBB or rgb(0,0,0)"
        />
        <input
          type="color"
          value={isValidHex(input) ? input : color}
          onChange={handleColorPicker}
          className={styles.inputColor}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.colorPreviewContainer}>
        <div className={styles.colorPreview} style={{ background: color }} />
      </div>
      <input
        value={css}
        readOnly
        className={styles.outputField}
        placeholder="background-color: ..."
      />
      <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
    </div>
  );
}
