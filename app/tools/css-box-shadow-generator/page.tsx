"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

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
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS Box Shadow Generator</h1>
      <p>Adjust shadow parameters, preview, and copy the CSS!</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", margin: "32px 0" }}>
        <div>
          <label>Horizontal Offset:</label>
          <input
            type="number"
            min={-100}
            max={100}
            value={h}
            onChange={e => setH(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
        </div>
        <div>
          <label>Vertical Offset:</label>
          <input
            type="number"
            min={-100}
            max={100}
            value={v}
            onChange={e => setV(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
        </div>
        <div>
          <label>Blur:</label>
          <input
            type="number"
            min={0}
            max={100}
            value={blur}
            onChange={e => setBlur(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
        </div>
        <div>
          <label>Spread:</label>
          <input
            type="number"
            min={-50}
            max={50}
            value={spread}
            onChange={e => setSpread(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
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
          <label>Inset:</label>
          <input
            type="checkbox"
            checked={inset}
            onChange={e => setInset(e.target.checked)}
            style={{ marginLeft: 8 }}
          />
        </div>
      </div>
      <div style={{ margin: "32px auto", padding: 32, background: "#fafafa", border: "1px solid #eee", borderRadius: 12, width: 320, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 180,
            height: 60,
            border: "2px solid #0070f3",
            borderRadius: 8,
            background: "#fff",
            boxShadow: `${inset ? "inset " : ""}${h}px ${v}px ${blur}px ${spread}px ${color}`,
            transition: "all 0.2s",
          }}
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>Generated CSS:</h3>
        <textarea
          value={css}
          readOnly
          rows={2}
          style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        />
        <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};

export default CssBoxShadowGenerator;

