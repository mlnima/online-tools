"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonUrlDecode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecode() {
    setError("");
    try {
      const decoded = decodeURIComponent(input);
      const obj = JSON.parse(decoded);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setError("Invalid URL-encoded JSON.");
      setOutput("");
    }
  }
  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>JSON URL Decode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste URL-encoded JSON here..."
        className={unifiedToolPageStyles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleDecode} className={unifiedToolPageStyles.actionButton} style={{ marginBottom: 16 }}>Decode</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="Decoded JSON output..."
        className={unifiedToolPageStyles.outputArea}
        
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={unifiedToolPageStyles.actionButton} >Copy</button>
      )}
    </div>
  );
}
