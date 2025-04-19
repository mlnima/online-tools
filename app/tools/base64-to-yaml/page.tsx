"use client";
"use client";
import React, { useState } from "react";

export default function Base64ToYAML() {
  const [base64, setBase64] = useState("");
  const [yaml, setYaml] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setYaml(decoded);
    } catch (e) {
      setYaml("Invalid Base64 input");
    }
  }

  function handleCopy() {
    if (yaml) navigator.clipboard.writeText(yaml);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to YAML</h1>
      <p>Decode Base64 string to YAML text.</p>
      <textarea
        rows={4}
        style={{ width: "100%", fontSize: 16 }}
        placeholder="Paste Base64 string..."
        value={base64}
        onChange={e => setBase64(e.target.value)}
      />
      <br />
      <button onClick={handleConvert} style={{ margin: 8 }}>Convert</button>
      <div style={{ marginTop: 16, marginBottom: 8, textAlign: "left" }}>
        <label>YAML Output:</label>
        <textarea
          rows={3}
          style={{ width: "100%", fontSize: 16 }}
          value={yaml}
          readOnly
        />
        <button onClick={handleCopy} disabled={!yaml} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

