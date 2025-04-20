"use client";
import React from "react";
import toolsStyles from "../../styles/Tools.module.scss";

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
    <div className={toolsStyles.toolPage}>
      <h1>CSS Background Color Generator</h1>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={toolsStyles.inputArea}
          placeholder="#RRGGBB or rgb(0,0,0)"
          style={{ width: 160 }}
        />
        <input
          type="color"
          value={isValidHex(input) ? input : color}
          onChange={handleColorPicker}
          style={{ width: 40, height: 40, border: 'none', background: 'none', padding: 0 }}
        />
      </div>
      {error && <div className={toolsStyles.error}>{error}</div>}
      <div style={{ margin: '16px 0' }}>
        <div style={{ width: 80, height: 40, background: color, border: '1px solid #ccc', borderRadius: 8, margin: '0 auto' }} />
      </div>
      <input
        value={css}
        readOnly
        className={toolsStyles.outputArea}
        style={{ width: 240, textAlign: 'center', fontFamily: 'monospace', fontSize: 16 }}
        placeholder="background-color: ..."
      />
      <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ marginTop: 12 }}>Copy</button>
    </div>
  );
}
