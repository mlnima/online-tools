"use client";
import React, { useState, ChangeEvent } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const isValidHex = (hex: string): boolean => {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex);
};

const isValidRgb = (rgb: string): boolean => {
  return /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.test(rgb);
};

const CssBackgroundColorGeneratorClient = () => {
  const [color, setColor] = useState("#3498db");
  const [input, setInput] = useState("#3498db");
  const [css, setCss] = useState("background-color: #3498db;");
  const [error, setError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setError("");
    if (isValidHex(val) || isValidRgb(val)) {
      setColor(val);
      setCss(`background-color: ${val};`);
    } else {
      setError("Invalid HEX or RGB color");
    }
  };

  const handleColorPicker = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setColor(e.target.value);
    setCss(`background-color: ${e.target.value};`);
    setError("");
  };

  const handleCopy = () => {
    if (css) navigator.clipboard.writeText(css);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Background Color Generator</h1>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="color-text-input" className={styles.label}>Enter Color (HEX or RGB)</label>
          <input
            type="text"
            id="color-text-input"
            value={input}
            onChange={handleInputChange}
            className={styles.inputField}
            placeholder="#RRGGBB or rgb(0,0,0)"
          />
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="color-picker-input" className={styles.label}>Or Pick Color</label>
          <input
            type="color"
            id="color-picker-input"
            value={isValidHex(input) ? input : color}
            onChange={handleColorPicker}
            className={styles.inputColor}
          />
        </div>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.outputColumn} style={{ marginTop: '1rem', alignItems: 'center' }}>
        <label className={styles.label}>Preview:</label>
        <div className={styles.colorPreviewContainer}>
          <div className={styles.colorPreview} style={{ backgroundColor: color }} />
        </div>
        <label htmlFor="css-output-bg-color" className={styles.label}>Generated CSS:</label>
        <textarea
          id="css-output-bg-color"
          value={css}
          readOnly
          className={styles.outputArea}
          rows={2}
          placeholder="background-color: ..."
        />
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleCopy} className={styles.actionButton} disabled={!css}>Copy CSS</button>
      </div>
    </div>
  );
};
export default CssBackgroundColorGeneratorClient;
