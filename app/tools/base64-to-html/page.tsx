"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToHTML() {
  const [base64, setBase64] = useState("");
  const [html, setHtml] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setHtml(decoded);
    } catch (e) {
      setHtml("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (html) navigator.clipboard.writeText(html);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Base64 to HTML</h1>
      <p>Decode Base64 string to HTML text.</p>
      <div className={unifiedToolPageStyles.formRow}>
        <div className={unifiedToolPageStyles.inputColumn}>
          <label htmlFor="base64-input" className={unifiedToolPageStyles.label}>Base64 Input</label>
          <textarea
            id="base64-input"
            rows={4}
            className={unifiedToolPageStyles.inputArea}
            placeholder="Paste Base64 string..."
            value={base64}
            onChange={e => setBase64(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className={unifiedToolPageStyles.buttonRow}>
        <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
      </div>
      <div className={unifiedToolPageStyles.formRow}>
        <label>HTML Output:</label>
        <textarea
          id="html-output"
          rows={3}
          className={unifiedToolPageStyles.outputArea}
          value={html}
          readOnly
        />
        <div className={unifiedToolPageStyles.buttonRow}>
          <button onClick={handleCopy} disabled={!html} className={unifiedToolPageStyles.actionButton}>Copy</button>
        </div>
      </div>
    </div>
  );
}
