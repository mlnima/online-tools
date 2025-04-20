"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

function base64ToBinary(base64: string): string {
  try {
    const str = atob(base64);
    return Array.from(str)
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  } catch {
    return "Invalid Base64 input";
  }
}

export default function Base64ToBinary() {
  const [base64, setBase64] = useState("");
  const [binary, setBinary] = useState("");

  function handleConvert() {
    setBinary(base64ToBinary(base64));
  }

  function handleCopy() {
    if (binary && binary !== "Invalid Base64 input") navigator.clipboard.writeText(binary);
  }

  return (
    <div className={toolsStyles.toolPage} style={{ width: '80vw', maxWidth: 1200, minWidth: 320, margin: '0 auto' }}>
      <h1>Base64 to Binary</h1>
      <p>Convert Base64 string to binary representation.</p>
      <div className={toolsStyles.formRow} style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start', justifyContent: 'center', width: '100%', maxWidth: 1900, margin: '0 auto', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="base64-input" style={{ fontWeight: 600, marginBottom: 6 }}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Enter Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={toolsStyles.inputArea}
            style={{ width: '100%', minHeight: 380, fontSize: 18, resize: 'vertical' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="binary-output" style={{ fontWeight: 600, marginBottom: 6 }}>Binary Output</label>
          <textarea
            id="binary-output"
            value={binary}
            readOnly
            className={toolsStyles.outputArea}
            style={{ width: '100%', minHeight: 380, fontSize: 18, resize: 'vertical' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Convert</button>
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!binary || binary === "Invalid Base64 input"}>Copy Output</button>
      </div>
    </div>
  );
}
