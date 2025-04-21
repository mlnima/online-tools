"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function TextToBase64() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid text input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Text to Base64</h1>
      <p>Encode text to Base64 (UTF-8 encoded).</p>
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
        <label>Base64 Output:</label>
        <textarea
          rows={3}
          className={unifiedToolPageStyles.inputArea}
          value={base64}
          readOnly
        />
        <button onClick={handleCopy} disabled={!base64} className={unifiedToolPageStyles.marginTop6}>Copy</button>
      </div>
    </div>
  );
}

