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
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS Box Resize Generator</h1>
      <p>Set the resize property, adjust box size, preview, and copy the CSS!</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", margin: "32px 0" }}>
        <div>
          <label>Resize:</label>
          <select value={resize} onChange={e => setResize(e.target.value)} style={{ marginLeft: 8 }}>
            {resizeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Width (px):</label>
          <input
            type="number"
            min={40}
            max={600}
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            style={{ width: 70, marginLeft: 8 }}
          />
        </div>
        <div>
          <label>Height (px):</label>
          <input
            type="number"
            min={20}
            max={400}
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
            style={{ width: 70, marginLeft: 8 }}
          />
        </div>
      </div>
      <div style={{ margin: "32px auto", padding: 32, background: "#fafafa", border: "1px solid #eee", borderRadius: 12, width: 320, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            resize: resize as React.CSSProperties['resize'],
            width,
            height,
            overflow: "auto",
            border: "2px solid #0070f3",
            background: "#fff",
            borderRadius: 8,
            minWidth: 40,
            minHeight: 20,
            maxWidth: 600,
            maxHeight: 400,
            padding: 8,
            transition: "all 0.2s",
            boxSizing: "border-box",
          }}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          Try resizing me!
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>Generated CSS:</h3>
        <textarea
          value={css}
          readOnly
          rows={4}
          style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        />
        <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};

export default CssBoxResizeGenerator;

