"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const CssBoxShadowGenerator: React.FC = () => {
  const [h, setH] = useState(8);
  const [v, setV] = useState(8);
  const [blur, setBlur] = useState(16);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#0070f3");
  const [inset, setInset] = useState(false);

  const css = `box-shadow: ${inset ? "inset " : ""}${h}px ${v}px ${blur}px ${spread}px ${color};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Box Shadow Generator</h1>
      <p>Adjust shadow parameters, preview, and copy the CSS!</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="h-offset" className={styles.label}>Horizontal Offset (px):</label>
          <input
            type="number"
            id="h-offset"
            min={-100}
            max={100}
            value={h}
            onChange={e => setH(Number(e.target.value))}
            className={styles.inputField}
          />

          <label htmlFor="v-offset" className={styles.label}>Vertical Offset (px):</label>
          <input
            type="number"
            id="v-offset"
            min={-100}
            max={100}
            value={v}
            onChange={e => setV(Number(e.target.value))}
            className={styles.inputField}
          />

          <label htmlFor="blur-radius" className={styles.label}>Blur Radius (px):</label>
          <input
            type="number"
            id="blur-radius"
            min={0}
            max={100}
            value={blur}
            onChange={e => setBlur(Number(e.target.value))}
            className={styles.inputField}
          />

          <label htmlFor="spread-radius" className={styles.label}>Spread Radius (px):</label>
          <input
            type="number"
            id="spread-radius"
            min={-50}
            max={50}
            value={spread}
            onChange={e => setSpread(Number(e.target.value))}
            className={styles.inputField}
          />

          <label htmlFor="shadow-color" className={styles.label}>Color:</label>
          <input
            type="color"
            id="shadow-color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className={styles.inputColor}
          />

          <label htmlFor="inset-checkbox" className={styles.label}>
            <input
              type="checkbox"
              id="inset-checkbox"
              checked={inset}
              onChange={e => setInset(e.target.checked)}
            />
            &nbsp;Inset
          </label>
        </div>
        <div className={styles.outputColumn}>
          <label className={styles.label}>Preview:</label>
          <div
            className={styles.previewBox}
            style={{
              boxShadow: `${inset ? "inset " : ""}${h}px ${v}px ${blur}px ${spread}px ${color}`
            }}
          />
          <label htmlFor="css-output" className={styles.label}>Generated CSS:</label>
          <textarea
            id="css-output"
            value={css}
            readOnly
            rows={3} 
            className={styles.outputArea}
          />
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleCopy} className={styles.actionButton}>Copy CSS</button>
      </div>
    </div>
  );
};

export default CssBoxShadowGenerator;

