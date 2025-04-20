"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

export default function Base64ToAsciiAlt() {
  const [base64, setBase64] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setAscii(decoded);
    } catch (e) {
      setAscii("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (ascii) navigator.clipboard.writeText(ascii);
  }

  return (
    <div className={toolsStyles.toolPage} style={{ width: '80vw', maxWidth: 1200, minWidth: 320, margin: '0 auto' }}>
      <h1>Base64 to Ascii</h1>
      <p>Convert Base64 string to ASCII text.</p>
      <div className={toolsStyles.formRow}>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="base64-input" style={{ fontWeight: 600, marginBottom: 6 }}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Enter Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={toolsStyles.inputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="ascii-output" style={{ fontWeight: 600, marginBottom: 6 }}>ASCII Output</label>
          <textarea
            id="ascii-output"
            value={ascii}
            readOnly
            className={toolsStyles.outputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Convert</button>
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!ascii}>Copy Output</button>
      </div>
    </div>
  );
}
