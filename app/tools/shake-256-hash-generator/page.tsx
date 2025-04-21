"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function Shake256HashGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleHash() {
    setError("");
    // SHAKE-256 is not available in browser JS. Placeholder only.
    setOutput("[SHAKE-256 hash would appear here - not supported in browser JS]");
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>Shake-256 Hash Generator</h1>
      <div className={unifiedToolPageStyles.warning}>
        SHAKE-256 is not natively supported in browser JavaScript. This is a placeholder.
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        placeholder="Enter text to hash..."
        className={unifiedToolPageStyles.inputArea}
        
      />
      <button onClick={handleHash} className={unifiedToolPageStyles.actionButton} >Generate Hash</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={4}
        placeholder="SHAKE-256 hash output..."
        className={unifiedToolPageStyles.outputArea}
        
      />
      {output && (
        <button onClick={handleCopy} className={unifiedToolPageStyles.actionButton} >Copy</button>
      )}
    </div>
  );
}
