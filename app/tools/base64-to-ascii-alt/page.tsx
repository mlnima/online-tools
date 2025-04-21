"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Base64 to Ascii</h1>
      <p>Convert Base64 string to ASCII text.</p>
      <div className={unifiedToolPageStyles.formRow}>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="base64-input" className={unifiedToolPageStyles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Enter Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={unifiedToolPageStyles.inputArea}
          />
        </div>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="ascii-output" className={unifiedToolPageStyles.label}>ASCII Output</label>
          <textarea
            id="ascii-output"
            value={ascii}
            readOnly
            className={unifiedToolPageStyles.outputArea}
          />
        </div>
      </div>
      <div className={unifiedToolPageStyles.buttonRow}>
        <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton} disabled={!ascii}>Copy Output</button>
      </div>
    </div>
  );
}
