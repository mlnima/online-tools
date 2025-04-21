"use client";
"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function Base64ToTSV() {
  const [base64, setBase64] = useState("");
  const [tsv, setTsv] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setTsv(decoded);
    } catch (e) {
      setTsv("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (tsv) navigator.clipboard.writeText(tsv);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Base64 to TSV</h1>
      <p>Decode Base64 string to TSV text.</p>
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
      <div className={unifiedToolPageStyles.buttonRow}>
        <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
      </div>
      <div className={unifiedToolPageStyles.formRow}>
        <label className={unifiedToolPageStyles.label}>TSV Output:</label>
        <textarea
          id="tsv-output"
          rows={3}
          className={unifiedToolPageStyles.outputArea}
          value={tsv}
          readOnly
        />
        <div className={unifiedToolPageStyles.buttonRow}>
          <button onClick={handleCopy} disabled={!tsv} className={unifiedToolPageStyles.actionButton}>Copy</button>
        </div>
      </div>
    </div>
  );
}
