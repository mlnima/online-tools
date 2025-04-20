"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

export default function Base64ToCSS() {
  const [base64, setBase64] = useState("");
  const [css, setCss] = useState("");

  function handleConvert() {
    if (!base64.trim()) {
      setCss("");
      return;
    }
    setCss(`background-image: url('data:image/png;base64,${base64.trim()}');`);
  }

  function handleCopy() {
    if (css) navigator.clipboard.writeText(css);
  }

  return (
    <div className={toolsStyles.toolPage} style={{ width: '80vw', maxWidth: 1200, minWidth: 320, margin: '0 auto' }}>
      <h1>Base64 to CSS</h1>
      <p>Convert Base64 image data to a CSS background-image property.</p>
      <div className={toolsStyles.formRow} style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start', justifyContent: 'center', width: '100%', maxWidth: 1900, margin: '0 auto', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="base64-input" style={{ fontWeight: 600, marginBottom: 6 }}>Base64 Input</label>
          <textarea
            id="base64-input"
            placeholder="Paste Base64 image data..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
            className={toolsStyles.inputArea}
            style={{ width: '100%', minHeight: 380, fontSize: 18, resize: 'vertical' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 380, maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <label htmlFor="css-output" style={{ fontWeight: 600, marginBottom: 6 }}>CSS Output</label>
          <textarea
            id="css-output"
            value={css}
            readOnly
            className={toolsStyles.outputArea}
            style={{ width: '100%', minHeight: 380, fontSize: 18, resize: 'vertical' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Convert</button>
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!css}>Copy Output</button>
      </div>
    </div>
  );
}

