"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

export default function Base64EncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function handleEncode() {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch (e) {
      setOutput("Invalid input");
    }
  }

  return (
    <div className={toolsStyles.toolPage} style={{ width: '80vw', maxWidth: 1200, minWidth: 320, margin: '0 auto' }}>
      <h1>Base64 Encode</h1>
      <p>Encode text to Base64 format.</p>
      <div className={toolsStyles.formRow} style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="base64-input" style={{ fontWeight: 600, marginBottom: 6 }}>Input</label>
          <textarea
            id="base64-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            className={toolsStyles.inputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
            placeholder="Enter text to encode..."
          />
        </div>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="base64-output" style={{ fontWeight: 600, marginBottom: 6 }}>Output</label>
          <textarea
            id="base64-output"
            value={output}
            readOnly
            className={toolsStyles.outputArea}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical', fontFamily: 'monospace' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleEncode} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Encode</button>
        <button onClick={() => navigator.clipboard.writeText(output)} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!output}>Copy Output</button>
      </div>
    </div>
  );
}
