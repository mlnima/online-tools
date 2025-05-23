"use client";
import React, { useState } from "react";
import styles from "../../styles/UnifiedToolPage.module.scss";

const resizeOptions = [
  { value: "none", label: "None" },
  { value: "both", label: "Both" },
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
];

const CssBoxResizeGenerator: React.FC = () => {
  const [resize, setResize] = useState("both");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(80);

  const css = `resize: ${resize};\nwidth: ${width}px;\nheight: ${height}px;\noverflow: auto;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
  };

  return (
    <div className={styles.toolPage}>
      <h1>CSS Box Resize Generator</h1>
      <p>Set the resize property, adjust box size, preview, and copy the CSS!</p>
      <div className={styles.formRow}>
        <div className={styles.inputColumn}>
          <label htmlFor="resize-select" className={styles.label}>Resize:</label>
          <select id="resize-select" value={resize} onChange={e => setResize(e.target.value)} className={styles.primarySelect}>
            {resizeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <label htmlFor="width-input" className={styles.label}>Width (px):</label>
          <input
            type="number"
            id="width-input"
            min={40}
            max={600}
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            className={styles.inputField}
          />

          <label htmlFor="height-input" className={styles.label}>Height (px):</label>
          <input
            type="number"
            id="height-input"
            min={20}
            max={400}
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
            className={styles.inputField}
          />
        </div>
        <div className={styles.outputColumn}>
          <label className={styles.label}>Preview:</label>
          <div
            className={styles.previewBox}
            style={{
              resize: resize as React.CSSProperties['resize'],
              width: width + 'px',
              height: height + 'px',
              overflow: 'auto',
            }}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            Try resizing me!
          </div>
          <label htmlFor="css-output" className={styles.label}>Generated CSS:</label>
          <textarea
            id="css-output"
            value={css}
            readOnly
            rows={4}
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

export default CssBoxResizeGenerator;

