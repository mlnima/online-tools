
"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

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
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS Border Generator</h1>
      <p>Customize border width, style, color, and radius. Preview and copy the CSS!</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", margin: "32px 0" }}>
        <div>
          <label>Border Width (px):</label>
          <input
            type="number"
            min={0}
            max={32}
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </div>
        <div>
          <label>Style:</label>
          <select value={style} onChange={e => setStyle(e.target.value)} style={{ marginLeft: 8 }}>
            {borderStyles.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            style={{ marginLeft: 8 }}
          />
        </div>
        <div>
          <label>Radius (px):</label>
          <input
            type="number"
            min={0}
            max={100}
            value={radius}
            onChange={e => setRadius(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </div>
      </div>
      <div style={{ margin: "32px auto", padding: 32, background: "#fafafa", border: "1px solid #eee", borderRadius: 12, width: 320, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 180,
            height: 60,
            border: `${width}px ${style} ${color}`,
            borderRadius: radius,
            background: "#fff",
            transition: "all 0.2s",
          }}
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>Generated CSS:</h3>
        <textarea
          value={css}
          readOnly
          rows={3}
          style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        />
        <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};

export default CssBorderGenerator;

