"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function AsciiToBase64Alt() {
  const [ascii, setAscii] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(ascii)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid ASCII input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Ascii to Base64</h1>
      <p>Convert ASCII text to Base64 encoding.</p>
      <div className={unifiedToolPageStyles.formRow}>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="ascii-input" className={unifiedToolPageStyles.label}>ASCII Input</label>
          <textarea
            id="ascii-input"
            placeholder="Enter ASCII text..."
            value={ascii}
            onChange={e => setAscii(e.target.value)}
            className={unifiedToolPageStyles.inputArea}
          />
        </div>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="base64-output" className={unifiedToolPageStyles.label}>Base64 Output</label>
          <textarea
            id="base64-output"
            value={base64}
            readOnly
            className={unifiedToolPageStyles.outputArea}
          />
        </div>
      </div>
      <div className={unifiedToolPageStyles.buttonRow}>
        <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton} disabled={!base64}>Copy Output</button>
      </div>
    </div>
  );
}
