"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

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
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Base64 to Hexadecimal</h1>
      <p>Convert Base64 string to hexadecimal representation.</p>
      <div className={unifiedToolPageStyles.formRow}>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="base64-input" className={unifiedToolPageStyles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Paste Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={unifiedToolPageStyles.inputArea}
          />
        </div>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="hex-output" className={unifiedToolPageStyles.label}>Hexadecimal Output</label>
          <textarea
            id="hex-output"
            value={hex}
            readOnly
            className={unifiedToolPageStyles.outputArea}
          />
        </div>
      </div>
      <div className={unifiedToolPageStyles.buttonRow}>
        <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
        <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton} disabled={!hex || hex === "Invalid Base64 input"}>Copy Output</button>
      </div>
    </div>
  );
}
