"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

function textToAscii(input: string): string {
  try {
    return Array.from(input).map(c => c.charCodeAt(0).toString()).join(" ");
  } catch {
    return "Invalid text input";
  }
}

export default function TextToASCII() {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");

  function handleConvert() {
    setAscii(textToAscii(text));
  }

  function handleCopy() {
    if (ascii && ascii !== "Invalid text input") navigator.clipboard.writeText(ascii);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Text to ASCII</h1>
      <p>Convert text to ASCII codes (space separated).</p>
      <textarea
        rows={4}
        className={unifiedToolPageStyles.inputArea}
        placeholder="Paste text..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className={unifiedToolPageStyles.buttonRow}>
        <button className={unifiedToolPageStyles.actionButton} onClick={handleConvert}>Convert</button>
      </div>
      <div className={unifiedToolPageStyles.outputArea}>
        <label>ASCII Output:</label>
        <textarea
          rows={3}
          className={unifiedToolPageStyles.inputArea}
          value={ascii}
          readOnly
        />
        <button onClick={handleCopy} disabled={!ascii || ascii === "Invalid text input"} className={unifiedToolPageStyles.marginTop6}>Copy</button>
      </div>
    </div>
  );
}

