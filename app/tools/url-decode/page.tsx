"use client";
import React from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

import { useState } from "react";

export default function UrlDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>URL Decode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        className={unifiedToolPageStyles.outputArea}
        placeholder="Enter encoded text to decode..."
      />
      <div className={unifiedToolPageStyles.marginTop16}>
        <button onClick={handleDecode} className={unifiedToolPageStyles.actionButton}>Decode</button>
      </div>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      {output && (
        <div className={unifiedToolPageStyles.marginTop24}>
          <h3>Decoded Result:</h3>
          <textarea value={output} readOnly rows={2} className={unifiedToolPageStyles.outputArea} />
        </div>
      )}
    </div>
  );
}

