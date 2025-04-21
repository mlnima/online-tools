"use client";
import React, { useState } from "react";
import unifiedToolPageStyles from "../../styles/UnifiedToolPage.module.scss";

export default function JsonUrlEncode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleEncode() {
    setError("");
    try {
      const obj = JSON.parse(input);
      setOutput(encodeURIComponent(JSON.stringify(obj)));
    } catch {
      setError("Invalid JSON.");
      setOutput("");
    }
  }
  return (
    <div className={unifiedToolPageStyles.toolPage}>
      <h1>JSON URL Encode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste JSON here..."
        className={unifiedToolPageStyles.inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleEncode} className={unifiedToolPageStyles.actionButton} style={{ marginBottom: 16 }}>Encode</button>
      {error && <div className={unifiedToolPageStyles.error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="URL-encoded JSON output..."
        className={unifiedToolPageStyles.outputArea}
        
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={unifiedToolPageStyles.actionButton} >Copy</button>
      )}
    </div>
  );
}
