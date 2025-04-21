"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedUnifiedToolPage.module.scss";

export default function YAMLToBase64() {
  const [yaml, setYaml] = useState("");
  const [base64, setBase64] = useState("");

  function handleConvert() {
    try {
      const encoded = btoa(unescape(encodeURIComponent(yaml)));
      setBase64(encoded);
    } catch (e) {
      setBase64("Invalid YAML input");
    }
  }

  function handleCopy() {
    if (base64) navigator.clipboard.writeText(base64);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>YAML to Base64</h1>
      <p>Encode YAML text to Base64 (UTF-8 encoded).</p>
      <textarea
        rows={4}
        className={unifiedToolPageStyles.inputArea}
        placeholder="Paste YAML text..."
        value={yaml}
        onChange={e => setYaml(e.target.value)}
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

