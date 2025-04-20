"use client";
import React, { useState } from "react";
import toolsStyles from "../../styles/Tools.module.scss";

function asciiToText(input: string): string {
  try {
    const parts = input.split(/[^0-9]+/).filter(Boolean);
    return parts.map(code => String.fromCharCode(Number(code))).join("");
  } catch {
    return "Invalid ASCII input";
  }
}

export default function ASCIIToText() {
  const [ascii, setAscii] = useState("");
  const [text, setText] = useState("");

  function handleConvert() {
    setText(asciiToText(ascii));
  }

  function handleCopy() {
    if (text && text !== "Invalid ASCII input") navigator.clipboard.writeText(text);
  }

  return (
    <div className={toolsStyles.toolPage} style={{ width: '80vw', maxWidth: 1200, minWidth: 320, margin: '0 auto' }}>
      <h1>ASCII to Text</h1>
      <p>Convert ASCII codes (space, comma, or line separated) to text.</p>
      <div className={toolsStyles.formRow} style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="ascii-input" style={{ fontWeight: 600, marginBottom: 6 }}>ASCII Input</label>
          <textarea
            id="ascii-input"
            className={toolsStyles.inputArea}
            placeholder="Paste ASCII codes (e.g. 72 101 108 108 111)..."
            value={ascii}
            onChange={e => setAscii(e.target.value)}
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="text-output" style={{ fontWeight: 600, marginBottom: 6 }}>Text Output</label>
          <textarea
            id="text-output"
            className={toolsStyles.outputArea}
            value={text}
            readOnly
            style={{ width: '100%', minHeight: 220, fontSize: 16, resize: 'vertical' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 0 0' }}>
        <button onClick={handleConvert} className={toolsStyles.actionButton} style={{ minWidth: 140, fontSize: 17, marginRight: 16 }}>Convert</button>
        <button onClick={handleCopy} className={toolsStyles.actionButton} style={{ minWidth: 100, fontSize: 16 }} disabled={!text || text === "Invalid ASCII input"}>Copy Output</button>
      </div>
    </div>
  );
}

