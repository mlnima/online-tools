"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

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
    <div className={toolsStyles.toolPage} style={{ width: '80vw', maxWidth: 1200, minWidth: 320, margin: '0 auto' }}>
      <h1>Ascii to Base64</h1>
      <p>Convert ASCII text to Base64 encoding.</p>
      <div className={toolsStyles.formRow}>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="ascii-input" style={{ fontWeight: 600, marginBottom: 6 }}>ASCII Input</label>
          <textarea
            id="ascii-input"
            placeholder="Enter ASCII text..."
            value={ascii}
            onChange={e => setAscii(e.target.value)}
            className={toolsStyles.inputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="base64-output" style={{ fontWeight: 600, marginBottom: 6 }}>Base64 Output</label>
          <textarea
            id="base64-output"
            value={base64}
            readOnly
            className={toolsStyles.outputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Convert</button>
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!base64}>Copy Output</button>
      </div>
    </div>
  );
}

