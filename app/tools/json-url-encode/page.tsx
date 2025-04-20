"use client";
import React, { useState } from "react";

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
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>JSON URL Encode</h1>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={3}
        placeholder="Paste JSON here..."
        className={require('../../styles/Tools.module.scss').inputArea}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <button onClick={handleEncode} className={require('../../styles/Tools.module.scss').actionButton} style={{ marginBottom: 16 }}>Encode</button>
      {error && <div className={require('../../styles/Tools.module.scss').error}>{error}</div>}
      <textarea
        value={output}
        readOnly
        rows={6}
        placeholder="URL-encoded JSON output..."
        className={require('../../styles/Tools.module.scss').outputArea}
        style={{ width: '100%', marginTop: 12, fontFamily: 'monospace' }}
      />
      {output && (
        <button onClick={() => navigator.clipboard.writeText(output)} className={require('../../styles/Tools.module.scss').actionButton} style={{ marginTop: 8 }}>Copy</button>
      )}
    </div>
  );
}
