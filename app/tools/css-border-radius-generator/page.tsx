"use client";
import React, { useState } from "react";
import styles from "../../styles/ToolPage.module.scss";

const CssBorderRadiusGenerator: React.FC = () => {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);

  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(css);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}>
      <h1>CSS Border Radius Generator</h1>
      <p>Adjust each corner's radius, preview the result, and copy the CSS!</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", margin: "32px 0" }}>
        <div>
          <label>Top Left:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={tl}
            onChange={e => setTl(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
        </div>
        <div>
          <label>Top Right:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={tr}
            onChange={e => setTr(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
        </div>
        <div>
          <label>Bottom Right:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={br}
            onChange={e => setBr(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
        </div>
        <div>
          <label>Bottom Left:</label>
          <input
            type="number"
            min={0}
            max={128}
            value={bl}
            onChange={e => setBl(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          /> px
        </div>
      </div>
      <div style={{ margin: "32px auto", padding: 32, background: "#fafafa", border: "1px solid #eee", borderRadius: 12, width: 320, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 180,
            height: 60,
            border: "2px solid #0070f3",
            borderRadius: `${tl}px ${tr}px ${br}px ${bl}px`,
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
          rows={2}
          style={{ width: "100%", fontFamily: "monospace", fontSize: 16 }}
        />
        <button onClick={handleCopy} className={styles.actionButton}>Copy</button>
      </div>
    </div>
  );
};

export default CssBorderRadiusGenerator;

