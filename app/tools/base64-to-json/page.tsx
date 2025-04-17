"use client";
import React, { useState } from "react";

export default function Base64ToJSON() {
  const [base64, setBase64] = useState("");
  const [json, setJson] = useState("");

  function handleConvert() {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      const obj = JSON.parse(decoded);
      setJson(JSON.stringify(obj, null, 2));
    } catch (e) {
      setJson("Invalid Base64 or JSON input");
    }
  }

  function handleCopy() {
    if (json) navigator.clipboard.writeText(json);
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Base64 to JSON</h1>
      <p>Decode Base64 string to JSON (pretty print).</p>
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
        <label>JSON Output:</label>
        <textarea
          rows={6}
          style={{ width: "100%", fontSize: 16 }}
          value={json}
          readOnly
        />
        <button onClick={handleCopy} disabled={!json} style={{ marginTop: 6 }}>Copy</button>
      </div>
    </div>
  );
}

