"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

function base64ToHex(base64: string): string {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
}

export default function Base64ToHexadecimal() {
  const [base64, setBase64] = useState("");
  const [hex, setHex] = useState("");

  function handleConvert() {
    setHex(base64ToHex(base64));
  }

  function handleCopy() {
    if (hex && hex !== "Invalid Base64 input") navigator.clipboard.writeText(hex);
  }

  return (
    <div className={toolsStyles.toolPage} style={{ width: '80vw', maxWidth: 1200, minWidth: 320, margin: '0 auto' }}>
      <h1>Base64 to Hexadecimal</h1>
      <p>Convert Base64 string to hexadecimal representation.</p>
      <div className={toolsStyles.formRow} style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="base64-input" style={{ fontWeight: 600, marginBottom: 6 }}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Paste Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={toolsStyles.inputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="hex-output" style={{ fontWeight: 600, marginBottom: 6 }}>Hexadecimal Output</label>
          <textarea
            id="hex-output"
            value={hex}
            readOnly
            className={toolsStyles.outputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Convert</button>
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!hex || hex === "Invalid Base64 input"}>Copy Output</button>
      </div>
    </div>
  );
}

