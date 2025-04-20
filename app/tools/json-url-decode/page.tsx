"use client";
import React, { useState } from "react";

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
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON URL Decode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste URL-encoded JSON here..."
        className={require('../../styles/Tools.module.scss').inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleDecode} className={require('../../styles/Tools.module.scss').actionButton} style={{ marginBottom: 16 }}>Decode</button>
      {error && <div className={require('../../styles/Tools.module.scss').error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="Decoded JSON output..."
        className={require('../../styles/Tools.module.scss').outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={require('../../styles/Tools.module.scss').actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
