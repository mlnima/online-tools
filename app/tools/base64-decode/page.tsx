"use client";
import React, { useState } from "react";

export default function Base64Decode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleDecode() {
    setError("");
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (e) {
      setError("Invalid Base64 string.");
      setOutput("");
    }
  }
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 Decode</h1>
      <div style={{ maxWidth: 500, margin: '32px auto', textAlign: 'left' }}>
        <label htmlFor="base64input" style={{ fontWeight: 500 }}>Base64 Input</label>
        <textarea id="base64input" style={{ width: '100%', minHeight: 80, margin: '8px 0', padding: 8, fontSize: 16 }} placeholder="Paste Base64 string here..." value={input} onChange={e => setInput(e.target.value)} />
        <button style={{ margin: '8px 0', padding: '8px 16px', fontSize: 16 }} onClick={handleDecode}>Decode</button>
        <div style={{ marginTop: 16 }}>
          <label style={{ fontWeight: 500 }}>Decoded Output</label>
          <textarea style={{ width: '100%', minHeight: 80, margin: '8px 0', padding: 8, fontSize: 16 }} value={output} readOnly />
        </div>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  );
}
