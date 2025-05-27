"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const borderStyles = [
  "solid", "dashed", "dotted", "double", "groove", 
  "ridge", "inset", "outset", "none",
];

const CssBorderGeneratorClient: React.FC = () => {
  const [width, setWidth] = useState(2);
  const [style, setStyle] = useState("solid");
  const [color, setColor] = useState("#0070f3");
  const [radius, setRadius] = useState(8);

  const css = `border: ${width}px ${style} ${color};\nborder-radius: ${radius}px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Border Generator</h1>
      <p>Customize border width, style, color, and radius. Preview and copy the CSS!</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="border-width" className={styles.label}>Border Width (px):</label>
          <input
            type="number"
            id="border-width"
            min={0}
            max={32}
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="border-style" className={styles.label}>Style:</label>
          <select id="border-style" value={style} onChange={e => setStyle(e.target.value)} className={styles.primarySelect}>
            {borderStyles.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="border-color" className={styles.label}>Color:</label>
          <input
            type="color"
            id="border-color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className={styles.inputColor}
          />
        </div>
        <div className={styles.inputColumn}>
          <label htmlFor="border-radius" className={styles.label}>Radius (px):</label>
          <input
            type="number"
            id="border-radius"
            min={0}
            max={100}
            value={radius}
            onChange={e => setRadius(Number(e.target.value))}
            className={styles.inputField}
          />
        </div>
      </div>
      <div className={styles.previewArea}>
        <div
          className={styles.previewBox}
          style={{
            border: `${width}px ${style} ${color}`,
            borderRadius: `${radius}px`,
            width: '200px'  ,
            height: '100px'
          }}
        />
      </div>
      <div className={styles.outputColumn}>
        <label htmlFor="css-output-border" className={styles.label}>Generated CSS:</label>
        <textarea
          id="css-output-border"
          value={css}
          readOnly
          rows={3}
          className={styles.outputArea}
        />
      </div>
      <div className={styles.buttonRow}>
        <button onClick={handleCopy} className={styles.actionButton}>Copy CSS</button>
      </div>
    </div>
  );
};
export default CssBorderGeneratorClient;
