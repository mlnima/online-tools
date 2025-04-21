
"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const borderStyles = [
  "solid",
  "dashed",
  "dotted",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
  "none",
];

const CssBorderGenerator: React.FC = () => {
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
          <label>Border Width (px):</label>
          <input
            type="number"
            min={0}
            max={32}
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputColumn}>
          <label>Style:</label>
          <select value={style} onChange={e => setStyle(e.target.value)} className={styles.primarySelect}>
            {borderStyles.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className={styles.inputColumn}>
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className={styles.inputField}
            
          />
        </div>
        <div className={styles.inputColumn}>
          <label>Radius (px):</label>
          <input
            type="number"
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
            width: 300,
            height: 250,
            border: `${width}px ${style} ${color}`,
            borderRadius: radius,
            // background: "#fff",
            transition: "all 0.2s",
          }}
        />
      </div>
      <div>
        <h3>Generated CSS:</h3>
        <textarea
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

export default CssBorderGenerator;

