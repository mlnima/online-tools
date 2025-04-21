"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function TSVToBase64() {
  const [tsv, setTsv] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(tsv)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid TSV input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>TSV to Base64</h1>
      <p>Encode TSV text to Base64 (UTF-8 encoded).</p>
      <textarea
        rows={4}
        className={unifiedToolPageStyles.inputArea}
        placeholder="Paste TSV text..."
        value={tsv}
        onChange={e => setTsv(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} className={unifiedToolPageStyles.actionButton}>Convert</button>
      <div className={unifiedToolPageStyles.outputArea}>
        <label>Base64 Output:</label>
        <textarea
          rows={3}
          className={unifiedToolPageStyles.outputArea}
          value={base64}
          readOnly
        />
        <button onClick={handleCopy} disabled={!base64} className={unifiedToolPageStyles.actionButton}>Copy</button>
      </div>
    </div>
  );
}
